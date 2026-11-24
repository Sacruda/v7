<script lang="ts">
  import type { SummarizedProcessInformation } from "$types/system/dispatch";
  import ProcessRow from "./ProcessRow.svelte";

  let {
    parentPid = undefined,
    processes,
    indent,
    userId,
    clientId,
  }: {
    parentPid?: number;
    processes: SummarizedProcessInformation[];
    indent: number;
    userId: string;
    clientId: string;
  } = $props();

  let filtered = $derived(processes.filter((proc) => (parentPid === undefined ? !proc.parentPid : proc.parentPid === parentPid)));
</script>

{#each filtered as proc (proc.pid)}
  <ProcessRow
    {proc}
    {processes}
    {indent}
    key={`all__user:${userId}_client:${clientId}_process:${proc.pid}`}
    {clientId}
    {userId}
  />
{/each}
