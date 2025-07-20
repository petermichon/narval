// DefaultMap
type DefMap<K, V> = {
  map: Map<K, V>;
  default: V;
};

/**
 * @pure
 */
function copy<K, V>(dmap: DefMap<K, V>): DefMap<K, V> {
  const defMapCopy = { ...dmap };
  defMapCopy.map = new Map<K, V>(dmap.map);
  return defMapCopy;
}

/**
 * @pure
 */
function newDefMap<K, V>(): DefMap<K, V> {
  const defMap = {
    map: new Map<K, V>(),
    default: undefined as V,
  };
  return defMap;
}

/**
 * @pure
 */
function get<K, V>(defMap: DefMap<K, V>, value: any): V | undefined {
  if (!defMap.map.has(value)) {
    const result = defMap.default;
    return result;
  }
  const result = defMap.map.get(value) as V;
  return result;
}

// /**
//  * @pure
//  */
// export function has<K, V>(defMap: DefMap<K, V>, value: any): boolean {
//   return defMap.map.has(value);
// }

/**
 * @pure
 */
function set<K, V>(map: DefMap<K, V>, key: K, value: V): DefMap<K, V> {
  const dmapCopy = copy(map);
  dmapCopy.map.set(key, value);
  return dmapCopy;
}

/**
 * @pure
 */
function def<K, V>(dmap: DefMap<K, V>, value: V): DefMap<K, V> {
  const dmapCopy = copy(dmap);
  dmapCopy.default = value;
  return dmapCopy;
}

export { newDefMap, get, set, def };
