# Open World Atlanta Components

Standalone React apps compiled for the [Open World Atlanta](https://openworldatlanta.org/) WordPress site, embedded via shortcodes.

## Structure

```
apps/          # one directory per shortcode component
packages/
  ui/          # shared React components
  utils/       # shared utilities (map styles, helpers)
  vite-config/ # shared Vite config with WordPress-friendly build settings
```

## Requirements

- Node 20+
- pnpm (installed globally)

## Common commands

```bash
# Dev server for a single app
pnpm --filter <app-name> dev

# Build all apps
pnpm build:apps

# Build everything (apps + packages)
pnpm build

# Lint all
pnpm lint
```

## WordPress build output

Each app builds to `apps/<name>/dist/` with stable filenames (`index.js`, `index.css`) so WordPress enqueue paths never change. To set a custom asset base path at build time:

```bash
VITE_WP_BASE=/wp-content/plugins/my-plugin/dist/ pnpm --filter <app-name> build
```

## Add a new component

1. Scaffold with Vite inside `apps/`:

```bash
cd apps
pnpm create vite
# framework: React, variant: TypeScript + SWC
```

2. Add `@owa-components/vite-config` as a devDependency in the new app's `package.json`:

```json
"devDependencies": {
  "@owa-components/vite-config": "workspace:*"
}
```

3. Replace `vite.config.ts` with:

```ts
import { createWordPressConfig } from "@owa-components/vite-config";
export default createWordPressConfig();
```

4. Replace `eslint.config.js` with:

```js
export { default } from "../../eslint.config.base.js";
```

5. Slim down `tsconfig.app.json` to extend the root base:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
  },
  "include": ["src"]
}
```

6. Run `pnpm install` from the repo root to wire up workspace links.

## Add/install dependencies for a component

```bash
pnpm install -D <package> --filter <app-name>
```
