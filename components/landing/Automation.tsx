"use client";

import { useEffect, useState } from "react";

const CARD_BASE = {
  borderRadius: "12px",
  border: "0.8px solid rgba(255,255,255,0.06)",
  background: "linear-gradient(45deg, rgb(12,13,15) 0%, rgb(7,8,10) 100%)",
  overflow: "hidden",
  boxShadow: "inset 0px 1px 0px rgba(255,255,255,0.12)",
} as const;

export default function Automation() {
  const [snippetsBorder, setSnippetsBorder] = useState("rgba(255,255,255,0.06)");
  const [quicklinksBorder, setQuicklinksBorder] = useState("rgba(255,255,255,0.06)");
  const [hotkeysBorder, setHotkeysBorder] = useState("rgba(255,255,255,0.06)");
  const [activeKey, setActiveKey] = useState(0); // 0: idle, 1: opt, 2: cmd, 3: L, 4: all pressed

  useEffect(() => {
    const sequence = [
      { key: 1, delay: 1000 },
      { key: 2, delay: 300 },
      { key: 3, delay: 300 },
      { key: 4, delay: 600 },
      { key: 0, delay: 2000 },
    ];
    
    let step = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      const current = sequence[step];
      setActiveKey(current.key);
      timer = setTimeout(() => {
        step = (step + 1) % sequence.length;
        run();
      }, current.delay);
    };

    run();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ padding: "88px 24px 126px" }}>
      <div style={{ maxWidth: "1204px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.2px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Don&apos;t repeat yourself.
          </h2>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "rgb(106,107,108)",
              letterSpacing: "0.2px",
              margin: "2px 0 0",
            }}
          >
            Automate the things you do all the time.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
          <div
            style={{
              ...CARD_BASE,
              position: "relative",
              minHeight: "220px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: "20px",
              padding: "0 18px 0 0",
              background: "linear-gradient(180deg, rgba(13,14,16,0.98) 0%, rgba(8,9,11,1) 100%)",
              border: `0.8px solid ${snippetsBorder}`,
              transition: "border-color 200ms ease",
            }}
            onMouseEnter={() => setSnippetsBorder("rgba(255,255,255,0.1)")}
            onMouseLeave={() => setSnippetsBorder("rgba(255,255,255,0.06)")}
          >
            <div
              style={{
                position: "absolute",
                top: "-14px",
                left: "40px",
                right: "20px",
                height: "248px",
                filter: "blur(22px)",
                background:
                  "radial-gradient(52% 100% at 78% 46%, rgba(57,129,255,0.18) 0%, rgba(34,87,212,0.11) 34%, rgba(10,14,24,0) 78%)",
                pointerEvents: "none",
              }}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blue-glass-backdrop.png"
              alt=""
              style={{
                position: "absolute",
                left: "44%",
                right: "-2%",
                top: "49%",
                transform: "translateY(-46%) scale(1.05)",
                width: "auto",
                height: "auto",
                opacity: 0.92,
                zIndex: 0,
                maxHeight: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                flex: "1 1 360px",
                maxWidth: "432px",
                padding: "24px 24px 24px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "14px",
              }}
            >
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M11.75 2.75h1.5m-10.5 0h5.5m.5 10.5h4.5m-10.5 0h2.5m-2.5-3.5h4.5m3.5 0h2.5m-10.5-3.5h1.5m3.5 0h5.5"
                  />
                </svg>
                Snippets
              </h5>
              <p style={{ fontSize: "14px", color: "rgb(156,156,157)", lineHeight: 1.6, margin: 0 }}>
                Tired of typing the same thing? Create a snippet and insert it by simply typing its keyword.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                flex: "1 1 420px",
                width: "min(100%, 459px)",
                height: "184px",
                margin: "14px 0 14px auto",
                padding: "19px 22px 18px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "linear-gradient(136.285deg, rgba(15,20,25,0.72) 4.87%, rgba(9,14,20,0.88) 75.88%)",
                border: "0.8px solid rgba(255,255,255,0.07)",
                boxShadow: "0px 18px 40px rgba(0,0,0,0.28), inset 0px 1px 0px rgba(255,255,255,0.08)",
              }}
            >
              <SnippetShowcase />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                ...CARD_BASE,
                display: "flex",
                flexDirection: "column",
                flex: "1 1 0",
                minWidth: "320px",
                minHeight: "316px",
                background: "linear-gradient(180deg, rgba(12,13,15,0.98) 0%, rgba(7,8,10,1) 100%)",
                border: `0.8px solid ${quicklinksBorder}`,
                transition: "border-color 200ms ease",
              }}
              onMouseEnter={() => setQuicklinksBorder("rgba(255,255,255,0.1)")}
              onMouseLeave={() => setQuicklinksBorder("rgba(255,255,255,0.06)")}
            >
              <QuicklinksShowcase />

              <div style={{ padding: "23px 24px 24px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4.25 7.75 2.539 9.654a2.692 2.692 0 1 0 3.807 3.807L8.25 11.75m3.5-3.5 1.711-1.904A2.692 2.692 0 1 0 9.654 2.54L7.75 4.25m-1 5 2.5-2.5"
                    />
                  </svg>
                  Quicklinks
                </h5>
                <p style={{ fontSize: "14px", color: "rgb(156,156,157)", lineHeight: 1.6, margin: 0 }}>
                  Say goodbye to open tabs. Create quicklinks to launch anything from anywhere.
                </p>
              </div>
            </div>

            <div
              style={{
                ...CARD_BASE,
                display: "flex",
                flexDirection: "column",
                flex: "1 1 0",
                minWidth: "320px",
                minHeight: "316px",
                background: "linear-gradient(180deg, rgba(12,13,15,0.98) 0%, rgba(7,8,10,1) 100%)",
                border: `0.8px solid ${hotkeysBorder}`,
                transition: "border-color 200ms ease",
              }}
              onMouseEnter={() => setHotkeysBorder("rgba(255,255,255,0.1)")}
              onMouseLeave={() => setHotkeysBorder("rgba(255,255,255,0.06)")}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px 18px 0",
                }}
              >
                <KeyboardKey primary="option" secondary={"\u2325"} width={124} active={activeKey === 1 || activeKey === 4} />
                <span
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.34)",
                    fontWeight: 300,
                    transform: "translateY(-2px)",
                  }}
                >
                  +
                </span>
                <KeyboardKey primary="command" secondary={"\u2318"} width={154} active={activeKey === 2 || activeKey === 4} />
                <span
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.34)",
                    fontWeight: 300,
                    transform: "translateY(-2px)",
                  }}
                >
                  +
                </span>
                <KeyboardKey letter="L" width={120} active={activeKey === 3 || activeKey === 4} />
              </div>

              <div style={{ padding: "23px 24px 24px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.75 4.75h10.5m-10.5 3h6.5m-6.5 3h4"
                    />
                  </svg>
                  Hotkeys and Aliases
                </h5>
                <p style={{ fontSize: "14px", color: "rgb(156,156,157)", lineHeight: 1.6, margin: 0 }}>
                  Speed up your workflow by assigning hotkeys or aliases to common commands or apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuicklinksShowcase() {
  return (
    <div
      style={{
        height: "207px",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          marginTop: "14px",
          marginBottom: "6px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.035)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          gap: "8px",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm4.5 1.5 2.5 2.5"
          />
        </svg>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>scratch</span>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", marginLeft: "1px" }}>|</span>
      </div>

      <div
        style={{
          padding: "4px 4px 6px",
          fontSize: "10px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Results
      </div>

      {[
        { icon: "F", name: "Figma Scratchpad", url: "figma.com", color: "#6B40C4" },
        { icon: "F", name: "Framer Scratchpad", url: "framer.com", color: "#0055FF" },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "7px 8px",
            borderRadius: "7px",
            background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
            marginBottom: "2px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              background: item.color,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {item.icon}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: "13px", color: i === 0 ? "white" : "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              {item.name}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{item.url}</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.2, flexShrink: 0 }}>
            <path
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6.25 3.75h6m0 0v6m0-6-8.5 8.5"
            />
          </svg>
        </div>
      ))}

      <div style={{ display: "flex", alignItems: "center", padding: "5px 8px", gap: "6px", marginTop: "2px" }}>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.2)",
            padding: "2px 6px",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.04)",
            fontFamily: "monospace",
          }}
        >
          OPTION + COMMAND + L
        </span>
      </div>
    </div>
  );
}

