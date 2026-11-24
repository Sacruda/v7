<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import type { SummarizedProcessInformation } from "$types/system/dispatch";
  import { ProcessStateIcons } from "$types/system/process";
  import { useExpansion } from "../../../../expansion";
  import ProcessRows from "./ProcessRows.svelte";

  let {
    proc,
    processes,
    userId,
    clientId,
    key,
    indent,
  }: {
    proc: SummarizedProcessInformation;
    processes: SummarizedProcessInformation[];
    userId: string;
    clientId: string;
    key: string;
    indent: number;
  } = $props();

  const { isExpanded: checkExpanded, toggle } = useExpansion();

  let isExpanded = $derived(checkExpanded(key));
</script>

<tr class="row" style="--indent: {indent};" onclick={() => toggle(key)}>
  <td class="name">
    <div>
      <span class="lucide" class:icon-chevron-right={!isExpanded} class:icon-chevron-down={isExpanded}></span>
      <Icon icon={proc.appId ? `@app::${proc.appId}` : "DefaultIcon"} />
      <span>{proc.name}</span>
      <span class="lucide icon-{ProcessStateIcons[proc.state]}"></span>
    </div>
  </td>
  <td class="pid">
    <div>
      <Icon icon="FlagIcon" className="flag" />
      <span>{proc.pid}</span>
    </div>
  </td>
  <td class="app-id" title={proc.appId}>{proc.appId || "-"}</td>
</tr>
{#if isExpanded}
  <ProcessRows {processes} parentPid={proc.pid} indent={indent + 1} {userId} {clientId} />
{/if}
