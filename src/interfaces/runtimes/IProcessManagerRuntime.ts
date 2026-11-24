import type { IAppProcess } from "$interfaces/IAppProcess";
import type { ICommandResult } from "$interfaces/ICommandResult";
import type { IProcess } from "$interfaces/IProcess";
import type { IServiceHost } from "$interfaces/IServiceHost";
import type { IAdminBootstrapper } from "$interfaces/services/IAdminBootstrapper";
import type { BooleanStore, ReadableStore } from "$types/shared/writable";
import type { ProcessKillResult } from "$types/system/process";
import type { Component } from "svelte";

// !tpa
export interface IProcessManagerRuntime extends IAppProcess {
  selected: ReadableStore<string>;
  running: ReadableStore<number>;
  tabs: Record<string, Component>;
  allUsers: BooleanStore;
  host: IServiceHost;
  get adminBootstrapper(): IAdminBootstrapper;

  render(): Promise<false | undefined>;
  kill(proc: IProcess): Promise<void>;
  killError(name: string, result: ProcessKillResult): void;
  stopService(id: string): Promise<void>;
  restartService(id: string): Promise<void>;
  startService(id: string): Promise<void>;
  serviceInfoFor(id: string): void;
  appInfoFor(proc: IAppProcess): void;
  processInfoFor(proc: IProcess): void;
  kickDispatchClient(id: string): Promise<ICommandResult>;
}