function KeyboardKey({
  primary,
  secondary,
  letter,
  width,
  active,
}: {
  primary?: string;
  secondary?: string;
  letter?: string;
  width: number;
  active?: boolean;
}) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "120px",
        borderRadius: "12px",
        background: active 
          ? "linear-gradient(180deg, rgb(45,45,47) 0%, rgb(25,25,25) 100%)"
          : "linear-gradient(180deg, rgb(30,30,31) 0%, rgb(13,13,13) 100%)",
        border: active 
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: active
          ? "0px 10px 15px rgba(0,0,0,0.4), 0px 0px 0.5px 1px rgba(0,0,0,0.92), inset 0px 1px 0px rgba(255,255,255,0.35), inset 0px -1px 0px rgba(0,0,0,0.58)"
          : "0px 18px 24px rgba(0,0,0,0.26), 0px 0px 0.5px 1px rgba(0,0,0,0.92), inset 0px 1px 0px rgba(255,255,255,0.22), inset 0px -1px 0px rgba(0,0,0,0.58)",
        display: "flex",
        flexDirection: "column",
        alignItems: letter ? "center" : "flex-start",
        justifyContent: letter ? "center" : "space-between",
        padding: letter ? "0" : "16px 17px",
        transform: active ? "translateY(2px)" : "translateY(0)",
        transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {letter ? (
        <span
          style={{
            fontSize: "35px",
            color: active ? "white" : "rgb(218,218,219)",
            fontWeight: 400,
            lineHeight: 1,
            textShadow: active ? "0px 0px 10px rgba(255,255,255,0.3)" : "0px 0.5px 0.5px rgba(0,0,0,0.1)",
            transition: "color 150ms ease",
          }}
        >
          {letter}
        </span>
      ) : (
        <>
          <div style={{ alignSelf: "flex-end" }}>
            <span
              style={{
                fontSize: "19px",
                color: active ? "white" : "rgb(218,218,219)",
                fontWeight: 300,
                lineHeight: 1,
                fontFamily: "SF Pro Text, system-ui, sans-serif",
                transition: "color 150ms ease",
              }}
            >
              {secondary}
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: "15px",
                color: active ? "white" : "rgb(218,218,219)",
                fontWeight: 500,
                lineHeight: 1,
                textShadow: active ? "0px 0px 10px rgba(255,255,255,0.3)" : "0px 0.5px 0.5px rgba(0,0,0,0.1)",
                fontFamily: "SF Pro Text, system-ui, sans-serif",
                transition: "color 150ms ease",
              }}
            >
              {primary}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function SnippetShowcase() {
  const [typedText, setTypedText] = useState("");
  const [expanded, setExpanded] = useState(true);
  const keyword = ":address";
  const expansion = "3rd Floor 1 Ashley Road, WA14 2DT Altrincham, Cheshire";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;

    const startTyping = () => {
      setTypedText("");
      setExpanded(false);
      i = 0;
      typeChar();
    };

    const typeChar = () => {
      if (i <= keyword.length) {
        setTypedText(keyword.slice(0, i));
        i++;
        timeout = setTimeout(typeChar, 80 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => {
          setExpanded(true);
          timeout = setTimeout(startTyping, 3600);
        }, 300);
      }
    };

    timeout = setTimeout(startTyping, 2800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <p style={{ fontSize: "16px", color: "white", fontWeight: 500, margin: "0 0 16px", lineHeight: 1.6 }}>
          Sure, here you go:
        </p>
        <p
          style={{
            fontSize: "16px",
            color: expanded ? "rgb(140,214,255)" : "rgba(255,255,255,0.4)",
            margin: 0,
            minHeight: "52px",
            lineHeight: 1.58,
            transition: "color 200ms ease",
            maxWidth: "360px",
          }}
        >
          {expanded ? (
            expansion
          ) : (
            <>
              {typedText}
              <span
                style={{
                  display: "inline-block",
                  width: "1.5px",
                  height: "16px",
                  background: "rgba(255,255,255,0.6)",
                  verticalAlign: "middle",
                  marginLeft: "1px",
                  animation: "blink 1s step-end infinite",
                }}
              />
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </>
          )}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.02)",
            border: "0.8px solid rgba(255,255,255,0.1)",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: "14px",
          }}
        >
          {"\u263A"}
        </div>
        <button
          style={{
            padding: "5.8px 12px 7.2px",
            borderRadius: "4px",
            background: "rgb(230,230,230)",
            color: "rgb(47,48,49)",
            fontSize: "14px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            boxShadow:
              "0px 0px 0px 2px rgba(0,0,0,0.5), 0px 0px 14px 0px rgba(255,255,255,0.19), inset 0px -1px 0.4px rgba(0,0,0,0.2), inset 0px 1px 0.4px white",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
