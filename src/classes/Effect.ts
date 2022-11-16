import { Area, EffectType } from "@src/enums";

class Effect {
  type: EffectType;
  area: Area;
  size: number;
  min: number;
  max: number;

  constructor(type: EffectType, area: Area, size: number, min: number, max: number) {
    this.type = type;
    this.area = area;
    this.size = size;
    this.min = min;
    this.max = max;
  }
}

export default Effect;