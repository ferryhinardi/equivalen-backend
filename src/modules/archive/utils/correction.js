/** Ref: https://github.com/nickuraltsev/ignore-case */
export function normalize(string) {
  return `${string || ''}`.toUpperCase();
}
 
export const equals = (string1, string2) =>
  normalize(string1) === normalize(string2);
