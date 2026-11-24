export interface TreeExpansion {
  isExpanded(key: string): boolean;
  toggle(key: string): void;
}
