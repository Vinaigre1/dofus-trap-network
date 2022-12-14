import { Color } from "@src/enums";

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
