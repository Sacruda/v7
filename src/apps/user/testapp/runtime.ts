import type { ITestAppRuntime } from "$interfaces/runtimes/ITestAppRuntime";
import { AppProcess } from "$ts/apps/process";
import type { AppProcessData } from "$types/apps/app";

export class TestAppRuntime extends AppProcess implements ITestAppRuntime {
  //#region LIFECYCLE

  constructor(pid: number, parentPid: number, app: AppProcessData) {
    super(pid, parentPid, app);

    this.setSource(__SOURCE__);
  }

  //#endregion
}
