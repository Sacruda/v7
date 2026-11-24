<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { Env } from "$ts/env";
  import type { DispatchClientListItem } from "$types/system/dispatch";
  import type { ExpandedUserInfo } from "$types/user";
  import ProcessRows from "./ProcessRows.svelte";

  const { user, clients }: { user: ExpandedUserInfo; clients: Record<string, DispatchClientListItem> } = $props();
</script>

<tr class="row">
  <td class="name" colspan="4">
    <div>
      <Icon icon="AccountIcon" />
      <span>{user?.profile?.displayName ?? user?.username}</span>
    </div>
  </td>
</tr>
{#each Object.entries(clients) as [id, client] (id)}
  <tr class="row" style="--indent: 1;">
    <td class="name" colspan="4">
      <div>
        <Icon icon="ArcSystemIcon" />
        <span>{Env.get("DISPATCH_SOCK_ID") === id ? "This Sacruda instance" : "Sacruda v7"} - {client.id}</span>
      </div>
    </td>
  </tr>
  <ProcessRows processes={clients[id].processes} parentPid={undefined} indent={2} />
{/each}
