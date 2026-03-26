"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

const BASE_IMG = "https://www.raycast.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F";
const img = (f: string) => `${BASE_IMG}${f}&w=96&q=70`;

const people = [
  {
    name: "Guillermo Rauch", handle: "@rauchg", role: "CEO, Vercel",
    color: "#0070F3", initials: "GR", avatar: img("guillermo.1ede87e2.png"),
    quote: "Raycast is a natural extension of my mind on macOS.\u00a0I can't imagine a Mac without Raycast.\u00a0From simply launching apps to helping me fix TypeScript errors with AI Chat, it helps me get things done quicker hundreds of times a day.",
    label1: "Favorite Feature:", value1: "Clipboard History", icon1: "clipboard",
    desc1: "Makes copy-pasting multiple snippets and managing screenshots super easy with integrated search.",
    label2: "Top Snippet:", value2: ":dot", isSnippet: true,
    desc2: "• For rendering a unicode bullet that separates text: Like this •",
  },
  {
    name: "Marques Brownlee", handle: "@MKBHD", role: "Creator, MKBHD",
    color: "#FF0000", initials: "MB", avatar: img("mkbhd.3978890d.jpg"),
    quote: "My favorite productivity app on the Mac, and it has been for years.\u00a0Every fresh new Mac I install it first.\u00a0It's just that good.",
    label1: "Favorite Feature:", value1: "Window Management", icon1: "window",
    desc1: "I can instantly arrange my editing layout with custom window presets and never touch my mouse.",
    label2: "Top Snippet:", value2: ":mkbhd", isSnippet: true,
    desc2: "marques@mkbhd.com · My email address shortcut.",
  },
  {
    name: "Koen Bok", handle: "@koenbok", role: "Founder, Framer",
    color: "#7B61FF", initials: "KB", avatar: img("koen.6d1f621a.png"),
    quote: "Raycast simply replaces so many tools at once and the whole experience\u00a0feels like it was made by Apple itself.\u00a0The attention to detail is extraordinary.",
    label1: "Favorite Feature:", value1: "Clipboard History", icon1: "clipboard",
    desc1: "Makes copy-pasting CSS values and design tokens effortless during long coding sessions.",
    label2: "Top Snippet:", value2: ":em", isSnippet: true,
    desc2: "— For rendering an em dash in Framer design notes.",
  },
  {
    name: "Andreas Storm", handle: "@avstorm", role: "Designer & Iconograph",
    color: "#FF6B35", initials: "AS", avatar: img("avstorm.501925b2.jpeg"),
    quote: "Every designer on a Mac should have Raycast.\u00a0The speed at which I can find files, trigger actions and switch context\u00a0is completely unmatched by anything else.",
    label1: "Favorite Feature:", value1: "Snippets", icon1: "snippet",
    desc1: "I have hundreds of snippets for icon descriptions, component names, and design system tokens.",
    label2: "Top Snippet:", value2: ":dot", isSnippet: true,
    desc2: "• For rendering a unicode bullet that separates text.",
  },
  {
    name: "Adam Wathan", handle: "@adamwathan", role: "Creator, Tailwind CSS",
    color: "#06B6D4", initials: "AW", avatar: img("adamwathan.7d406127.png"),
    quote: "Raycast takes the speed and utility of the CLI, and puts it into the hands of everyone.\u00a0A truly magical piece of software.\u00a0I recommend it to every developer I meet.",
    label1: "Favorite Feature:", value1: "Calculator", icon1: "calculator",
    desc1: "Built-in calculator that understands natural language. I use it for spacing values constantly.",
    label2: "Top Snippet:", value2: ":tw", isSnippet: true,
    desc2: "tailwindcss · For quickly typing the package name in docs.",
  },
  {
    name: "Wes Bos", handle: "@wesbos", role: "Co-host, SyntaxFM",
    color: "#F0DB4F", initials: "WB", avatar: img("wesbos.9d09a8a6.png"),
    quote: "I've been using and recommending Raycast for years.\u00a0The extension ecosystem is extraordinary.\u00a0There's an extension for literally everything I need as a developer.",
    label1: "Favorite Hotkey:", value1: "⌥⌘T", isHotkey: true,
    desc1: "To open a new terminal tab from anywhere on my Mac.",
    label2: "Top Snippet:", value2: ":wes", isSnippet: true,
    desc2: "wes@wesbos.com · My email shortcut.",
  },
  {
    name: "Max Stoiber", handle: "@mxstbr", role: "CEO, Stellate",
    color: "#5C6BC0", initials: "MS", avatar: img("mxstbr.500c6710.png"),
    quote: "Raycast has become the first app I install on a new Mac.\u00a0It makes me more productive as a developer with extensions, AI, local commands and shared code snippets as a team.\u00a0It is a whole ecosystem accessible from a single keystroke.",
    label1: "Favorite Feature:", value1: "Clipboard History", icon1: "clipboard",
    desc1: "Makes copy-pasting multiple snippets and managing screenshots super easy with integrated search.",
    label2: "Top Snippet:", value2: ":dot", isSnippet: true,
    desc2: "• For rendering a unicode bullet that separates text: Like this •",
  },
  {
    name: "Zach Holman", handle: "@holman", role: "Angel Investor",
    color: "#4CAF50", initials: "ZH",
    quote: "Raycast is one of those rare apps that becomes invisible — it just works, exactly when you need it.\u00a0The muscle memory builds fast and then you can't live without it.",
    label1: "Favorite Hotkey:", value1: "⌥Space", isHotkey: true,
    desc1: "To open Raycast from anywhere, instantly, without interrupting what I'm doing.",
    label2: "Top Extension:", value2: "Hypersonic", isExtension: true,
    desc2: "For my Notion-based todo setup. Incredible.",
  },
  {
    name: "Ansub", handle: "@justansub", role: "Founding Engineer",
    color: "#FF5722", initials: "AN",
    quote: "Raycast eliminates friction to let me\u00a0work at the speed of thought.\u00a0My customizations with hotkeys, private extensions and more allow me to own my productivity!",
    label1: "Favorite Feature:", value1: "AI Chat", icon1: "ai",
    desc1: "I love AI, it helps me code quick MVPs of potential app ideas and designs!",
    label2: "Favorite Hotkey:", value2: "⌥E", isHotkey: true,
    desc2: "To create a new task in ClickUp.",
  },
  {
    name: "Kitze", handle: "@thekitze", role: "Founder",
    color: "#E91E63", initials: "KI",
    quote: "I use Raycast more than any other app on my Mac.\u00a0It's become so deeply embedded in my workflow that\u00a0I forget it's even there — it just handles everything.",
    label1: "Favorite Feature:", value1: "Extensions", icon1: "extension",
    desc1: "The extensions marketplace is incredible. There's an extension for literally everything I need.",
    label2: "Top Snippet:", value2: ":shrug", isSnippet: true,
    desc2: "¯\\_(ツ)_/¯ · For casual Slack messages when things break.",
  },
  {
    name: "Florian Kiem", handle: "@flornkm", role: "Design Engineer",
    color: "#9C27B0", initials: "FK",
    quote: "As a design engineer I switch between design and code constantly.\u00a0Raycast removes all the friction.\u00a0It's my single most-used app on macOS.",
    label1: "Favorite Feature:", value1: "Quicklinks", icon1: "link",
    desc1: "I have quicklinks to all my Figma files, GitHub repos, and Vercel deployments.",
    label2: "Favorite Hotkey:", value2: "⌘K", isHotkey: true,
    desc2: "To access the action panel from anywhere in Raycast.",
  },
  {
    name: "Wojtek Witkowski", handle: "@pugson", role: "Design Engineer",
    color: "#FF9800", initials: "WW",
    quote: "Raycast is the reason I switched to Mac.\u00a0The extension ecosystem for design engineers is unparalleled.\u00a0Every tool I need is one keystroke away.",
    label1: "Favorite Feature:", value1: "Window Management", icon1: "window",
    desc1: "Custom window layouts save me time switching between design and development setups.",
    label2: "Top Snippet:", value2: ":ww", isSnippet: true,
    desc2: "wojtek@witkowski.design · My email address shortcut.",
  },
];

