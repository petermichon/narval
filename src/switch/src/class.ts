// Object oriented wrapper

import { copy, newSwitch, query, setCase, setDefault } from "./core.ts";

type CaseBody = (args: any) => any;
type CaseBlock = { value: any; body: CaseBody };
type SwitchStruct = { map: Map<any, CaseBody>; default: CaseBody };

/**
 * Switch statement as a data structure. It behaves without fallthrough.
 */
export class Switch {
  // It is named 'switch_' to avoid confusion with the 'switch' keyword
  private switch_: SwitchStruct;

  constructor() {
    this.switch_ = newSwitch();
  }

  public query(value: any, args: any) {
    const switchCopy = copy(this.switch_);
    const result = query(switchCopy, value, args);
    return result;
  }

  /**
   *
   * @param case_ It is named 'case_' to avoid confusion with the 'case' keyword
   */
  public case(case_: CaseBlock) {
    const switchCopy = copy(this.switch_);
    const switchNew = setCase(switchCopy, case_);
    this.switch_ = switchNew;
  }

  public default(body: (args: any) => any) {
    const switchCopy = copy(this.switch_);
    const switchNew = setDefault(switchCopy, body);
    this.switch_ = switchNew;
  }
}
