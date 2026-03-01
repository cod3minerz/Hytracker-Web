"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

type AnimateBy = "words" | "letters";
type Direction = "top" | "bottom";

interface BlurHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
  animateBy?: AnimateBy;
  direction?: Direction;
  delay?: number;
  stepDuration?: number;
  /** Return a class name for the word at index (e.g. "text-primary" for highlight) */
  getWordClassName?: (index: number) => string;
}

const defaultProps = {
  animateBy: "words" as AnimateBy,
  direction: "top" as Direction,
  delay: 100,
  stepDuration: 0.35,
};

export function BlurHeading({
  text,
  as: Tag = "h1",
  className = "",
  style,
  animateBy = defaultProps.animateBy,
  direction = defaultProps.direction,
  delay = defaultProps.delay,
  stepDuration = defaultProps.stepDuration,
  getWordClassName,
}: BlurHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const yOffset = direction === "top" ? -12 : 12;

  if (animateBy === "words") {
    const words = text.split(/\s+/).filter(Boolean);
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
        {words.map((word, i) => (
          <motion.span
            key={`${i}-${word}`}
            className={getWordClassName?.(i) ? `inline ${getWordClassName(i)}` : "inline"}
            initial={{
              filter: "blur(12px)",
              opacity: 0,
              y: yOffset,
            }}
            animate={
              inView
                ? {
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: stepDuration,
              delay: i * (delay / 1000),
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </Tag>
    );
  }

  const letters = text.split("");
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${i}-${letter}`}
          className="inline-block"
          initial={{
            filter: "blur(8px)",
            opacity: 0,
            y: yOffset,
          }}
          animate={
            inView
              ? {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: stepDuration,
            delay: i * (delay / 1000) * 0.05,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </Tag>
  );
}
