"use client";

import React, { useEffect, useRef } from "react";

// ─── Keyboard data ──────────────────────────────────────────────────────
type KeyDef = {
  label?: string;
  altLabel?: string;
  icon?: string;
  w?: number;
  glow?: boolean;
  smallLabel?: boolean;
};

const ROWS: KeyDef[][] = [
  // Row 0 – Function row
  [
    { label: "esc", w: 167, smallLabel: true },
    { label: "F1", w: 110, smallLabel: true },
    { label: "F2", w: 110, smallLabel: true },
    { label: "F3", w: 110, smallLabel: true },
    { label: "F4", w: 110, smallLabel: true },
    { label: "F5", w: 110, smallLabel: true },
    { label: "F6", w: 110, smallLabel: true },
    { label: "F7", w: 110, smallLabel: true },
    { label: "F8", w: 110, smallLabel: true },
    { label: "F9", w: 110, smallLabel: true },
    { label: "F10", w: 110, smallLabel: true },
    { label: "F11", w: 110, smallLabel: true },
    { label: "F12", w: 110, smallLabel: true },
    { w: 110 }, // eject
  ],
  // Row 1 – Number row
  [
    { label: "§", altLabel: "±", w: 110 },
    { label: "1", altLabel: "!", w: 110 },
    { label: "2", altLabel: "@", w: 110 },
    { label: "3", altLabel: "#", w: 110 },
    { label: "4", altLabel: "$", w: 110 },
    { label: "5", altLabel: "%", w: 110 },
    { label: "6", altLabel: "^", w: 110 },
    { label: "7", altLabel: "&", w: 110 },
    { label: "8", altLabel: "*", w: 110 },
    { label: "9", altLabel: "(", w: 110 },
    { label: "0", altLabel: ")", w: 110 },
    { label: "-", altLabel: "_", w: 110 },
    { label: "=", w: 110 },
    { label: "delete", w: 168, smallLabel: true },
  ],
  // Row 2 – QWERTY row
  [
    { label: "tab", w: 167, smallLabel: true },
    { label: "Q", w: 110 },
    { label: "W", w: 110 },
    { label: "E", w: 110 },
    { label: "R", w: 110 },
    { label: "T", w: 110 },
    { label: "Y", w: 110 },
    { label: "U", w: 110 },
    { label: "I", w: 110 },
    { label: "O", w: 110 },
    { label: "P", w: 110 },
    { label: "[", altLabel: "{", w: 110 },
    { label: "]", w: 110 },
    { label: "\\", w: 110 },
  ],
  // Row 3 – Home row
  [
    { label: "caps lock", w: 193, smallLabel: true },
    { label: "A", w: 110 },
    { label: "S", w: 110 },
    { label: "D", w: 110 },
    { label: "F", w: 110 },
    { label: "G", w: 110 },
    { label: "H", w: 110 },
    { label: "J", w: 110 },
    { label: "K", w: 110 },
    { label: "L", w: 110 },
    { label: ";", altLabel: ":", w: 110 },
    { label: "'", w: 110 },
    { label: "return", w: 206, smallLabel: true },
  ],
  // Row 4 – Shift row
  [
    { label: "⇧", w: 137, smallLabel: true },
    { label: "`", altLabel: "~", w: 110 },
    { label: "Z", w: 110 },
    { label: "X", w: 110 },
    { label: "C", w: 110 },
    { label: "V", w: 110 },
    { label: "B", w: 110 },
    { label: "N", w: 110 },
    { label: "M", w: 110 },
    { label: ",", altLabel: "<", w: 110 },
    { label: ".", altLabel: ">", w: 110 },
    { label: "/", altLabel: "?", w: 110 },
    { label: "⇧", w: 192, smallLabel: true },
  ],
  // Row 5 – Modifier row
  [
    { label: "fn", w: 110, smallLabel: true },
    { label: "control", w: 110, smallLabel: true },
    { label: "option", w: 110, smallLabel: true },
    { label: "command", w: 138, glow: true, smallLabel: true, icon: "⌘" },
    { label: "", w: 599, glow: true }, // space bar
    { label: "command", w: 138, smallLabel: true, icon: "⌘" },
    { label: "option", w: 110, smallLabel: true },
    { label: "←", w: 110 },
    { label: "↑↓", w: 110 },
    { label: "→", w: 110 },
  ],
];

