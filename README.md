# Open World Atlanta Components

These React apps are meant to be standalone components for the [Open World Atlanta](https://openworldatlanta.org/) project. The structure is mostly based on [this article](https://dev.to/lico/react-monorepo-setup-tutorial-with-pnpm-and-vite-react-project-ui-utils-5705)

## Start a new component

### Requirements

- Node 20 or greater
- pnpm
- Vite

### Create New Component

Add new component to the pnpm-workspace.yaml file. For example

```yaml
packages:
  - "packages/*"
  - "neighborhood-map"
  - "new-component"
```

```bash
npx pnpm create bite
```

Give the component a the name you added to the pnpm-workspace.yaml - "new-component" in the above example.

For the framework, select React:

![Screenshot of selecting React for the framework.](/docs/images/select_react.png)

For variant, select "TypeScript + SWC"

![Screenshot of selecting "TypeScript + SWC" as the variant](/docs/images/select_ts_swc.png)
