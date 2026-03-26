"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    bold: "Fast.",
    text: " Think in milliseconds.",
    width: 178,
    svgPath: <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4.75v2.836a1 1 0 0 0 .293.707l1.957 1.957m4-2.25a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" />,
  },
  {
    bold: "Ergonomic.",
    text: "\nKeyboard First.",
    width: 208,
    svgPath: (
      <path fill="#D8D8D8" d="M6.593 8.447v4.626H4.611q-1.065 0-1.942.505a3.84 3.84 0 0 0-1.396 1.37 3.7 3.7 0 0 0-.52 1.941q0 1.066.52 1.942a4 4 0 0 0 1.396 1.403q.876.526 1.942.526t1.942-.526a4 4 0 0 0 1.395-1.403 3.74 3.74 0 0 0 .52-1.942V14.92h4.558v1.97q0 1.065.526 1.941.525.877 1.396 1.403t1.935.526q1.066 0 1.942-.526a4 4 0 0 0 1.396-1.403q.52-.876.52-1.942 0-1.078-.52-1.942a3.84 3.84 0 0 0-3.338-1.875h-1.99V8.447h4.046V6.553H2.547v1.894z" />
    ),
  },
  {
    bold: "Native.",
    text: " Pure performance.",
    width: 208,
    svgPath: (
      <>
        <path d="M12.0442 5.22429C11.8534 2.48078 14.1641 0.221251 16.8191 0C17.1897 3.1708 13.8322 5.53128 12.0456 5.22291" fill="currentColor" />
        <path d="M14.3427 22.3152C15.5641 22.8393 16.8344 23.0135 17.9979 21.9078L18.0855 21.8285C19.485 20.5566 20.3394 18.862 21 17.1562C17.6058 15.8173 16.7277 11.0316 20.4304 8.85422C19.5407 7.59655 18.1869 6.89828 16.3959 6.7581C14.9007 6.6533 13.5597 7.59469 12.8001 7.64897C12.1077 7.10449 10.8999 6.32836 9.21965 6.21827C6.41398 6.03073 4.12174 7.89219 3 9.56804C6.30937 11.6004 6.9694 16.1483 4 18.7697C5.14247 20.4219 6.72046 21.6619 8.57217 21.991C10.2862 22.2937 11.6226 21.7014 12.7948 21.2344L12.8 21.2325C13.9712 21.6992 14.3383 22.3108 14.3427 22.3152Z" fill="currentColor" />
      </>
    ),
  },
  {
    bold: "Reliable.",
    text: " 99.8% crash-free rate.",
    width: 178,
    svgPath: <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 7.25v0a1.75 1.75 0 0 0 1.75-1.75V3.75m-12.5 0V5.5c0 .966.784 1.75 1.75 1.75m10.75 6V11.5a1.75 1.75 0 0 0-1.75-1.75m-10.75 3.5V11.5c0-.966.784-1.75 1.75-1.75m7.883 2.034C10.826 10.829 9.668 9.75 8 9.75s-2.826 1.079-3.383 2.034m6.766 0c.544-1.05.867-2.362.867-3.784 0-3.452-1.903-6.25-4.25-6.25S3.75 4.548 3.75 8c0 1.422.323 2.734.867 3.784" />,
  },
];

type KeyDef = { label: string; w?: number } | null;

const KEY_H = 110;
const KEY_GAP = 12;
const KEY_W = 110;
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const ROWS: KeyDef[][] = [
  [{ label: "esc", w: 167 }, { label: "F1" }, { label: "F2" }, { label: "F3" }, { label: "F4" }, { label: "F5" }, { label: "F6" }, { label: "F7" }, { label: "F8" }, { label: "F9" }, { label: "F10" }, { label: "F11" }, { label: "F12" }, { label: "" }],
  [{ label: "±" }, { label: "!" }, { label: "@" }, { label: "#" }, { label: "$" }, { label: "%" }, { label: "^" }, { label: "&" }, { label: "*" }, { label: "(" }, { label: ")" }, { label: "_" }, { label: "+" }, { label: "delete", w: 168 }],
  [{ label: "tab", w: 168 }, null, null, { label: "E" }, { label: "R" }, { label: "T" }, { label: "Y" }, { label: "U" }, { label: "I" }, { label: "O" }, { label: "P" }, { label: "{" }, { label: "}" }, { label: "|" }],
  [null, null, { label: "S" }, { label: "D" }, { label: "F" }, { label: "G" }, { label: "H" }, { label: "J" }, { label: "K" }, { label: "L" }, { label: ":" }, { label: '"' }, { label: "↵", w: 206 }],
  [{ label: "⇧", w: 137 }, { label: "~" }, { label: "Z" }, { label: "X" }, { label: "C" }, { label: "V" }, { label: "B" }, { label: "N" }, { label: "M" }, { label: "<" }, { label: ">" }, { label: "?" }, { label: "⇧", w: 262 }],
  [{ label: "fn" }, { label: "ctrl" }, { label: "opt" }, { label: "⌘", w: 139 }, { label: "", w: 599 }, { label: "⌘", w: 139 }, { label: "opt" }],
];

const FEATURES_BY_ROW: Record<number, typeof FEATURES> = {
  2: [FEATURES[0], FEATURES[1]],
  3: [FEATURES[2], FEATURES[3]],
};