// ─── Main component ─────────────────────────────────────────────────────
export default function DownloadCTA() {
  return (
    <section
      id="download"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
        paddingBottom: "224px",
      }}
    >
      {/* Keyboard */}
      <AnimatedCmdSpaceKeyboard />

      {/* CTA content below keyboard but pulled up via negative margin to overlap */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
          zIndex: 5,
          marginTop: "50px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: "0 0 8px",
            }}
          >
            Take the short way.
          </h2>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Download and use Raycast for free.
          </p>
          <div style={{ height: "80px" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <DownloadButton icon="apple" label="Download for Mac" variant="light" />
            <DownloadButton icon="windows" label="Download for Windows (beta)" variant="light" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span>v1.104.11</span>
            <span
              style={{
                width: "1px",
                height: "10px",
                background: "rgba(255,255,255,0.25)",
                display: "inline-block",
              }}
            />
            <span>macOS 13+</span>
            <span
              style={{
                width: "1px",
                height: "10px",
                background: "rgba(255,255,255,0.25)",
                display: "inline-block",
              }}
            />
            <span
              style={{ cursor: "pointer", textDecoration: "underline", transition: "color 150ms ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ""; }}
            >
              Install via homebrew
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Download button ────────────────────────────────────────────────────
function DownloadButton({
  icon,
  label,
  variant,
}: {
  icon: "apple" | "windows";
  label: string;
  variant: "light" | "dark";
}) {
  const isLight = variant === "light";
  return (
    <a
      href="#download"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        height: "40px",
        padding: "0 18px",
        borderRadius: "8px",
        background: isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.08)",
        color: isLight ? "rgb(14,15,16)" : "white",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        boxShadow: isLight
          ? "rgba(0, 0, 0, 0.5) 0px 0px 0px 2px, rgba(255, 255, 255, 0.19) 0px 0px 14px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0.4px 0px inset, rgb(255, 255, 255) 0px 1px 0.4px 0px inset"
          : "rgba(255,255,255,0.08) 0px 0px 0px 1px inset",
        whiteSpace: "nowrap",
        backdropFilter: isLight ? "none" : "blur(12px)",
        WebkitBackdropFilter: isLight ? "none" : "blur(12px)",
        transition: "background 0.2s, box-shadow 0.2s, opacity 0.2s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        if (isLight) {
          el.style.opacity = "0.88";
        } else {
          el.style.background = "rgba(255,255,255,0.13)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        if (isLight) {
          el.style.opacity = "1";
        } else {
          el.style.background = "rgba(255,255,255,0.08)";
        }
      }}
    >
      {icon === "apple" ? <AppleIcon /> : <WindowsIcon />}
      {label}
    </a>
  );
}

function AppleIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.5-127.8C46.5 629.7 0 501.4 0 373.8c0-14.5.7-29 2-43.5 11.1-119.4 80.6-221.3 170.4-272.1 24.6-14.5 50.6-25.9 77.9-33.8 27.6-8 56.4-11.8 85.3-11.8 29.5 0 57.1 11.6 82.7 15.5 22.2 3.4 44.2 11.5 66.3 11.5 21.2 0 42.3-7.4 63.1-9.5 28.4-2.8 56.5 3.2 83.3 11.7 28.7 9.2 55.2 25 77.4 45.6z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.066 41.455-47.318-6.82-.066-34.752z" />
    </svg>
  );
}

