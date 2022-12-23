import { Color, Mask } from "@src/enums";

/**
 * Returns a random integer between *min* (included) and *max* (excluded)
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} A random integer between *min* and *max*
 */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 * Returns a color from a integer.
 * 
 * @param {number} int integer to convert
 * @returns {Color} The converted color
 */
export function intToColor(int: number): Color {
  const color: Color = {
    r: (int & 0xFF0000) >> 16,
    g: (int & 0x00FF00) >> 8,
    b: (int & 0x0000FF)
  };

  return color;
}

/**
 * Returns a integer from a color.
 * 
 * @param {Color} color Color to convert
 * @returns {number} The converted integer
 */
export function colorToInt(color: Color): number {
  const int: number = color.r << 16 | color.g << 8 | color.b;

  return int;
}

/**
 * Converts an array of masks from a mask string
 * 
 * @param {string} mask string mask to convert
 * @returns {Array<Mask>} Array of masks
 */
export function strToMaskArray(mask: string): Array<Mask> {
  if (!mask) return [];

  const ary: Array<Mask> = [];
  const maskList: Array<string> = mask.split(',');

  for (let i: number = 0; i < maskList.length; i++) {
    let j = 0;
    let onCaster: boolean = false;
    let mask: string = "";
    let param: number = 0;

    if (maskList[i][j] === "*") {
      onCaster = true;
      j++;
    }
    mask = maskList[i].slice(j, j + 1);
    if (maskList[i].length > j + 1) {
      param = parseInt(maskList[i].slice(j + 1));
    }
    ary.push({ onCaster, mask, param });
  }

  return ary;
}
