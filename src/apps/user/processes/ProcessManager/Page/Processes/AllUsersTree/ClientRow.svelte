<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { Env } from "$ts/env";
  import type { DispatchClientListItem } from "$types/system/dispatch";
  import { useExpansion } from "../../../../expansion";
  import ProcessRows from "./ProcessRows.svelte";

  let {
    id,
    userId,
    client,
  }: {
    id: string;
    userId: string;
    client: DispatchClientListItem;
  } = $props();

  const { isExpanded: checkExpanded, toggle } = useExpansion();

  const KEY = `all__user:${userId}_client:${client.id}`;
  let isExpanded = $derived(checkExpanded(KEY));
</script>

<tr class="row" style="--indent: 1;" onclick={() => toggle(KEY)}>
  <td class="name" colspan="3">
    <div>
      <span class="lucide" class:icon-chevron-right={!isExpanded} class:icon-chevron-down={isExpanded}></span>
      <Icon icon="ArcSystemIcon" />
      <span>{Env.get("DISPATCH_SOCK_ID") === id ? "This Sacruda instance" : "Sacruda v7"} - {client.id}</span>
    </div>
  </td>
</tr>
{#if isExpanded}
  <ProcessRows processes={client.processes} parentPid={undefined} indent={2} {userId} clientId={client.id} />
{/if}
