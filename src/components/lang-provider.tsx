"use client";

/**
 * Language provider for the bilingual Home page.
 *
 * Wraps the whole app from `src/app/layout.tsx` so any descendant (Home
 * components today; About / Work case studies later) can call useLang().
 * The 'L' keyboard shortcut and the EN/JA toggle pill both dispatch
 * through this context.
 */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CopyEnJa, Lang } from "@/types/lang";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/**
 * Small helper: pick the current-language string from a CopyEnJa tuple,
 * falling back to English if a translation is missing.
 */
export function t(copy: CopyEnJa, lang: Lang): string {
  return copy[lang] ?? copy.en;
}
