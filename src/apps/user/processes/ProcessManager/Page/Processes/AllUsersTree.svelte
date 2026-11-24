<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import type { GlobalDispatchProcessSummary } from "$types/system/dispatch";
  import type { ExpandedUserInfo } from "$types/user";
  import { onMount, setContext } from "svelte";
  import { SvelteSet } from "svelte/reactivity";
  import { expansionContextKey } from "../../../expansion";
  import UserRow from "./AllUsersTree/UserRow.svelte";
  import type { TreeExpansion } from "$apps/user/processes/types";

  const { process }: { process: IProcessManagerRuntime } = $props();

  let summary = $state<GlobalDispatchProcessSummary>();
  let loading = $state<boolean>(false);
  let users: ExpandedUserInfo[] = $state([]);
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

    users = await process.adminBootstrapper.getAllUsers();
    summary = summaryResult.result!;
    loading = false;
  }
</script>

<table class="process-tree">
  <colgroup>
    <col width="79%" />
    <col width="1%" />
    <col width="20%" />
  </colgroup>
  {#if summary}
    {#each Object.keys(summary) as userId (userId)}
      <UserRow clients={summary[userId]} user={users.find((u) => u._id === userId)!} />
    {/each}
  {/if}
</table>
