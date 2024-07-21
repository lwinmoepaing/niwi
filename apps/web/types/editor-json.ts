export interface EditorRootJson {
  root: ChildRoot;
}

export interface ChildRoot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
}
