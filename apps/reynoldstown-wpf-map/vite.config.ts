import tailwindcss from "@tailwindcss/vite";
import { createWordPressConfig } from "@owa-components/vite-config";

export default createWordPressConfig({ plugins: [tailwindcss()] });
