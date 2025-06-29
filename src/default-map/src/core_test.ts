import { assertEquals } from "jsr:@std/assert";

import { def, get, newDefMap, set } from "./core.ts";

type DefMap<K, V> = {
  map: Map<K, V>;
  default: V;
};

Deno.test("Test n°1", () => {
  let map = newDefMap();

  assertEquals(get(map, 1), undefined);
  assertEquals(get(map, 2), undefined);
  assertEquals(get(map, 3), undefined);

  map = set(map, 1, "One");

  assertEquals(get(map, 1), "One");
  assertEquals(get(map, 2), undefined);
  assertEquals(get(map, 3), undefined);

  map = set(map, 2, "Two");

  assertEquals(get(map, 1), "One");
  assertEquals(get(map, 2), "Two");
  assertEquals(get(map, 3), undefined);

  map = def(map, "None");

  assertEquals(get(map, 1), "One");
  assertEquals(get(map, 2), "Two");
  assertEquals(get(map, 3), "None");
});

Deno.test("Test n°2", () => {
  let map = newDefMap<number, string>() as DefMap<number, string>;

  map = def<number, string>(map, "None");
  map = set<number, string>(map, 1, "One");
  map = set<number, string>(map, 2, "Two");

  assertEquals(get<number, string>(map, 1), "One");
  assertEquals(get<number, string>(map, 2), "Two");
  assertEquals(get<number, string>(map, 3), "None");
});
