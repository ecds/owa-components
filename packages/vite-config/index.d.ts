import type { UserConfig, Plugin } from "vite";

interface WordPressConfigOptions {
  plugins?: Plugin[];
  reactless?: boolean;
  base?: string;
}

export function createWordPressConfig(options?: WordPressConfigOptions): UserConfig;
