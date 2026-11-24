<script lang="ts">
  import type { TreeExpansion } from "$apps/user/processes/types";
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import HtmlSpinner from "$lib/HtmlSpinner.svelte";
  import ActionBar from "$lib/Window/ActionBar.svelte";
  import ActionButton from "$lib/Window/ActionBar/ActionButton.svelte";
  import ActionSeparator from "$lib/Window/ActionBar/ActionSeparator.svelte";
  import ActionSubtle from "$lib/Window/ActionBar/ActionSubtle.svelte";
  import { Plural } from "$ts/util";
  import type { DispatchClientListItem, GlobalDispatchProcessSummary } from "$types/system/dispatch";
  import type { ExpandedUserInfo } from "$types/user";
  import { onMount, setContext } from "svelte";
  import { SvelteSet } from "svelte/reactivity";
  import { expansionContextKey } from "../../../expansion";
  import UserRow from "./AllUsersTree/UserRow.svelte";

  let { process }: { process: IProcessManagerRuntime } = $props();
  const { allUsers, selected } = process;

  let summary = $state<GlobalDispatchProcessSummary>();
  let loading = $state<boolean>(false);
  let users: ExpandedUserInfo[] = $state([]);
  let totalCount = $state<number>(0);
  const expanded = new SvelteSet<string>();

  setContext<TreeExpansion>(expansionContextKey, {
    isExpanded: (key) => expanded.has(key.toLowerCase()),
    toggle: (key) => {
      key = key.toLowerCase();

      if (expanded.has(key)) expanded.delete(key);
      else expanded.add(key);
    },
  });

  onMount(() => {
    refresh();
  });

  export async function refresh() {
    loading = true;
    const summaryResult = await process.adminBootstrapper.getDispatchProcessesSummary();
    if (!summaryResult.success) {
      // handle error
    }

    users = (await process.adminBootstrapper.getAllUsers()).filter((user) => !!user.profile?.dispatchClients);
    summary = summaryResult.result!;
    totalCount = Object.values(summary)
      .reduce<DispatchClientListItem[]>((a, b) => [...a, ...Object.values(b)], [])
      .reduce((a, b) => a + b.processes.length, 0);
    loading = false;
  }

  async function kickClient(id: string) {
    const result = await process.kickDispatchClient(id);

    if (result.success) {
      await refresh();
      selected.set("");
    }
  }
</script>

<div class="top">
  {#if loading}
    <div class="spinner-center">
      <HtmlSpinner height={32} />
    </div>
  {:else}
    <table class="process-tree">
      <thead>
        <tr class="row header">
          <th class="name">Process Name</th>
          <th class="pid">PID</th>
          <th class="app-id">App ID</th>
        </tr>
      </thead>
      <colgroup>
        <col width="72%" />
        <col width="3%" />
        <col width="25%" />
      </colgroup>
      {#if summary}
        {#each Object.keys(summary) as userId (userId)}
          <UserRow clients={summary[userId]} user={users.find((u) => u._id === userId)!} {process} />
        {/each}
      {/if}
    </table>
  {/if}
</div>

<ActionBar>
  {#snippet leftContent()}
    <ActionButton onclick={() => ($allUsers = false)} disabled={loading}>Local processes</ActionButton>
    <ActionSubtle text="{totalCount} {Plural('task', totalCount)} across {users.length} {Plural('user', users.length)}" />
  {/snippet}
  {#snippet rightContent()}
    <ActionButton onclick={refresh} {loading}>Refresh</ActionButton>
    <ActionButton suggested onclick={() => kickClient($selected.replace("gdc_", ""))} disabled={!$selected?.startsWith("gdc_")}>
      Disconnect client
    </ActionButton>

    {#if process.app.data.overlay}
      <ActionSeparator />
      <ActionButton suggested onclick={() => process.closeWindow()}>Close</ActionButton>
    {/if}
  {/snippet}
</ActionBar>
