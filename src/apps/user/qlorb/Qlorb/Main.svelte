<script lang="ts">
  import type { IQlorbRuntime } from "$interfaces/runtimes/IQlorbRuntime";
  import { onMount } from "svelte";
  import Background from "./Main/Background.svelte";
  import Game from "./Main/Game.svelte";
  import OnScreenDisplay from "./Main/OnScreenDisplay.svelte";

  const { process }: { process: IQlorbRuntime } = $props();
  const { Score } = process;
  const { CurrentPage } = process;

  let level = $state<number>(0);

  Score.subscribe((v) => (level = Math.floor(v / 100)));

  onMount(() => {
    process.flushStores();
  });
</script>

{#if $CurrentPage === "game"}
  <div class="game level-{level}">
    <Background />
    <OnScreenDisplay {process} />
    <Game {process} />
  </div>
{/if}
