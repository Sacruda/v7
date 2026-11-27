export class AppScaffoldingTemplates {
  // src/apps/<area>/<appid>/<appid>.ts
  static MetadataTemplate(name, id, area) {
    const dir = id.toLowerCase();
    const appGroup = area === "components" ? `\n    appGroup: "components",` : "";

    return `import "$css/apps/${area}/${dir}.css";
import type { App } from "$types/apps/app";
import { ${id}Runtime } from "./runtime";
import ${id} from "./${id}.svelte";

const ${id}App: App = {
  metadata: {
    name: "${name}",
    version: "1.0.0",
    author: "Sacruda Project",
    icon: "ComponentIcon",${appGroup}
  },
  position: { centered: true },
  size: { w: 640, h: 480 },
  minSize: { w: 320, h: 240 },
  maxSize: { w: NaN, h: NaN },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    resizable: true,
    fullscreen: false,
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true,
  },
  assets: {
    runtime: ${id}Runtime,
    component: ${id} as any,
  },
  id: "${id}",
};

export default ${id}App;
`;
  }

  // src/apps/<area>/<appid>/runtime.ts
  static RuntimeTemplate(id) {
    return `import type { I${id}Runtime } from "$interfaces/runtimes/I${id}Runtime";
import { AppProcess } from "$ts/apps/process";
import type { AppProcessData } from "$types/apps/app";

export class ${id}Runtime extends AppProcess implements I${id}Runtime {
  //#region LIFECYCLE

  constructor(pid: number, parentPid: number, app: AppProcessData) {
    super(pid, parentPid, app);

    this.setSource(__SOURCE__);
  }

  //#endregion
}
`;
  }

  // src/interfaces/runtimes/I<runtime>.ts

  static InterfaceTemplate(id) {
    return `import type { IAppProcess } from "$interfaces/IAppProcess";

// !tpa
export interface I${id}Runtime extends IAppProcess {}
`;
  }

  // src/apps/<area>/<appid>/<appid>.svelte
  static ComponentTemplate(id) {
    return `<script lang="ts">
  import type { I${id}Runtime } from "$interfaces/runtimes/I${id}Runtime";

  const { process }: { process: I${id}Runtime } = $props();
</script>
`;
  }

  // src/css/apps/<area>/<appid>.css
  static CssTemplate(id) {
    return `#${id} > div.body {
}
`;
  }
}
