import { Area, EffectType } from "@src/enums";

class Effect {
  type: EffectType;
  area: Area;
  size: number;

  constructor(type: EffectType, area: Area, size: number) {
    this.type = type;
    this.area = area;
    this.size = size;
  }
}

export default Effect;