type Person = typeof people[0];

function getFeatureIcon(icon?: string) {
  if (icon === "clipboard") return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.075 2.75H4.75a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2H9.925m-.04.275-.292 1.023A1.657 1.657 0 0 1 8 5.25v0c-.74 0-1.39-.49-1.593-1.202l-.293-1.023a1 1 0 0 1 .962-1.275h1.848a1 1 0 0 1 .962 1.275Z" />
    </svg>
  );
  if (icon === "window") return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 5.25h10.5M2.75 3.75h10.5a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H2.75a1 1 0 0 1-1-1v-6.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
  if (icon === "ai") return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 2.75v1.5M8 11.75v1.5M2.75 8h1.5M11.75 8h1.5M4.576 4.576l1.06 1.06M10.364 10.364l1.06 1.06M10.364 5.636l1.06-1.06M4.576 11.424l1.06-1.06" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.75 2.75 13.25 8l-4.5 5.25M7.25 2.75 2.75 8l4.5 5.25" />
    </svg>
  );
}

export default function Testimonials() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIdx(emblaApi.selectedScrollSnap() % people.length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const person = people[selectedIdx];

  return (
    <section style={{ padding: "120px 0 0", overflow: "hidden", position: "relative" }}>
      <style>{`
        @keyframes testimonial-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .testimonial-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          background: radial-gradient(circle at center, transparent 20%, #07080a 75%);
        }
      `}</style>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "56px", padding: "0 24px", position: "relative", zIndex: 11 }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "white", letterSpacing: "-0.01em", lineHeight: 1.4, marginBottom: "2px" }}>
          Built for professionals like you.
        </h2>
        <p style={{ fontSize: "20px", fontWeight: 400, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.01em" }}>
          Used by seriously productive people.
        </p>
      </div>

      {/* Embla Carousel with Circular Overlay */}
      <div style={{ position: "relative", width: "100%" }}>
        <div className="testimonial-mask" />
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "12px", padding: "40px 0" }}>
            {people.map((p, i) => (
              <PersonCard
                key={i}
                person={p}
                isActive={i === selectedIdx}
                onClick={() => {
                  setSelectedIdx(i);
                  emblaApi?.scrollTo(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Detail Section */}
      <div style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: "96px 24px 120px",
        display: "grid",
        gridTemplateColumns: "1fr 98px 1fr",
        gap: 0,
        alignItems: "start",
      }}>
        {/* Left: Highlight */}
        <HighlightSection person={person} key={selectedIdx + "-highlight"} />

        {/* Center: Divider */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "4px" }}>
          <div style={{ width: "1px", height: "100%", minHeight: "220px", maxHeight: "300px", background: "rgb(27,28,30)" }} />
        </div>

        {/* Right: Quote */}
        <QuoteSection person={person} key={selectedIdx + "-quote"} />
      </div>
    </section>
  );
}

