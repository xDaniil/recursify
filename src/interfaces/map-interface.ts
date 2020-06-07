export interface Index {
  increment: () => number;
  value: () => number;
}

export interface Callback {
  (element: any): void;
}