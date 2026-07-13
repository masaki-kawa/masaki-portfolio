"use client";

/**
 * Typographic flourishes used across the Home terminal composition.
 *   - TypedLine: types a string character-by-character with a blinking block cursor.
 *   - Scramble:  scrambles random glyphs into the target value on mouse enter.
 *
 * Both are pure presentational components; they own their own animation
 * state and do not touch context.
 */

import { useEffect, useRef, useState } from "react";

type TypedLineProps = {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
};

export function TypedLine({
  text,
  speed = 22,
  className = "",
  cursor = true,
}: TypedLineProps) {
  const [n, setN] = useState(0);
  // "Adjusting state while rendering" pattern — resets the typewriter
  // whenever `text` changes (e.g. language toggle) without an effect.
  const [prevText, setPrevText] = useState(text);
  if (prevText !== text) {
    setPrevText(text);
    setN(0);
  }

  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN((prev) => prev + 1), speed);
    return () => clearTimeout(id);
  }, [n, text, speed]);

  return (
    <span className={className}>
      {text.slice(0, n)}
      {cursor && (
        <span
          aria-hidden
          className="blink ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[1px] bg-mint align-baseline"
        />
      )}
    </span>
  );
}

type ScrambleProps = {
  value: string;
  className?: string;
};

export function Scramble({ value, className = "" }: ScrambleProps) {
  const [display, setDisplay] = useState(value);
  // Same "adjust during render" pattern — when the target value changes,
  // snap the displayed string to match immediately.
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    setDisplay(value);
  }
  const raf = useRef(0);
  const frame = useRef(0);

  const onEnter = () => {
    cancelAnimationFrame(raf.current);
    const chars = "!<>-_\\/[]{}=+*^?#".split("");
    frame.current = 0;
    const total = 14;
    const step = () => {
      frame.current += 1;
      const progress = frame.current / total;
      const out = value
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i / value.length < progress) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(out);
      if (frame.current < total) {
        raf.current = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  return (
    <span onMouseEnter={onEnter} className={className}>
      {display}
    </span>
  );
}