function PersonCard({ person, isActive, onClick }: { person: Person; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: "280px",
        padding: "20px",
        borderRadius: "16px",
        border: `0.8px solid ${isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        background: isActive ? "rgba(255,255,255,0.03)" : "transparent",
        boxShadow: isActive
          ? "rgba(255,255,255,0.1) 0px 1px 1px 0px inset, rgba(154,170,255,0.08) 0px 2px 40px 10px, rgba(154,170,255,0.08) 0px 0px 16px -7px, 0 0 0 1px rgba(154,170,255,0.16)"
          : "none",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gridTemplateRows: "auto auto",
        columnGap: "14px",
        rowGap: "2px",
        alignItems: "center",
        transition: "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.borderColor = isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)";
      }}
    >
      {/* Avatar */}
      {person.avatar ? (
        <img
          src={person.avatar}
          alt={person.name}
          style={{
            gridRow: "1 / 3",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          gridRow: "1 / 3",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${person.color}cc, ${person.color}66)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 700,
          color: "white",
          flexShrink: 0,
        }}>
          {person.initials}
        </div>
      )}

      {/* Name + handle */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{person.name}</span>
        <span style={{ fontSize: "14px", color: "rgb(67,67,69)" }}>{person.handle}</span>
      </div>

      {/* Role */}
      <span style={{ fontSize: "13px", color: "rgb(106,107,108)" }}>{person.role}</span>
    </div>
  );
}

function HighlightSection({ person }: { person: Person }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingRight: "32px", animation: "testimonial-fadein 0.35s ease forwards" }}>
      {/* First highlight item */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "rgb(106,107,108)", marginBottom: "8px", letterSpacing: "0.01em" }}>
          {person.label1}
        </div>
        {person.isHotkey ? (
          <HotkeyBadge keys={person.value1.split("")} />
        ) : (
          <FeatureBadge label={person.value1} icon={person.icon1} />
        )}
        <p style={{ marginTop: "8px", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
          {person.desc1}
        </p>
      </div>

      {/* Separator */}
      <div style={{ height: "1px", background: "rgb(27,28,30)" }} />

      {/* Second highlight item */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "rgb(106,107,108)", marginBottom: "8px", letterSpacing: "0.01em" }}>
          {person.label2}
        </div>
        {person.isHotkey ? (
          <HotkeyBadge keys={person.value2.split("")} />
        ) : person.isSnippet ? (
          <SnippetBadge label={person.value2} />
        ) : (
          <FeatureBadge label={person.value2} icon="extension" />
        )}
        <p style={{ marginTop: "8px", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
          {person.desc2}
        </p>
      </div>
    </div>
  );
}

function FeatureBadge({ label, icon }: { label: string; icon?: string }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 8px",
      borderRadius: "6px",
      background: "rgb(27,28,30)",
      fontSize: "13px",
      fontWeight: 500,
      color: "rgba(255,255,255,0.75)",
    }}>
      <span style={{ color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}>
        {getFeatureIcon(icon)}
      </span>
      {label}
    </span>
  );
}

function SnippetBadge({ label }: { label: string }) {
  return (
    <a
      href={`raycast://extensions/raycast/snippets/create-snippet?context=${encodeURIComponent(JSON.stringify({ name: label, keyword: label, text: label }))}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "6px",
        background: "rgb(27,28,30)",
        border: "0.8px solid rgba(255,255,255,0.08)",
        fontSize: "13px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.75)",
        textDecoration: "none",
        fontFamily: "monospace",
      }}
    >
      {label}
    </a>
  );
}

