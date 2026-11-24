<script lang="ts">
  import type { IProcessManagerRuntime } from "$interfaces/runtimes/IProcessManagerRuntime";
  import Icon from "$lib/Icon.svelte";
  import type { DispatchClientListItem } from "$types/system/dispatch";
  import type { ExpandedUserInfo } from "$types/user";
  import { onMount } from "svelte";
  import { useExpansion } from "../../../../expansion";
  import ClientRow from "./ClientRow.svelte";

  let {
    user,
    clients,
    process,
  }: {
    user: ExpandedUserInfo;
    clients: Record<string, DispatchClientListItem>;
    process: IProcessManagerRuntime;
  } = $props();

  const { isExpanded: checkExpanded, toggle } = useExpansion();

  const KEY = `all__user:${user._id}`;
  let isExpanded = $derived(checkExpanded(KEY));

  onMount(() => {
    if (!isExpanded) toggle(KEY);
  });
</script>

<tr class="row" onclick={() => toggle(KEY)}>
  <td class="name" colspan="3">
    <div>
      <span class="lucide" class:icon-chevron-right={!isExpanded} class:icon-chevron-down={isExpanded}></span>
      <Icon icon="AccountIcon" />
      <span>{user?.profile?.displayName ?? user?.username}</span>
    </div>
  </td>
</tr>
{#if isExpanded}
  {#each Object.entries(clients) as [id, client] (id)}
    <ClientRow {id} {client} userId={user._id} {process} />
  {/each}
{/if}
