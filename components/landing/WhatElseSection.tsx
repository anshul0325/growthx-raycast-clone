"use client";

import { useState, useEffect, useCallback } from "react";

const BASE = "https://www.raycast.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F";

const ITEMS = [
  {
    text: "It can take notes.",
    img: `${BASE}raycast-notes.d46cb687.png&w=1200&q=90`,
    alt: "Raycast Notes",
    badge: "Notes",
    subtitle: "Jot down ideas instantly. Raycast Notes keeps your thoughts organized and searchable.",
  },
  {
    text: "Track your flights.",
    img: `${BASE}flight-tracker.41d98c94.png&w=1200&q=90`,
    alt: "Flight Tracker",
    badge: "Flight Tracker",
    subtitle: "Check your flight status without opening a browser. Gate changes, delays — all at a glance.",
  },
  {
    text: "Convert anything.",
    img: `${BASE}calculator.d0b6fc01.png&w=1200&q=90`,
    alt: "Calculator",
    badge: "Calculator",
    subtitle: "Convert currencies or units, calculate time differences and much more.",
  },
  {
    text: "Search files.",
    img: `${BASE}file-search.cc18c68b.png&w=1200&q=90`,
    alt: "File Search",
    badge: "File Search",
    subtitle: "Find any file on your Mac instantly — no Finder needed.",
  },
  {
    text: "Run scripts.",
    img: `${BASE}script-commands.9e5497a7.png&w=1200&q=90`,
    alt: "Script Commands",
    badge: "Script Commands",
    subtitle: "Turn your shell scripts into Raycast commands and run them from anywhere.",
  },
  {
    text: "Manage your windows.",
    img: `${BASE}window-management.42db743b.png&w=1200&q=90`,
    alt: "Window Management",
    badge: "Window Management",
    subtitle: "Resize and arrange windows with keyboard shortcuts. No mouse required.",
  },
  {
    text: "Plan your day.",
    img: `${BASE}schedule.ff46670c.png&w=1200&q=90`,
    alt: "My Schedule",
    badge: "My Schedule",
    subtitle: "See your calendar at a glance. Know what's next without switching apps.",
  },
  {
    text: "Remind you of stuff.",
    img: `${BASE}reminders.68fbffbc.png&w=1200&q=90`,
    alt: "Apple Reminders",
    badge: "Reminders",
    subtitle: "Raycast connects to Apple's Reminders and lets you jot down to-dos.",
  },
  {
    text: "Translate into any language.",
    img: `${BASE}translator.5ac0ae60.png&w=1200&q=90`,
    alt: "Translation",
    badge: "Translator",
    subtitle: "Translate text into any language without leaving your workflow.",
  },
  {
    text: "Block distractions.",
    img: `${BASE}focus.4af7b56f.png&w=1200&q=90`,
    alt: "Raycast Focus",
    badge: "Focus",
    subtitle: "Start a focus session and block distracting apps and websites.",
  },
  {
    text: "Find text in screenshots.",
    img: `${BASE}screenshot-search.bf4d4d93.png&w=1200&q=90`,
    alt: "Search Screenshots",
    badge: "Screenshot Search",
    subtitle: "Search through text inside your screenshots. Like grep, but for images.",
  },
  {
    text: "Insert Emojis.",
    img: `${BASE}emoji-picker.fd3ad392.png&w=1200&q=90`,
    alt: "Search Emojis and Symbols",
    badge: "Emoji Picker",
    subtitle: "Search for and insert any emoji or symbol with a keystroke.",
  },
];

export default function WhatElseSection() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (idx === active) return;
    setPrevActive(active);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => {
      setPrevActive(null);
      setAnimating(false);
    }, 600);
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((active + 1) % ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [active, goTo]);

  return (
    <section style={{ padding: "140px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "80px",
        }}>
          {/* Left: text wall */}
          <div style={{ flex: "0 0 420px", display: "flex", flexDirection: "column", gap: "60px" }}>
            <div style={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}>
              <p style={{ color: "white", margin: "0 0 4px 0" }}>What else can Raycast do?</p>
              <div style={{ color: "rgba(255, 255, 255, 0.25)" }}>
              {ITEMS.map((item, i) => (
                <span key={i}>
                  {i === ITEMS.length - 1 ? (
                    <a
                      href="#"
                      style={{
                        color: i === active ? "white" : "inherit",
                        textShadow: i === active ? "rgba(255,255,255,0.3) 0px 0px 20px" : "none",
                        textDecoration: "underline",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                    >
                      And much, much more.
                    </a>
                  ) : (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => goTo(i)}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (i !== active) el.style.color = "rgba(255,255,255,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (i !== active) el.style.color = "inherit";
                      }}
                      style={{
                        color: i === active ? "white" : "inherit",
                        textShadow: i === active ? "rgba(255,255,255,0.3) 0px 0px 20px" : "none",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.text}
                    </span>
                  )}{" "}
                </span>
              ))}
              </div>
            </div>

            {/* Feature badge + subtitle */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "340px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "26px",
                padding: "0 8px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
                alignSelf: "flex-start",
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                  <path d="M5.5 8.5l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {ITEMS[active].badge}
              </div>
              <p style={{
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                minHeight: "72px",
              }}>
                {ITEMS[active].subtitle}
              </p>
            </div>
          </div>

          {/* Right: desktop frame with feature image */}
          <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{
              borderRadius: "20px",
              boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5)",
              width: "100%",
              maxWidth: "640px",
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                width: "100%",
                aspectRatio: "1.2 / 1",
                padding: "1px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}>
                {/* Inner desktop */}
                <div style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "19px",
                  background: "#0a0a0a",
                  padding: "16px",
                }}>
                  {ITEMS.map((item, i) => (
                    <img
                      key={i}
                      src={item.img}
                      alt={item.alt}
                      style={{
                        position: i === active ? "relative" : "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "none" : (animating && i === prevActive ? "none" : "scale(0.98) translateY(10px)"),
                        transition: i === active
                          ? "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)"
                          : "opacity 0.3s",
                        zIndex: i === active ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination bar */}
            <div style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              width: "280px",
              height: "2px",
              marginTop: "32px",
              alignSelf: "center",
            }}>
              {ITEMS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    position: "relative",
                    flex: 1,
                    height: "100%",
                    background: "rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  {i === active && (
                    <div key={active} style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "999px",
                      boxShadow: "0 0 6px 1px rgba(255,255,255,0.55), 0 0 16px 2px rgba(255,255,255,0.2)",
                      transformOrigin: "left center",
                      animation: `paginationProgress 5s linear forwards`,
                    }} />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes paginationProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
