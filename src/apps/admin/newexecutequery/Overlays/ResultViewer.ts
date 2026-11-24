import "$css/apps/admin/newexecutequery/overlays/resultviewer.css";
import type { App } from "$types/apps/app";
import ResultViewer from "../NewExecuteQuery/Overlays/ResultViewer.svelte";
import { NewExecuteQueryOverlayRuntime } from "./runtime";

const ResultViewerApp: App = {
  metadata: {
    name: "Result Viewer",
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: "ComponentIcon",
  },
  position: { centered: true },
  size: { w: 650, h: 550 },
  minSize: { w: 650, h: 550 },
  maxSize: { w: 650, h: 550 },
  state: {
    maximized: false,
    minimized: false,
    resizable: false,
    fullscreen: false,
    headless: true,
  },
  controls: {
    minimize: false,
    maximize: true,
    close: true,
  },
  assets: {
    runtime: NewExecuteQueryOverlayRuntime,
    component: ResultViewer as any,
  },
  glass: false,
  elevated: false,
  hidden: false,
  core: false,
  overlay: false,
  noSafeMode: false,
  vital: false,
  id: "NewExecuteQuery_ResultViewer",
};

export default ResultViewerApp;