function HotkeyBadge({ keys }: { keys: string[] }) {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }}>
      {keys.map((k, i) => (
        <span key={i} style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "28px",
          height: "28px",
          padding: "0 6px",
          borderRadius: "6px",
          background: "radial-gradient(57.58% 71.02% at 45% 100%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%), rgb(7,8,10)",
          fontSize: "14px",
          color: "rgb(216,216,216)",
          fontFamily: "inherit",
        }}>
          {k}
        </span>
      ))}
    </span>
  );
}

function QuoteSection({ person }: { person: Person }) {
  // Split quote on \u00a0 to render partial emphasis spans
  const parts = person.quote.split("\u00a0");

  return (
    <div style={{ paddingLeft: "32px", display: "flex", flexDirection: "column", justifyContent: "center", animation: "testimonial-fadein 0.35s ease forwards" }}>
      {/* Featured testimonial label */}
      <div style={{
        fontSize: "13px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.35)",
        marginBottom: "20px",
        letterSpacing: "0.02em",
      }}>
        Featured testimonial
      </div>
      <p style={{
        fontSize: "clamp(16px, 1.1vw, 18px)",
        fontWeight: 400,
        color: "white",
        lineHeight: 1.7,
        margin: "0 0 24px",
      }}>
        {parts.map((part, i) => (
          i % 2 === 1
            ? <span key={i} style={{ color: "rgba(255,255,255,0.6)" }}>{part}</span>
            : <span key={i}>{part}</span>
        ))}
      </p>

      {/* Person attribution */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={person.name}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${person.color}cc, ${person.color}66)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}>
            {person.initials}
          </div>
        )}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{person.name}</span>
            <span style={{ fontSize: "14px", color: "rgb(67,67,69)" }}>{person.handle}</span>
          </div>
          <span style={{ fontSize: "13px", color: "rgb(106,107,108)" }}>{person.role}</span>
        </div>
      </div>
    </div>
  );
}
