export const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

export function pinnedProgress(top: number, height: number, viewport: number) {
  return clampProgress(-top / Math.max(1, height - viewport));
}

/** Each chapter has a readable hold and a short dissolve on either side. */
export function chapterOpacity(progress: number, index: number, count: number) {
  const local = progress * count - index;
  const enter = index === 0 ? 1 : clampProgress(local / .22);
  const leave = index === count - 1 ? 1 : clampProgress((1.12 - local) / .22);
  return Math.min(enter, leave);
}
