import { copy, newDefMap, get, set, def } from "./core.ts";

type DefMap<K, V> = {
  map: Map<K, V>;
  default: V;
};

export class DefaultMap<K, V> {
  private dmap: DefMap<K, V>;

  constructor() {
    this.dmap = newDefMap();
  }

  public default(value: V) {
    const dmapCopy = def(this.dmap, value);
    this.dmap = dmapCopy;
  }

  public get(key: any): V | undefined {
    const result = get(this.dmap, key);
    return result;
  }

  public set(key: any, value: V) {
    const dmapCopy = set(this.dmap, key, value);
    this.dmap = dmapCopy;
  }
}
