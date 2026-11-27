import "$css/apps/user/testapp.css";
import type { App } from "$types/apps/app";
import { TestAppRuntime } from "./runtime";
import TestApp from "./TestApp.svelte";

const TestAppApp: App = {
  metadata: {
    name: "Test App",
    version: "1.0.0",
    author: "Sacruda Project",
    icon: "ComponentIcon",
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
    runtime: TestAppRuntime,
    component: TestApp as any,
  },
  id: "TestApp",
};

export default TestAppApp;
