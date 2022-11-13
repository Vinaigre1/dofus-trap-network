/**
 * Returns a random integer between *min* (included) and *max* (excluded)
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns A random integer between *min* and *max*
 */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}