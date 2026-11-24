<script lang="ts">
  import ProcessRows from "./ProcessRows.svelte";
  import Icon from "$lib/Icon.svelte";
  import type { SummarizedProcessInformation } from "$types/system/dispatch";
  import { ProcessStateIcons } from "$types/system/process";

  const {
    parentPid = undefined,
    processes,
    indent,
  }: { parentPid?: number; processes: SummarizedProcessInformation[]; indent: number } = $props();

  let filtered = $derived(processes.filter((proc) => (!parentPid ? !proc.parentPid : proc.parentPid === parentPid)));
</script>

{#each filtered as process (process.pid)}
  <tr class="row" style="--indent: {indent};">
    <td class="name">
      <div>
        <Icon icon={process.appId ? `@app::${process.appId}` : "DefaultIcon"} />
        <span>{process.name}</span>
        <span class="lucide icon-{ProcessStateIcons[process.state]}"></span>
      </div>
    </td>
    <td class="pid">
      <div>
        <Icon icon="FlagIcon" className="flag" />
        <span>{process.pid}</span>
      </div>
    </td>
    <td class="memory">-</td>
    <td class="app-id" title={process.appId}>{process.appId || "-"}</td>
  </tr>
  <ProcessRows {processes} parentPid={process.pid} indent={indent + 1} />
{/each}
