// Switch without fallthrough data structure
// Purely functional core

type CaseBody = (args: any) => any;
type CaseBlock = { value: any; body: CaseBody };
type SwitchStruct = { map: Map<any, CaseBody>; default: CaseBody };

/**
 * @pure
 */
export function copy(s: SwitchStruct): SwitchStruct {
  const switchCopy = { ...s };
  switchCopy.map = new Map<any, CaseBody>(s.map);
  return switchCopy;
}

/**
 * @pure
 */
export function newSwitch(): SwitchStruct {
  const switch_ = {
    map: new Map(),
    default: () => {},
  };
  return switch_;
}

/**
 * @pure
 */
export function query(s: SwitchStruct, value: any, args: any): any | undefined {
  if (!s.map.has(value)) {
    const result = s.default(args);
    return result;
  }
  const body = s.map.get(value) as CaseBody;
  const result = body(args);
  return result;
}

/**
 * @pure
 */
export function setCase(s: SwitchStruct, b: CaseBlock): SwitchStruct {
  const switchCopy = copy(s);
  switchCopy.map.set(b.value, b.body);
  return switchCopy;
}

/**
 * @pure
 */
export function setDefault(s: SwitchStruct, b: CaseBody): SwitchStruct {
  const switchCopy = copy(s);
  switchCopy.default = b;
  return switchCopy;
}
