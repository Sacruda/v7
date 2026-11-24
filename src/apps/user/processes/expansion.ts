import type { TreeExpansion } from "$apps/user/processes/types";
import { getContext } from "svelte";

const CONTEXT_KEY = Symbol("all-users-tree-expansion");
const LOCAL_CONTEXT_KEY = Symbol("local-tree-expansion");

export const expansionContextKey = CONTEXT_KEY;
export const localExpansionContextKey = LOCAL_CONTEXT_KEY;

export function useExpansion(): TreeExpansion {
  return getContext<TreeExpansion>(CONTEXT_KEY);
}

export function useLocalExpansion(): TreeExpansion {
  return getContext<TreeExpansion>(LOCAL_CONTEXT_KEY);
}
