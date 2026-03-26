"use client";

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

// Each null in a row is a feature key placeholder (filled left-to-right per row)
const ROWS: KeyDef[][] = [
  // Row 0 — function row
  [{ label: "esc", w: 167 }, { label: "F1" }, { label: "F2" }, { label: "F3" }, { label: "F4" }, { label: "F5" }, { label: "F6" }, { label: "F7" }, { label: "F8" }, { label: "F9" }, { label: "F10" }, { label: "F11" }, { label: "F12" }, { label: "" }],
  // Row 1 — number row (shift-state symbols)
  [{ label: "±" }, { label: "!" }, { label: "@" }, { label: "#" }, { label: "$" }, { label: "%" }, { label: "^" }, { label: "&" }, { label: "*" }, { label: "(" }, { label: ")" }, { label: "_" }, { label: "+" }, { label: "delete", w: 168 }],
  // Row 2 — tab + Fast + Ergonomic + E … |
  [{ label: "tab", w: 168 }, null, null, { label: "E" }, { label: "R" }, { label: "T" }, { label: "Y" }, { label: "U" }, { label: "I" }, { label: "O" }, { label: "P" }, { label: "{" }, { label: "}" }, { label: "|" }],
  // Row 3 — Native + Reliable + S … return
  [null, null, { label: "S" }, { label: "D" }, { label: "F" }, { label: "G" }, { label: "H" }, { label: "J" }, { label: "K" }, { label: "L" }, { label: ":" }, { label: '"' }, { label: "↵", w: 206 }],
  // Row 4 — Z row (shift-state)
  [{ label: "⇧", w: 137 }, { label: "~" }, { label: "Z" }, { label: "X" }, { label: "C" }, { label: "V" }, { label: "B" }, { label: "N" }, { label: "M" }, { label: "<" }, { label: ">" }, { label: "?" }, { label: "⇧", w: 262 }],
  // Row 5 — space row
  [{ label: "fn" }, { label: "ctrl" }, { label: "opt" }, { label: "⌘", w: 139 }, { label: "", w: 599 }, { label: "⌘", w: 139 }, { label: "opt" }],
];

// Features indexed per row
const FEATURES_BY_ROW: Record<number, typeof FEATURES> = {
  2: [FEATURES[0], FEATURES[1]],
  3: [FEATURES[2], FEATURES[3]],
};

export default function FeatureWall() {
  return (
    <section style={{
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        maxWidth: "1204px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "440px 679px",
        gap: "85px",
        alignItems: "center",
        minHeight: "720px",
      }}>
        {/* Left: text + download */}
        <div style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          justifyContent: "center",
        }}>
          <div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              margin: "0 0 4px",
            }}>
              It&apos;s not about saving time.
            </h2>
            <p style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}>
              It&apos;s about feeling like you&apos;re never wasting it.
            </p>
          </div>
          <a
            href="#download"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              height: "36px",
              padding: "0 16px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.9)",
              color: "rgb(14,15,16)",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              boxShadow: "rgba(0,0,0,0.4) 0px 0px 0px 1.5px, rgba(255,255,255,0.15) 0px 0px 10px 0px",
              transition: "opacity 150ms ease",
              alignSelf: "flex-start",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            <svg width="12" height="14" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.5-127.8C46.5 629.7 0 501.4 0 373.8c0-14.5.7-29 2-43.5 11.1-119.4 80.6-221.3 170.4-272.1 24.6-14.5 50.6-25.9 77.9-33.8 27.6-8 56.4-11.8 85.3-11.8 29.5 0 57.1 11.6 82.7 15.5 22.2 3.4 44.2 11.5 66.3 11.5 21.2 0 42.3-7.4 63.1-9.5 28.4-2.8 56.5 3.2 83.3 11.7 28.7 9.2 55.2 25 77.4 45.6z" />
            </svg>
            Download
          </a>
        </div>

        {/* Right: keyboard — overflows to the right, clipped */}
        <div style={{ overflow: "hidden", paddingLeft: "24px" }}>
          <KeyboardWithFeatures />
        </div>
      </div>
    </section>
  );
}

function KeyboardWithFeatures() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `${KEY_GAP}px` }}>
      {ROWS.map((row, rowIdx) => {
        let featureIdx = 0;
        return (
          <div key={rowIdx} style={{ display: "flex", gap: `${KEY_GAP}px` }}>
            {row.map((key, ki) => {
              if (key === null) {
                const feat = FEATURES_BY_ROW[rowIdx]?.[featureIdx++];
                if (!feat) return null;
                return <FeatureKey key={ki} feat={feat} />;
              }
              const w = key.w ?? KEY_W;
              return (
                <div key={ki} style={{
                  width: `${w}px`,
                  height: `${KEY_H}px`,
                  borderRadius: "10px",
                  background: "radial-gradient(75% 75% at 50% 91.9%, rgb(18,18,18) 0px, rgb(10,10,10) 100%)",
                  boxShadow: "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.2) 0px 2px 1px 1px inset, rgba(255,255,255,0.07) 0px 1px 1px 0px inset",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  padding: "0 0 10px 12px",
                  opacity: 0.2,
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: "14px", color: "rgb(180,180,180)", fontWeight: 400 }}>{key.label}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function FeatureKey({ feat }: { feat: typeof FEATURES[0] }) {
  return (
    <div
      style={{
        width: `${feat.width}px`,
        height: `${KEY_H}px`,
        borderRadius: "10px",
        background: "radial-gradient(75% 75% at 50% 91.9%, rgb(21,21,21) 0px, rgb(13,13,13) 100%)",
        boxShadow: "rgb(0,0,0) 0px 0px 0.5px 1px, rgba(0,0,0,0.25) 0px 2px 1px 1px inset, rgba(255,255,255,0.15) 0px 1px 1px 0px inset",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px 12px 10px",
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
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(255,255,255,0.6)" }}>
        {feat.svgPath}
      </svg>
      <div style={{ fontSize: "11px", lineHeight: 1.35, color: "rgba(255,255,255,0.7)" }}>
        <strong style={{ color: "white", fontWeight: 600 }}>{feat.bold}</strong>
        <span>{feat.text}</span>
      </div>
    </div>
  );
}
