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

## Using a component in WordPress

Components are embedded with the `[owa_component]` shortcode. The `name` must match the app directory name under `apps/`.

```
[owa_component name="neighborhood-map"]
[owa_component name="buildings-1928"]
[owa_component name="cabbagetown-current"]
[owa_component name="reynoldstown-wpf-map"]
```

Use the `height` attribute to control the component height (default `500px`):

```
[owa_component name="neighborhood-map" height="700px"]
```

### First-time setup

The **OWA Components** plugin must be activated before shortcodes will work:

1. Go to **WP Admin → Plugins**
2. Find **OWA Components** and click **Activate**

The plugin is deployed automatically on every push to `main`. New components are available as shortcodes immediately after the deploy completes — no plugin changes required.

### Previewing components

A live preview of every component is available at:
**https://ecds.github.io/owa-components/**

---

## Add a new component

1. Scaffold with Vite inside `apps/`:

```bash
cd apps
pnpm create vite
# framework: React, variant: TypeScript
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

6. Update `src/main.tsx` to mount to a div ID matching the app name:

```tsx
createRoot(document.getElementById("your-app-name")!).render(...)
```

And update `index.html` to use the same ID:

```html
<div id="your-app-name" style="width: 100vw; height: 100vh"></div>
```

7. Run `pnpm install` from the repo root to wire up workspace links.

## Add/install dependencies for a component

```bash
pnpm install -D <package> --filter <app-name>
```