// Precompute stagger delays for every key slot in order
const DELAYS: number[][] = (() => {
  let idx = 0;
  return ROWS.map((row, rowIdx) =>
    row.map(() => {
      const d = idx * 0.012 + rowIdx * 0.018;
      idx++;
      return d;
    })
  );
})();

export default function FeatureWall() {
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });

  return (
    <section style={{ overflow: "hidden", position: "relative", padding: "160px 0" }}>
      <div style={{
        maxWidth: "1204px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "480px 679px",
        gap: "60px",
        alignItems: "center",
        minHeight: "800px",
      }}>
        {/* Left: text + download */}
        <div 
          ref={textRef}
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "56px",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              style={{ fontSize: "32px", fontWeight: 600, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}
            >
              It&apos;s not about saving time.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              style={{ fontSize: "32px", fontWeight: 400, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2 }}
            >
              It&apos;s about feeling like you&apos;re never wasting it.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          >
            <a
              href="#download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "40px",
                padding: "0 18px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.92)",
                color: "rgb(14,15,16)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 0px 2px, rgba(255, 255, 255, 0.19) 0px 0px 14px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0.4px 0px inset, rgb(255, 255, 255) 0px 1px 0.4px 0px inset",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = "0.88";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              <AppleIcon />
              Download Raycast
            </a>
          </motion.div>
          </div>

          {/* Right: keyboard — overflows right, clipped */}
          <div style={{ overflow: "hidden", paddingLeft: "24px" }}>
          <KeyboardWithFeatures />
          </div>
          </div>
          </section>
          );
          }

          function AppleIcon() {
          return (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="currentColor" d="M12.665 15.358c-.905.844-1.893.711-2.843.311-1.006-.409-1.93-.427-2.991 0-1.33.551-2.03.391-2.825-.31C-.498 10.886.166 4.078 5.28 3.83c1.246.062 2.114.657 2.843.71 1.09-.213 2.133-.826 3.296-.746 1.393.107 2.446.64 3.138 1.6-2.88 1.662-2.197 5.315.443 6.337-.526 1.333-1.21 2.657-2.345 3.635zM8.03 3.778C7.892 1.794 9.563.16 11.483 0c.268 2.293-2.16 4-3.452 3.777" />
          </svg>
          );
          }
function KeyboardWithFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: `${KEY_GAP}px` }}>
      {ROWS.map((row, rowIdx) => {
        let featureIdx = 0;
        return (
          <div key={rowIdx} style={{ display: "flex", gap: `${KEY_GAP}px` }}>
            {row.map((key, ki) => {
              const delay = DELAYS[rowIdx][ki];
              if (key === null) {
                const feat = FEATURES_BY_ROW[rowIdx]?.[featureIdx++];
                if (!feat) return null;
                return <FeatureKey key={ki} feat={feat} inView={inView} delay={delay} />;
              }
              const w = key.w ?? KEY_W;
              return (
                <motion.div
                  key={ki}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 0.2 : 0 }}
                  transition={{ duration: 0.4, delay, ease: EASE }}
                  style={{
                    width: `${w}px`,
                    height: `${KEY_H}px`,
                    borderRadius: "10px",
                    background: "radial-gradient(75% 75% at 50% 91.9%, rgb(18,18,18) 0px, rgb(10,10,10) 100%)",
                    boxShadow: "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.2) 0px 2px 1px 1px inset, rgba(255,255,255,0.07) 0px 1px 1px 0px inset",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    padding: "0 0 10px 12px",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "13px", color: "rgb(180,180,180)", fontWeight: 400 }}>{key.label}</span>
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function FeatureKey({ feat, inView, delay }: { feat: typeof FEATURES[0]; inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      style={{
        width: `${feat.width}px`,
        height: `${KEY_H}px`,
        borderRadius: "10px",
        background: "radial-gradient(75% 75% at 50% 91.9%, rgb(21,21,21) 0px, rgb(13,13,13) 100%)",
        boxShadow: "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.25) 0px 2px 1px 1px inset, rgba(255,255,255,0.15) 0px 1px 1px 0px inset",
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        padding: "14px 15px 12px",
        flexShrink: 0,
        transition: "box-shadow 200ms ease, background 200ms ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.25) 0px 2px 1px 1px inset, rgba(255,255,255,0.22) 0px 1px 1px 0px inset, rgba(255,100,100,0.08) 0px 0px 16px 4px";
        el.style.background = "radial-gradient(75% 75% at 50% 91.9%, rgb(26,24,24) 0px, rgb(16,14,14) 100%)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.25) 0px 2px 1px 1px inset, rgba(255,255,255,0.15) 0px 1px 1px 0px inset";
        el.style.background = "radial-gradient(75% 75% at 50% 91.9%, rgb(21,21,21) 0px, rgb(13,13,13) 100%)";
      }}
    >
      {/* Icon — top grid cell */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(255,255,255,0.6)" }}>
          {feat.svgPath}
        </svg>
      </div>
      {/* Text — bottom grid cell */}
      <div style={{ display: "flex", alignItems: "flex-end", fontSize: "16px", lineHeight: 1.25, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
        <span>
          <strong style={{ color: "white", fontWeight: 700 }}>{feat.bold}</strong>
          {feat.text}
        </span>
      </div>
    </motion.div>
  );
}
