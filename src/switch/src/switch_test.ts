import { assertEquals } from "jsr:@std/assert";

import { Switch } from "./class.ts";

Deno.test("Test n°1", () => {
  const switch_ = new Switch();

  switch_.case({
    value: "A",
    body: (args: any) => {
      return args + " " + "Apple";
    },
  });

  switch_.case({
    value: "B",
    body: (args: any) => {
      return args + " " + "Banana";
    },
  });

  switch_.default((args: any) => {
    return args + " " + "Default";
  });

  {
    const actual = switch_.query("A", "Hi");
    const expected = "Hi Apple";
    assertEquals(actual, expected);
  }

  {
    const actual = switch_.query("B", "Hola");
    const expected = "Hola Banana";
    assertEquals(actual, expected);
  }

  {
    const actual = switch_.query("C", "Hello");
    const expected = "Hello Default";
    assertEquals(actual, expected);
  }
});
