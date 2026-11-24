<script lang="ts">
  import { localExpansionContextKey } from "$apps/user/processes/expansion";
  import type { TreeExpansion } from "$apps/user/processes/types";
  import type { IAppProcess } from "$interfaces/IAppProcess";
  import type { IProcess } from "$interfaces/IProcess";
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import ActionBar from "$lib/Window/ActionBar.svelte";
  import ActionButton from "$lib/Window/ActionBar/ActionButton.svelte";
  import ActionSeparator from "$lib/Window/ActionBar/ActionSeparator.svelte";
  import ActionSubtle from "$lib/Window/ActionBar/ActionSubtle.svelte";
  import { Stack } from "$ts/env";
  import { ProcessesHelper } from "$ts/helpers/processes";
  import { Plural } from "$ts/util";
  import { onMount, setContext } from "svelte";
  import { SvelteSet } from "svelte/reactivity";
  import Row from "./Tree/Row.svelte";

  const { process }: { process: IProcessManagerRuntime } = $props();
  const { running, allUsers, selected } = process;
  let map = $state<Map<number, IProcess>>(new Map());
  let proc = $state<IProcess>();
  let expansion = $state<TreeExpansion>();
  const expanded = new SvelteSet<string>();

  expansion = setContext<TreeExpansion>(localExpansionContextKey, {
    isExpanded: (key) => expanded.has(key.toLowerCase()),
    toggle: (key) => {
      key = key.toLowerCase();

      if (expanded.has(key)) expanded.delete(key);
      else expanded.add(key);
    },
  });

  selected.subscribe((v) => {
    proc = Stack.getProcess(+v.replace("proc#", ""));
  });

  onMount(() => {
    Stack.store.subscribe(async (v) => {
      map = new Map();
      map = v;
      $running = [...map].filter(([_, proc]) => !proc._disposed).length;
    });
  });
</script>

<div class="top">
  {#if expansion}
    <table class="process-tree">
      <thead>
        <tr class="row header">
          <th class="name">Process Name</th>
          <th class="pid">PID</th>
          <th class="memory">Memory</th>
          <th class="app-id">App ID</th>
        </tr>
      </thead>
      <colgroup>
        <col width="59%" />
        <col width="3%" />
        <col width="18%" />
        <col width="19%" />
      </colgroup>
      <tbody>
        {#each [...map] as [pid, proc], i (`${i}-${pid} ${proc.name}`)}
          {#if !proc.parentPid || !Stack.getProcess(proc.parentPid)}
            <Row {proc} {pid} {process} orphan={!Stack.getProcess(proc.parentPid) && proc.pid !== 1} />
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<ActionBar>
  {#snippet leftContent()}
    {#if process.adminBootstrapper}
      <ActionButton icon="shield" onclick={() => ($allUsers = true)}>All users</ActionButton>
    {/if}
    <ActionSubtle text="{$running} running {Plural('task', $running)}"></ActionSubtle>
  {/snippet}
  {#snippet rightContent()}
    <ActionButton
      disabled={!proc || !ProcessesHelper.IsAnyAppProcess(proc)}
      onclick={() => process.appInfoFor(proc as IAppProcess)}
    >
      App Info
    </ActionButton>
    <ActionButton disabled={!proc} onclick={() => process.processInfoFor(proc!)}>Process Info</ActionButton>
    <ActionButton
      disabled={!proc || !ProcessesHelper.IsAnyAppProcess(proc) || proc.app.data.overlay}
      onclick={() => proc && Stack.renderer?.focusPid(proc.pid)}
    >
      Focus
    </ActionButton>
    <ActionSeparator />
    <ActionButton suggested onclick={() => proc && process.kill(proc)} disabled={!proc}>
      Kill {proc && ProcessesHelper.IsAnyAppProcess(proc) ? "App" : "Process"}
    </ActionButton>
    {#if process.app.data.overlay}
      <ActionSeparator />
      <ActionButton suggested onclick={() => process.closeWindow()}>Close</ActionButton>
    {/if}
  {/snippet}
</ActionBar>
