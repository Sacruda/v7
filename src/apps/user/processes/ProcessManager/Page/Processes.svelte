<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import AllUsersTree from "./Processes/AllUsersTree.svelte";
  import LocalTree from "./Processes/LocalTree.svelte";

  const { process }: { process: IProcessManagerRuntime } = $props();
  const { allUsers } = process;
</script>

{#if $allUsers}
  <AllUsersTree {process} />
{:else}
  <LocalTree {process} />
{/if}
