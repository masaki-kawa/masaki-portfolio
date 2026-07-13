/**
 * Language primitives shared across the Home terminal composition.
 * The Home page toggles between en/ja and every piece of copy that can
 * switch is stored as a CopyEnJa tuple.
 */

export type Lang = "en" | "ja";

export type CopyEnJa = {
  en: string;
  ja: string;
};
