import { assertEquals } from "jsr:@std/assert";

import { newSwitch, query, setCase, setDefault } from "./core.ts";

Deno.test("Test n°1", () => {
  let switch_ = newSwitch();

  switch_ = setCase(switch_, {
    value: "A",
    body: (args: any) => {
      return args + " " + "Apple";
    },
  });

  switch_ = setCase(switch_, {
    value: "B",
    body: (args: any) => {
      return args + " " + "Banana";
    },
  });

  switch_ = setDefault(switch_, (args: any) => {
    return args + " " + "Default";
  });

  {
    const actual = query(switch_, "A", "Hi");
    const expected = "Hi Apple";
    assertEquals(actual, expected);
  }

  {
    const actual = query(switch_, "B", "Hola");
    const expected = "Hola Banana";
    assertEquals(actual, expected);
  }

  {
    const actual = query(switch_, "C", "Hello");
    const expected = "Hello Default";
    assertEquals(actual, expected);
  }
});

Deno.test("Test n°2", () => {
  let switch_ = newSwitch();

  switch_ = setCase(switch_, {
    value: "A",
    body: (args: any) => {
      return args + " " + "Apple";
    },
  });

  {
    const actual = query(switch_, "A", "Ciao");
    const expected = "Ciao Apple";
    assertEquals(actual, expected);
  }

  switch_ = setCase(switch_, {
    value: "A",
    body: (args: any) => {
      return args + " " + "Apricot";
    },
  });

  {
    const actual = query(switch_, "A", "Ciao");
    const expected = "Ciao Apricot";
    assertEquals(actual, expected);
  }
});

Deno.test("Test n°3", () => {
  let switch_ = newSwitch();

  switch_ = setCase(switch_, {
    value: "A",
    body: (args: any) => {
      return args + " " + "Apple";
    },
  });

  {
    const actual = query(switch_, "A", "Ciao");
    const expected = "Ciao Apple";
    assertEquals(actual, expected);
  }

  // no asignment
  setCase(switch_, {
    value: "A",
    body: (args: any) => {
      return args + " " + "Apricot";
    },
  });

  {
    const actual = query(switch_, "A", "Ciao");
    const expected = "Ciao Apple";
    assertEquals(actual, expected);
  }
});
