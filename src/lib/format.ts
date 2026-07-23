/** Format 21540 → "21,540" */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-NG');
}
