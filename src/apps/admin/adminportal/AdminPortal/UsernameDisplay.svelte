<script lang="ts">
  import type { IAdminPortalRuntime } from "$interfaces/runtimes/IAdminPortalRuntime";
  import ProfilePicture from "$lib/ProfilePicture.svelte";
  import type { ExpandedUserInfo } from "$types/user";

  let {
    user,
    process,
    noClick = false,
  }: { process: IAdminPortalRuntime; user: ExpandedUserInfo | undefined; noClick?: boolean } = $props();
  const { redacted } = process;
</script>

<div class="username-display">
  {#if user}
    <ProfilePicture height={20} fallback={user.profile.profilePicture} showOnline online={user.profile.dispatchClients > 0} />
    {#if noClick}
      <span>{user.username}</span>
    {:else}
      <button class="link" onclick={() => process.switchPage("viewUser", { user })} class:redacted={$redacted}>
        {user.username}
      </button>
    {/if}
  {:else}
    Stranger
  {/if}
</div>
