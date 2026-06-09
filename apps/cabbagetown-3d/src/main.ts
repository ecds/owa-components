import {
  Cartesian3,
  HeadingPitchRoll,
  Ion,
  Math as CMath,
  Terrain,
  Transforms,
  Viewer,
  createOsmBuildingsAsync,
} from "cesium";
import "./style.css";
import "../node_modules/cesium/Build/Cesium/Widgets/widgets.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="viewer" style="height: 100vh; width: 100vw;">

  </div>
`;

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODg4ODg1NS1jY2FmLTQ5NzQtYjEwZS0wNDM2MGQxNTk5OWYiLCJpZCI6Mjk1Mjk4LCJpYXQiOjE3NDQ5OTkyNjR9.DizBBHiGI0IjjPirsj2caKnhq_i3_P3CBCNQ5IN2JQc";

const viewer = new Viewer("viewer", {
  terrain: Terrain.fromWorldTerrain(),
});

viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(
    -84.3651542217352243,
    33.7416211912213062,
    500
  ),
  orientation: {
    heading: CMath.toRadians(0.0),
    pitch: CMath.toRadians(-15.0),
  },
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await createOsmBuildingsAsync();

console.log("🚀 ~ buildingTileset:", buildingTileset, viewer);
// viewer.scene.primitives.add(buildingTileset);
const position = Cartesian3.fromDegrees(-84.366290048728, 33.7491, 301);
const heading = CMath.toRadians(90);
const pitch = 0;
const roll = 0;
const hpr = new HeadingPitchRoll(heading, pitch, roll);
const orientation = Transforms.headingPitchRollQuaternion(position, hpr);
const entity = viewer.entities.add({
  name: "https://atlmaps-prod.s3.us-east-1.amazonaws.com/cabbagetown_elevation.glb",
  position,
  orientation,
  model: {
    uri: "https://atlmaps-prod.s3.us-east-1.amazonaws.com/cabbagetown_elevation.glb",
    minimumPixelSize: 128,
    maximumScale: 20000,
  },
});
