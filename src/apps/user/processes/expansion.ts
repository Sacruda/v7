import type { TreeExpansion } from "$apps/user/processes/types";
import { getContext } from "svelte";

const CONTEXT_KEY = Symbol("all-users-tree-expansion");

export const expansionContextKey = CONTEXT_KEY;

export function useExpansion(): TreeExpansion {
  return getContext<TreeExpansion>(CONTEXT_KEY);
}