// ─── Keyboard component ─────────────────────────────────────────────────
function AnimatedCmdSpaceKeyboard() {
  const cmdRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [cmdRef.current, spaceRef.current].filter(Boolean);
    if (!els.length) return;

    // Apply glow immediately
    els.forEach((el) => el && el.setAttribute("data-glowing", "true"));

    const interval = setInterval(() => {
      const cmd = cmdRef.current;
      const space = spaceRef.current;
      if (!cmd || !space) return;

      cmd.setAttribute("data-pressed", "true");
      setTimeout(() => space.setAttribute("data-pressed", "true"), 150);
      setTimeout(() => space.removeAttribute("data-pressed"), 350);
      setTimeout(() => cmd.removeAttribute("data-pressed"), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1440px",
        overflow: "hidden",
        /* Scale down the keyboard slightly so it fits better */
        transform: "scale(0.9)",
        transformOrigin: "bottom center",
      }}
    >
      {/* Keyboard with radial mask */}
      <div
        style={{
          width: "1754px",
          height: "770px",
          WebkitMaskImage:
            "radial-gradient(43.1% 67.12% at 48.11% 80%, rgb(217,217,217) 0px, rgba(217,217,217,0) 100%)",
          maskImage:
            "radial-gradient(43.1% 67.12% at 48.11% 80%, rgb(217,217,217) 0px, rgba(217,217,217,0) 100%)",
        }}
      >
        {/* Inner keyboard container offset to match Figma */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "137px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {ROWS.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "12px",
                  height: "110px",
                }}
              >
                {row.map((key, ki) => {
                  const isCmd = ri === 5 && ki === 3;
                  const isSpace = ri === 5 && ki === 4;
                  return (
                    <KeyComponent
                      key={ki}
                      def={key}
                      ref={isCmd ? cmdRef : isSpace ? spaceRef : undefined}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for keys */}
      <style>{`
        .kbd-key {
          position: relative;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          height: 100%;
          padding: 14.5px 15px;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
          font-weight: 500;
          color: white;
          user-select: none;
          border-radius: 11px;
          background: radial-gradient(75% 75% at 50% 91.9%, rgb(18,18,18) 0px, rgb(13,13,13) 100%);
          transition: background 0.4s, box-shadow 0.4s, color 0.4s, transform 0.15s;
        }
        .kbd-key::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow:
            rgb(0, 0, 0) 0px 0px 0.5px 1px;
        }
        .kbd-key::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow:
            inset 0px 2px 1px 1px rgba(0,0,0,0.25),
            inset 0px 1px 1px 1px rgba(255,255,255,0.15);
        }
        .kbd-key[data-glowing="true"] {
          background: linear-gradient(rgb(22, 22, 22) 0px, rgb(34, 34, 34) 100%);
          color: rgb(255, 205, 205);
        }
        .kbd-key[data-glowing="true"]::after {
          box-shadow: 
            rgba(255, 67, 7, 0.1) 0px 0px 10px 5px, 
            rgba(255, 67, 7, 0.1) 0px 0px 3px 2px, 
            rgba(255, 118, 118, 0.25) 1px 0.5px 0.5px 0.5px inset, 
            rgba(255, 255, 255, 0.45) 0px 0px 1px 1px inset, 
            rgba(0, 0, 0, 0.25) 0px 2px 1px 1px inset;
        }
        .kbd-key:not([data-glowing="true"]):hover {
          background: linear-gradient(rgb(10, 10, 10) 0px, rgb(20, 20, 20) 100%);
        }
        .kbd-key:not([data-glowing="true"]):hover::before {
          box-shadow: rgb(0, 0, 0) 0px 0px 0px 1.5px;
        }
        .kbd-key:not([data-glowing="true"]):hover::after {
          box-shadow:
            inset 0px 2px 1px 1px rgba(0,0,0,0.45),
            inset 0px 1px 1px 1px rgba(255,255,255,0.08);
        }
        .kbd-key[data-pressed="true"] {
          transform: translateY(2px);
        }
        .kbd-label-primary {
          display: flex;
          align-items: flex-end;
          flex: 1;
          font-size: 32px;
          line-height: 1;
          text-shadow: 0px 0.5px 0.5px rgba(0,0,0,0.1);
        }
        .kbd-label-primary.small {
          font-size: 16px;
        }
        .kbd-label-alt {
          display: flex;
          align-items: flex-start;
          flex: 1;
          font-size: 24px;
          line-height: 1;
          color: rgba(255,255,255,0.5);
          text-shadow: 0px 0.5px 0.5px rgba(0,0,0,0.1);
        }
        .kbd-label-icon {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          flex: 1;
          font-size: 18px;
          line-height: 1;
          color: rgba(255,255,255,0.5);
          text-shadow: 0px 0.5px 0.5px rgba(0,0,0,0.1);
        }
        .kbd-key[data-glowing="true"] .kbd-label-alt,
        .kbd-key[data-glowing="true"] .kbd-label-icon {
          color: rgba(255,190,170,0.6);
        }
      `}</style>
    </div>
  );
}

// ─── Key component ──────────────────────────────────────────────────────
const KeyComponent = React.forwardRef<HTMLDivElement, { def: KeyDef }>(
  ({ def }, ref) => {
    const hasAlt = !!def.altLabel;
    const hasIcon = !!def.icon;
    const isSmall = def.smallLabel === true;

    return (
      <div
        ref={ref}
        className="kbd-key"
        data-glowing={def.glow ? "true" : undefined}
        style={{ width: `${def.w ?? 110}px` }}
      >
        {/* Top row: alt label or icon */}
        {hasIcon ? (
          <div className="kbd-label-icon">{def.icon}</div>
        ) : hasAlt ? (
          <div className="kbd-label-alt">{def.altLabel}</div>
        ) : (
          <div style={{ flex: 1 }} />
        )}
        {/* Bottom row: primary label */}
        <div className={`kbd-label-primary${isSmall ? " small" : ""}`}>
          {def.label}
        </div>
      </div>
    );
  }
);
KeyComponent.displayName = "KeyComponent";
