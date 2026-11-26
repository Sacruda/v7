<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import Icon from "$lib/Icon.svelte";
  import { Env } from "$ts/env";
  import type { DispatchClientListItem } from "$types/system/dispatch";
  import { useExpansion } from "../../../../expansion";
  import ProcessRows from "./ProcessRows.svelte";

  let {
    id,
    userId,
    client,
    process,
  }: {
    id: string;
    userId: string;
    client: DispatchClientListItem;
    process: IProcessManagerRuntime;
  } = $props();

  const { selected } = process;
  const { isExpanded: checkExpanded, toggle } = useExpansion();

  const KEY = `all__user:${userId}_client:${client.id}`;
  const SELECTION = `gdc_${client.id}`;
  const isCurrentClient = Env.get("DISPATCH_SOCK_ID") === id;
  let isExpanded = $derived(checkExpanded(KEY));

  function onclick() {
    if ($selected === SELECTION || isCurrentClient) {
      toggle(KEY);
    }

    if (!isCurrentClient) {
      $selected = SELECTION;
    }
  }
</script>

<tr class="row" class:selected={SELECTION == $selected} style="--indent: 1;" {onclick}>
  <td class="name" colspan="3">
    <div>
      <span class="lucide" class:icon-chevron-right={!isExpanded} class:icon-chevron-down={isExpanded}></span>
      <Icon icon="ArcSystemIcon" />
      <span>{isCurrentClient ? "This Sacruda instance" : "Sacruda v7"} - {id}</span>
    </div>
  </td>
</tr>
{#if isExpanded}
  <ProcessRows processes={client.processes} parentPid={undefined} indent={2} {userId} clientId={id} />
{/if}
