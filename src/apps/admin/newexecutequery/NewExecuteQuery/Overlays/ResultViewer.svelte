<script lang="ts">
  import type { INewExecuteQueryOverlayRuntime } from "$interfaces/runtimes/INewExecuteQueryRuntime";
  import ActionBar from "$lib/Window/ActionBar.svelte";
  import ActionButton from "$lib/Window/ActionBar/ActionButton.svelte";
  import ActionPill from "$lib/Window/ActionBar/ActionPill.svelte";
  import ActionSeparator from "$lib/Window/ActionBar/ActionSeparator.svelte";
  import { Daemon } from "$ts/env";
  import { contextMenu } from "$ts/ui/context/actions.svelte";
  import { tryJsonStringify } from "$ts/util/json";
  import type { DbQueryCollectionColumn } from "$types/server/admin";

  let { process }: { process: INewExecuteQueryOverlayRuntime } = $props();
  let {
    parent: { queryResult, selectedColumns, selectedCollection, conceiled },
  } = process;

  const COLUMNS: DbQueryCollectionColumn[] = $derived([
    { column: "_id", dataType: "objectid", normalizedType: "string", required: true },
    ...$selectedColumns[$selectedCollection].filter((c) => c.column !== "_id"),
  ]);
</script>

<div class="query-result table-wrapper">
  {#if !$queryResult.success}
    <div class="error">
      <span class="lucide icon-circle-x"></span>
      <div>
        <h1>DbQuery unsuccessful</h1>
        <p class="message">
          {$queryResult.errorMessage}
        </p>
      </div>
    </div>
  {:else}
    <table>
      <thead>
        <tr>
          {#each COLUMNS as info (info.column)}
            <th>{info.column}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $queryResult.result! as row (row._id)}
          <tr>
            {#each COLUMNS as info (info.column)}
              <td
                class:conceiled={$conceiled && info.sensitive}
                use:contextMenu={[
                  [
                    {
                      caption: "Copy value",
                      icon: "copy",
                      action: () =>
                        navigator.clipboard.writeText(
                          info.normalizedType === "string" ? row[info.column] : tryJsonStringify(row[info.column], 2)
                        ),
                    },
                  ],
                  process,
                ]}
              >
                {#if info.normalizedType === "object" || info.normalizedType === "array"}
                  <button
                    class="link"
                    onclick={() =>
                      Daemon.helpers?.ViewGenericObject(
                        row[info.column],
                        { dataName: info.column, windowTitle: "View column data" },
                        process.parentPid
                      )}
                  >
                    [...]
                  </button>
                {:else}
                  {$conceiled && info.sensitive ? "***" : row[info.column]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<ActionBar>
  {#snippet leftContent()}
    {#if $queryResult.success}
      <ActionPill key="Status">{$queryResult.successMessage}</ActionPill>
      <ActionSeparator />
      <label for="">
        <input type="checkbox" bind:checked={$conceiled} />
        Conceal sensitive values
      </label>
    {/if}
  {/snippet}
  {#snippet rightContent()}
    <ActionButton onclick={() => process.parent.CopyMongoQuery()} disabled={!$queryResult.success}>Copy Mongo Query</ActionButton>
    <ActionButton onclick={() => process.parent.SaveJson()} disabled={!$queryResult.success}>Save JSON</ActionButton>
    <ActionButton suggested onclick={() => process.closeWindow()}>Close</ActionButton>
  {/snippet}
</ActionBar>
