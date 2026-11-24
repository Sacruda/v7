<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import NewTabs from "$lib/NewTabs.svelte";

  const { process }: { process: IProcessManagerRuntime } = $props();
</script>

<NewTabs initialTab="Processes" tabs={process.tabs} {process} fullHeight />
