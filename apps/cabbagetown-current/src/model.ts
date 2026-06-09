import {
  Map,
  MercatorCoordinate,
  type CustomRenderMethodInput,
} from "maplibre-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// parameters to ensure the model is georeferenced correctly on the map
const modelOrigin = [-84.366290048728, 33.7491] as [number, number];
// const modelOrigin = [-84.36571048, 33.74994521] as [number, number];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, 0, 0];

const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
  modelOrigin,
  modelAltitude,
);

// transformation parameters to position, rotate and scale the 3D model onto the map
const modelTransform = {
  translateX: modelAsMercatorCoordinate.x,
  translateY: modelAsMercatorCoordinate.y,
  translateZ: modelAsMercatorCoordinate.z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  /* Since our 3D model is in real world meters, a scale transform needs to be
   * applied since the CustomLayerInterface expects units in MercatorCoordinates.
   */
  scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
};

const camera = new THREE.Camera();
const scene = new THREE.Scene();
let _map: Map | undefined = undefined;
let renderer: THREE.WebGLRenderer | undefined = undefined;
// configuration of the custom layer for a 3D model per the CustomLayerInterface
export const model = {
  id: "3d-model",
  type: "custom",
  renderingMode: "3d",
  maxZoom: 20,
  onAdd(map: Map, gl: WebGL2RenderingContext) {
    // const light = new THREE.AmbientLight(0x404040, 30); // soft white light
    const light = new THREE.DirectionalLight(0xffffff);
    // Making it just before noon - light coming from south-east.
    light.position.set(50, 70, -30).normalize();
    scene.add(light);
    // create two three.js lights to illuminate the model
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    // directionalLight.position.set(1, 1, 1).normalize();
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);

    // directionalLight.shadow.camera.near = 0.1;
    // directionalLight.shadow.camera.far = 2000;
    // directionalLight.shadow.camera.left = -500;
    // directionalLight.shadow.camera.right = 500;
    // directionalLight.shadow.camera.top = 500;
    // directionalLight.shadow.camera.bottom = -500;

    // directionalLight.shadow.mapSize.width = 4096;
    // directionalLight.shadow.mapSize.height = 4096;

    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
    // directionalLight2.position.set(0, 45, 0).normalize();
    // scene.add(directionalLight2);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    const loader = new GLTFLoader();
    loader.load(
      "https://atlmaps-prod.s3.us-east-1.amazonaws.com/cabbagetown.glb",
      (gltf) => {
        scene.add(gltf.scene);
      },
    );
    _map = map;

    // use the MapLibre GL JS map canvas for three.js
    renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });

    renderer.autoClear = false;
  },
  render(_: WebGL2RenderingContext, args: CustomRenderMethodInput) {
    const rotationX = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(1, 0, 0),
      modelTransform.rotateX,
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 1, 0),
      modelTransform.rotateY,
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      modelTransform.rotateZ,
    );

    const m = new THREE.Matrix4().fromArray(
      args.defaultProjectionData.mainMatrix,
    );
    const l = new THREE.Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ,
      )
      .scale(
        new THREE.Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale,
        ),
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    // Alternatively, you can use this API to get the correct model matrix.
    // It will work regardless of current projection.
    // Also see the example "globe-3d-model.html".
    //
    // const modelMatrix = args.getMatrixForModel(modelOrigin, modelAltitude);
    // const m = new THREE.Matrix4().fromArray(matrix);
    // const l = new THREE.Matrix4().fromArray(modelMatrix);

    camera.projectionMatrix = m.multiply(l);
    renderer?.resetState();
    renderer?.render(scene, camera);
    _map?.triggerRepaint();
  },
};
