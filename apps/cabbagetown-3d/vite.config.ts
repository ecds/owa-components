import cesium from "vite-plugin-cesium-build";
import { createWordPressConfig } from "@owa-components/vite-config";

export default createWordPressConfig({ reactless: true, plugins: [cesium()] });
