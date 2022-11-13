import { v4 as uuidv4 } from "uuid";

import _SpellData from "@json/Traps.json";
import { SpellDataType } from "@src/@types/SpellDataType";
const SpellData: SpellDataType = _SpellData as unknown as SpellDataType;

class Spell {
  uuid: string;

  constructor() {
    this.uuid = uuidv4();
  }
}

export default Spell;