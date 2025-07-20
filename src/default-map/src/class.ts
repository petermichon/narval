import { newDefMap, get, set, def } from "./core.ts";

type DefMap<K, V> = {
  map: Map<K, V>;
  default: V;
};

class DefaultMap<K, V> {
  private dmap: DefMap<K, V>;

  constructor() {
    this.dmap = newDefMap();
  }

  public default(value: V) {
    const dmapCopy = def(this.dmap, value);
    this.dmap = dmapCopy;
  }

  public get(key: K): V | undefined {
    const result = get(this.dmap, key);
    return result;
  }

  public set(key: K, value: V) {
    const dmapCopy = set(this.dmap, key, value);
    this.dmap = dmapCopy;
  }
}

export { DefaultMap };
