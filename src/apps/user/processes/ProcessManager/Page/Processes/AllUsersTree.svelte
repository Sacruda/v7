<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import type { GlobalDispatchProcessSummary } from "$types/system/dispatch";
  import type { ExpandedUserInfo } from "$types/user";
  import { onMount } from "svelte";
  import UserRow from "./AllUsersTree/UserRow.svelte";

  const { process }: { process: IProcessManagerRuntime } = $props();

  let summary = $state<GlobalDispatchProcessSummary>();
  let loading = $state<boolean>(false);
  let users: ExpandedUserInfo[] = $state([]);

  onMount(() => {
    refresh();
  });

  export async function refresh() {
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
    <col width="59%" />
    <col width="1%" />
    <col width="20%" />
    <col width="20%" />
  </colgroup>
  {#if summary}
    {#each Object.keys(summary) as userId (userId)}
      <UserRow clients={summary[userId]} user={users.find((u) => u._id === userId)!} />
    {/each}
  {/if}
</table>
