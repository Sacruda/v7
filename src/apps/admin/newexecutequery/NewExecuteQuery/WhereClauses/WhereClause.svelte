<script lang="ts">
  import type { INewExecuteQueryRuntime } from "$interfaces/runtimes/INewExecuteQueryRuntime";
  import ActionIconButton from "$lib/Window/ActionBar/ActionIconButton.svelte";
  import ColumnSelector from "./WhereClause/ColumnSelector.svelte";
  import ModeSelector from "./WhereClause/ModeSelector.svelte";
  import ValueEntry from "./WhereClause/ValueEntry.svelte";
  import ValueFromColumn from "./WhereClause/ValueFromColumn.svelte";

  let { process, i }: { process: INewExecuteQueryRuntime; i: number } = $props();
  const { whereClauses, selectedCollection } = process;

  let isHierarchial = $state<boolean>(false);

  function toggleRelational() {
    $whereClauses[$selectedCollection][i].relational = !$whereClauses[$selectedCollection][i].relational;

    if ($whereClauses[$selectedCollection][i].relational) {
      $whereClauses[$selectedCollection][i].valueFromColumn ||= {};
    }
  }
</script>

<div class="bar where-clause">
  <h1>{!i ? "Where" : "And where"}:</h1>
  <div class="options">
    <ColumnSelector {process} {i} />

    {#if isHierarchial}
      <input
        bind:value={$whereClauses[$selectedCollection][i].hierarchyKey}
        placeholder="Hierarchy..."
        title={$whereClauses[$selectedCollection][i].hierarchyKey}
      />
    {/if}

    {#if $whereClauses[$selectedCollection][i].columnName}
      <ModeSelector {process} {i} />
      {#if !$whereClauses[$selectedCollection][i].mode.includes("Defined")}
        <ActionIconButton
          icon="workflow"
          onclick={toggleRelational}
          suggested={$whereClauses[$selectedCollection][i].relational}
          title="Compare against the value of another column..."
        />
      {/if}
    {/if}

    {#if !$whereClauses[$selectedCollection][i].relational || !$whereClauses[$selectedCollection][i].valueFromColumn}
      <ValueEntry {process} {i} bind:isHierarchial />
    {/if}
  </div>
  <div class="actions">
    <ActionIconButton icon="copy" onclick={() => process.DuplicateClause(i)} title="Duplicate clause" />
    <ActionIconButton icon="trash-2" onclick={() => process.DeleteClause(i)} title="Delete clause" />
  </div>
</div>

{#if $whereClauses[$selectedCollection][i].relational && $whereClauses[$selectedCollection][i].valueFromColumn && !$whereClauses[$selectedCollection][i].mode.includes("defined")}
  <div class="bar where-clause value-from-column">
    <h1>From:</h1>
    <div class="options">
      <ValueFromColumn {process} {i} />
    </div>
  </div>
{/if}
