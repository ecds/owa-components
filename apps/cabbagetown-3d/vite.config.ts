import cesium from "vite-plugin-cesium";
import { createWordPressConfig } from "@owa-components/vite-config";

export default createWordPressConfig({ reactless: true, plugins: [cesium()] });
