"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type FeatureId = "clipboard" | "ai" | "emoji" | "calculator" | "window";

type Feature = {
  id: FeatureId;
  label: string;
  boldText: string;
  desc: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "clipboard",
    label: "Clipboard History",
    boldText: "Remember Everything.",
    desc: "Stop playing Clipboard ping pong. With Clipboard History, you never lose anything important.",
    icon: <path d="M6.075 2.75H4.75a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2H9.925m-.04.275-.292 1.023A1.657 1.657 0 0 1 8 5.25v0c-.74 0-1.39-.49-1.593-1.202l-.293-1.023a1 1 0 0 1 .962-1.275h1.848a1 1 0 0 1 .962 1.275Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />,
  },
  {
    id: "ai",
    label: "AI",
    boldText: "Be Curious.",
    desc: "Ask AI without losing focus. The answer arrives right where you are already working.",
    icon: <><path d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z" fill="currentColor" /><path d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></>,
  },
  {
    id: "emoji",
    label: "Emoji Picker",
    boldText: "Express Yourself.",
    desc: "Find the right emoji or symbol in a heartbeat, then drop it into any app.",
    icon: <><path d="M5.75 9.5s.656 1.25 2.25 1.25c1.594 0 2.25-1.25 2.25-1.25m4-1.5a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M6.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM10.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
  {
    id: "calculator",
    label: "Calculator & Time",
    boldText: "Calculate Anything.",
    desc: "Use natural language for quick math, conversions, and time lookups without changing context.",
    icon: <><rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 5h6M5 8h2m4 0h-2m-2 3h2m2 0h-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></>,
  },
  {
    id: "window",
    label: "Window Management",
    boldText: "Tidy Up.",
    desc: "Resize and reorganize your current window with precise layouts and zero mouse travel.",
    icon: <><rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 2.5v11" stroke="currentColor" strokeWidth="1.5" /></>,
  },
];

const PANEL_DURATIONS = [9000, 7000, 8000, 11000, 8000];
const REMOTE_ICONS = {
  clipboard: "https://www.raycast.com/_next/static/media/command-clipboard-history.fa06c2bb.png",
  fileSearch: "https://www.raycast.com/_next/static/media/command-file-search-16.51137efe.png",
  calendar: "https://www.raycast.com/_next/static/media/calendar-extension-dark.4117f5df.png",
  dictionary: "https://www.raycast.com/_next/static/media/dictionary-extension-16.a768f3b0.png",
  google: "https://www.raycast.com/_next/static/media/web-google.4d4566ad.png",
  duckduckgo: "https://www.raycast.com/_next/static/media/web-duckduckgo.163fb12f.png",
};

export default function FeaturesGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const active = FEATURES[activeIdx];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIdx((current) => (current + 1) % FEATURES.length);
      setCycleKey((current) => current + 1);
    }, PANEL_DURATIONS[activeIdx]);
    return () => window.clearTimeout(timer);
  }, [activeIdx, cycleKey]);

  return (
    <section style={{ padding: "224px 24px 224px", position: "relative", zIndex: 0 }}>

      <div style={{ maxWidth: "1204px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <style>{`@keyframes feature-progress{from{transform:translateX(-100%)}to{transform:translateX(0)}}@keyframes feature-blink{0%,48%{opacity:1}52%,100%{opacity:0}}@keyframes feature-toast{0%{opacity:0;transform:translateY(8px) scale(.98)}14%,86%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(8px) scale(.98)}}@keyframes feature-star{0%,100%{opacity:.05;transform:scale(1)}50%{opacity:.22;transform:scale(1.3)}}`}</style>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "white", letterSpacing: "-0.02em", lineHeight: 1.4 }}>Take shortcuts, not detours.</h2>
          <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 400, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.02em" }}>One interface, everything you need.</p>
        </div>
        
        <div style={{ position: "relative" }}>
          {/* Glow backdrop — spread radial gradient behind the frame */}
          <div style={{ position: "absolute", inset: "-60px -70px", filter: "blur(20px)", zIndex: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 50% 14%, 100% 0, 92% 50%, 100% 100%, 50% 86%, 0 100%, 8% 50%)", background: "radial-gradient(40% 147% at 50% 46.2%, rgba(255,119,119,0.25) 5%, rgba(154,170,255,0.15) 60%, rgba(255,192,192,0) 140%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 1, borderRadius: "19px", padding: "8px", backgroundColor: "rgba(0,0,0,0.44)", backgroundImage: "radial-gradient(85.77% 49.97% at 51% 5.12%, rgba(255,150,150,0.11) 0px, rgba(222,226,255,0.08) 45.83%, rgba(241,242,255,0.02) 100%)", boxShadow: "rgba(255,255,255,0.04) 0px 0px 80px 40px, rgba(255,255,255,0.3) 0px 0.5px 0px 0px inset" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px", background: "rgb(7,8,10)" }}>
            <DesktopMenuBar />
          <div style={{ position: "relative", zIndex: 1, height: "720px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0 102px" }}>
            <div style={{ position: "relative", zIndex: 1, width: "750px", height: "475px", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 .5px rgba(255,255,255,0.06), 0 1px 0 0 rgba(255,255,255,0.05) inset" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={`${active.id}-${cycleKey}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", inset: 0 }}>
                  {renderShowcase(active.id)}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "flex-end", gap: "8px", padding: "8px", borderRadius: "20px", background: "linear-gradient(181deg, rgba(0,0,0,0.1) 4.5%, rgba(255,255,255,0.03) 99.51%)", border: "0.8px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", boxShadow: "rgba(0,0,0,0.2) 0px 0px 1px 0px, rgba(0,0,0,0.17) 0px 2px 2px 0px, rgba(0,0,0,0.1) 0px 4px 3px 0px, rgba(0,0,0,0.03) 0px 7px 3px 0px, rgba(0,0,0,0.25) 0px 4px 4px 0px, rgba(255,255,255,0.1) 0px 1px 0px 0px inset" }}>
              {FEATURES.map((feature, index) => {
                const isActive = activeIdx === index;
                const isHovered = hoveredIdx === index && !isActive;
                const size = "54px";
                const iconSize = 20;
                const itemRadius = isActive ? "16px" : "12px";
                return (
                  <div key={feature.id} style={{ position: "relative", margin: isActive ? "0 6px" : undefined }}>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }} animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }} exit={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }} transition={{ duration: 0.2, ease: "easeOut" }} style={{ position: "absolute", bottom: "calc(100% + 14px)", left: "50%", padding: "1px 9px 2.4px", background: "linear-gradient(137deg, rgb(17,18,20) 4.87%, rgb(12,13,15) 75.88%)", color: "white", fontSize: "14px", fontWeight: 500, borderRadius: "6px", whiteSpace: "nowrap", pointerEvents: "none", boxShadow: "0 4px 4px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", letterSpacing: "0.2px", zIndex: 10 }}>
                          {feature.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      aria-label={feature.label}
                      onClick={() => { setActiveIdx(index); setCycleKey((current) => current + 1); }}
                      onMouseEnter={() => setHoveredIdx(index)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        position: "relative",
                        width: size,
                        height: size,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: itemRadius,
                        cursor: "pointer",
                        color: isActive || isHovered ? "white" : "rgba(255,255,255,0.45)",
                        background: (isActive || isHovered)
                          ? "radial-gradient(79.21% 79.21% at 42.35% 0px, rgb(120,120,120) 0%, rgb(40,40,40) 100%)"
                          : "radial-gradient(1139.98% 138.18% at 0px 0px, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0) 100%)",
                        border: `0.8px solid ${isActive ? "#434345" : isHovered ? "rgba(255,255,255,0.12)" : "#2f3031"}`,
                        boxShadow: isActive
                          ? "rgba(0,0,0,0.03) 0px 8.077px 3.462px 0px, rgba(0,0,0,0.25) 0px 4.615px 4.615px 0px, rgba(255,255,255,0.19) 0px 1.154px 0px 0px inset, rgba(255,255,255,0.25) 0px 0px 6px 0px"
                          : isHovered
                          ? "rgba(0,0,0,0.03) 0px 8.077px 3.462px 0px, rgba(0,0,0,0.25) 0px 4.615px 4.615px 0px, rgba(255,255,255,0.19) 0px 1.154px 0px 0px inset"
                          : "rgba(0,0,0,0.03) 0px 7px 3px 0px, rgba(0,0,0,0.25) 0px 4px 4px 0px",
                        transform: isActive ? "scale(1.25) translateY(-5px)" : "none",
                        transition: "border-color 150ms ease, box-shadow 150ms ease, background 150ms ease, transform 150ms ease",
                      }}
                    >
                      <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none">{feature.icon}</svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
        <StarField />
        </div>

        <div style={{ maxWidth: "670px", minHeight: "60px", position: "relative", margin: "0 auto", marginTop: "32px", color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.6, textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", inset: 0 }}>
              <span style={{ color: "white", fontWeight: 600 }}>{active.boldText}</span> {active.desc}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function renderShowcase(id: FeatureId) {
  if (id === "clipboard") return <ClipboardShowcase />;
  if (id === "ai") return <AIShowcase />;
  if (id === "emoji") return <EmojiShowcase />;
  if (id === "calculator") return <CalculatorShowcase />;
  return <WindowManagementShowcase />;
}

function DesktopMenuBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "28px", padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.38)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <svg width="14" height="17" viewBox="0 0 814 1000" fill="rgba(255,255,255,0.74)"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.5-127.8C46.5 629.7 0 501.4 0 373.8c0-14.5.7-29 2-43.5 11.1-119.4 80.6-221.3 170.4-272.1 24.6-14.5 50.6-25.9 77.9-33.8 27.6-8 56.4-11.8 85.3-11.8 29.5 0 57.1 11.6 82.7 15.5 22.2 3.4 44.2 11.5 66.3 11.5 21.2 0 42.3-7.4 63.1-9.5 28.4-2.8 56.5 3.2 83.3 11.7 28.7 9.2 55.2 25 77.4 45.6z" /></svg>
        {["Finder", "File", "Edit", "View", "Go", "Window", "Help"].map((item) => <span key={item} style={{ color: "rgba(255,255,255,0.68)", fontSize: "13px" }}>{item}</span>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "rgba(255,255,255,0.48)", fontSize: "11px" }}>
        <span>49</span><span>1</span><span>Lunch · 37m left</span><span>Wed Mar 19 11:10 PM</span>
      </div>
    </div>
  );
}

function ClipboardShowcase() {
  const items = [
    { label: "#FF6363", type: "color", swatch: "#FF6363" },
    { label: "#59D499", type: "color", swatch: "#59D499" },
    { label: "#56C2FF", type: "color", swatch: "#56C2FF" },
    { label: "https://raycast.com", type: "link" },
    { label: "The first Macintosh computer was introduced...", type: "text" },
    { label: "hello@raycast.com", type: "text" },
    { label: "Two Mangos", type: "image", meta: "640 × 427" },
  ];
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterLabel, setFilterLabel] = useState("All Types");
  const [focusedIndex, setFocusedIndex] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setQuery("co"), 500),
      window.setTimeout(() => setDropdownOpen(true), 1200),
      window.setTimeout(() => setFilterLabel("Colors Only"), 1750),
      window.setTimeout(() => setDropdownOpen(false), 2250),
      window.setTimeout(() => setFocusedIndex(2), 3000),
      window.setTimeout(() => setFocusedIndex(1), 3900),
      window.setTimeout(() => setToastVisible(true), 5000),
      window.setTimeout(() => setToastVisible(false), 6600),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const visibleItems = filterLabel === "Colors Only" ? items.filter((item) => item.type === "color") : items;
  const activeItem = visibleItems[Math.min(focusedIndex, visibleItems.length - 1)];

  return (
    <div style={{ position: "relative", minHeight: "475px" }}>
      <div style={navBarStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
          <BackButton />
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ fontSize: "14px", color: query ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.34)" }}>{query || "Type to filter entries..."}</span>
            <Cursor />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={dropdownButtonStyle}><span>{filterLabel}</span><ChevronDown /></div>
          {dropdownOpen ? <div style={dropdownMenuStyle}>{["All Types", "Text Only", "Images Only", "Files Only", "Links Only", "Colors Only"].map((item) => <div key={item} style={{ padding: "7px 10px", borderRadius: "7px", fontSize: "12px", background: item === filterLabel ? "rgba(255,255,255,0.08)" : "transparent", color: item === filterLabel ? "white" : "rgba(255,255,255,0.58)" }}>{item}</div>)}</div> : null}
        </div>
      </div>
      <div style={{ display: "flex", minHeight: "306px" }}>
        <div style={{ width: "248px", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "8px 6px 10px" }}>
          <SectionLabel>Today</SectionLabel>
          {visibleItems.map((item, index) => <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "8px 10px", borderRadius: "8px", border: index === focusedIndex ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", background: index === focusedIndex ? "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)" : "transparent" }}>
            <ClipboardItemIcon item={item} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: index === focusedIndex ? "white" : "rgba(255,255,255,0.64)", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</div>
              {"meta" in item && item.meta ? <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginTop: "1px" }}>{item.meta}</div> : null}
            </div>
          </div>)}
        </div>
        <div style={{ flex: 1, padding: "18px 18px 16px", background: "radial-gradient(circle at 25% 20%, rgba(89,212,153,0.18) 0%, rgba(15,19,24,0) 36%)" }}>
          <div style={{ height: "170px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: activeItem && "swatch" in activeItem ? activeItem.swatch : "linear-gradient(135deg, rgba(36,43,56,0.95), rgba(18,20,28,0.95))", boxShadow: "0 18px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" }} />
          <div style={{ marginTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
            <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "13px", fontWeight: 600 }}>Color</div>
            {[["Content Type", "Color"], ["Value", activeItem && "swatch" in activeItem ? activeItem.swatch : "#59D499"], ["Copied", "Today, 13:35"], ["Application", "VS Code"]].map(([label, value]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", paddingTop: "7px", fontSize: "12px" }}><span style={{ color: "rgba(255,255,255,0.36)" }}>{label}</span><span style={{ color: "rgba(255,255,255,0.68)" }}>{value}</span></div>)}
          </div>
        </div>
      </div>
      <ActionBar title="Clipboard History" titleIcon={<img alt="" src={REMOTE_ICONS.clipboard} width="16" height="16" />} actions={[<>Copy to Clipboard <KbdChip>↵</KbdChip></>, <>Actions <KbdChip>⌘K</KbdChip></>]} />
      {toastVisible ? <Toast>Copied to clipboard</Toast> : null}
    </div>
  );
}

function AIShowcase() {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [refsVisible, setRefsVisible] = useState(false);

  useEffect(() => {
    const timers = [window.setTimeout(() => setAnswerVisible(true), 650), window.setTimeout(() => setRefsVisible(true), 1700)];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div style={{ minHeight: "475px", display: "flex", flexDirection: "column" }}>
      <div style={navBarStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
          <BackButton />
          <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px" }}>which note taking apps support markdown?</span>
        </div>
      </div>
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ display: "flex", gap: "10px", color: "rgba(255,255,255,0.84)", fontSize: "13px" }}>
          <div style={avatarStyle}><SparkleIcon color="white" /></div>
          <p style={{ margin: 0, lineHeight: 1.65 }}>which note taking apps support markdown?</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: "14px 18px 16px" }}>
        <div style={{ display: "flex", gap: "10px", opacity: answerVisible ? 1 : 0, transform: answerVisible ? "translateY(0)" : "translateY(6px)", transition: "opacity 260ms ease, transform 260ms ease" }}>
          <div style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.88)" }}>✦</div>
          <div style={{ flex: 1, color: "rgba(255,255,255,0.72)", fontSize: "13px", lineHeight: 1.68 }}>
            <p style={{ margin: "0 0 10px" }}>Several note-taking apps support Markdown for formatting text. Here are some popular ones:</p>
            <ol style={{ margin: 0, paddingLeft: "18px" }}>
              <li><strong style={{ color: "rgba(255,255,255,0.92)" }}>Obsidian</strong> - Local folder-based Markdown knowledge base.</li>
              <li><strong style={{ color: "rgba(255,255,255,0.92)" }}>Notion</strong> - Hybrid workspace with Markdown support.</li>
              <li><strong style={{ color: "rgba(255,255,255,0.92)" }}>Typora</strong> - Minimal editor with live Markdown preview.</li>
              <li><strong style={{ color: "rgba(255,255,255,0.92)" }}>Bear</strong> - Markdown writing app for Mac and iOS.</li>
              <li><strong style={{ color: "rgba(255,255,255,0.92)" }}>Joplin</strong> - Open-source notebook-organized Markdown notes.</li>
            </ol>
          </div>
        </div>
        <div style={{ marginTop: "14px", color: "rgba(255,255,255,0.42)", fontSize: "12px", opacity: refsVisible ? 1 : 0, transform: refsVisible ? "translateY(0)" : "translateY(6px)", transition: "opacity 260ms ease, transform 260ms ease" }}>References: 1. Notion &nbsp; 2. Obsidian &nbsp; 3. +10 more</div>
      </div>
      <ActionBar title="AI" titleIcon={<SparkleOutline />} actions={[<>Actions <KbdChip>⌘K</KbdChip></>]} />
    </div>
  );
}

function EmojiShowcase() {
  const results = ["☝️", "👆", "👉", "👇", "👈", "🖖", "💯", "✡️", "✳️", "🔺", "🔻", "←", "↑", "→", "↓", "↕", "⇄", "🔼", "🔽", "▷"];
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const text = "point";
    for (let index = 1; index <= text.length; index += 1) timers.push(window.setTimeout(() => setQuery(text.slice(0, index)), 380 + index * 90));
    timers.push(window.setTimeout(() => setSelectedIndex(1), 1800));
    timers.push(window.setTimeout(() => setSelectedIndex(2), 2250));
    timers.push(window.setTimeout(() => setSelectedIndex(0), 2750));
    timers.push(window.setTimeout(() => setToastVisible(true), 3100));
    timers.push(window.setTimeout(() => setToastVisible(false), 4700));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "475px", display: "flex", flexDirection: "column" }}>
      <div style={navBarStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
          <BackButton />
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ color: query ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.34)", fontSize: "14px" }}>{query || "Search Emoji & Symbols..."}</span>
            <Cursor />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px 14px" }}>
        <SectionLabel>Results</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginTop: "10px" }}>
          {results.map((emoji, index) => <div key={`${emoji}-${index}`} style={{ height: "46px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: index === selectedIndex ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", background: index === selectedIndex ? "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)" : "transparent", color: "white", fontSize: "22px", transition: "background 180ms ease, transform 180ms ease, border-color 180ms ease", transform: index === selectedIndex ? "translateY(-1px)" : "translateY(0)" }}>{emoji}</div>)}
        </div>
      </div>
      <ActionBar title="Search Emoji & Symbols" titleIcon={<EmojiIcon />} actions={[<>Copy to Clipboard <KbdChip>↵</KbdChip></>, <>Actions <KbdChip>⌘K</KbdChip></>]} />
      {toastVisible ? <Toast>Copied emoji to clipboard</Toast> : null}
    </div>
  );
}

function CalculatorShowcase() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"default" | "time" | "calc">("default");
  const [answer, setAnswer] = useState("12:00 PM");
  const [expression, setExpression] = useState("12pm here in london");

  useEffect(() => {
    const timers: number[] = [];
    const timeQuery = "12pm here in london";
    const calcQuery = "14 * 3.14";

    for (let index = 1; index <= timeQuery.length; index += 1) {
      timers.push(window.setTimeout(() => {
        const value = timeQuery.slice(0, index);
        setQuery(value);
        if (index > 5) {
          setMode("time");
          setAnswer("12:00 PM");
          setExpression(timeQuery);
        }
      }, 700 + index * 75));
    }

    timers.push(window.setTimeout(() => {
      setQuery("");
      setMode("default");
    }, 3600));

    for (let index = 1; index <= calcQuery.length; index += 1) {
      timers.push(window.setTimeout(() => {
        const value = calcQuery.slice(0, index);
        setQuery(value);
        if (index > 2) {
          setMode("calc");
          setAnswer("43.96");
          setExpression(calcQuery);
        }
      }, 4400 + index * 85));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div style={{ minHeight: "475px", display: "flex", flexDirection: "column" }}>
      <div style={navBarStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
          <span style={{ color: query ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.34)", fontSize: "14px" }}>{query || "Search for apps and commands..."}</span>
          <Cursor />
        </div>
      </div>
      <div style={{ flex: 1, padding: "8px 10px 14px", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "6px", padding: "0 2px 10px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.54)", fontSize: "12px" }}>Ask AI <KbdChip>Tab</KbdChip></div>
        </div>
        {mode === "default" ? <CalculatorSuggestions /> : <CalculatorResults answer={answer} expression={expression} />}
      </div>
      <ActionBar title="Calculator" titleIcon={<CalculatorIcon />} actions={[<>Open Command <KbdChip>↵</KbdChip></>, <>Actions <KbdChip>⌘K</KbdChip></>]} />
    </div>
  );
}

function LayoutPreviewIcon({ layoutLabel }: { layoutLabel: string }) {
  const size = 18;
  const fill = "rgba(255,255,255,0.9)";
  const bg = "rgba(255,255,255,0.08)";
  let shape: ReactNode;
  switch (layoutLabel) {
    case "Left Half":
      shape = <rect x="0" y="0" width="8" height="14" rx="1.5" fill={fill} />;
      break;
    case "Right Half":
      shape = <rect x="8" y="0" width="8" height="14" rx="1.5" fill={fill} />;
      break;
    case "Almost Maximize":
      shape = <rect x="1.5" y="1.5" width="13" height="11" rx="1.5" fill={fill} />;
      break;
    case "Toggle Full Screen":
      shape = <rect x="0" y="0" width="16" height="14" rx="1.5" fill={fill} />;
      break;
    case "Top Right Quarter":
      shape = <rect x="8" y="0" width="8" height="7" rx="1.5" fill={fill} />;
      break;
    case "Bottom Half":
      shape = <rect x="0" y="7" width="16" height="7" rx="1.5" fill={fill} />;
      break;
    default:
      shape = <rect x="0" y="0" width="16" height="14" rx="1.5" fill={fill} />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 14" fill="none" style={{ flexShrink: 0 }}>
      <rect x="0" y="0" width="16" height="14" rx="2" fill={bg} />
      {shape}
    </svg>
  );
}

function WindowManagementShowcase() {
  const layouts = [
    { label: "Left Half", shortcut: "⌃⌥←", width: "50%", height: "100%", left: "0%", top: "0%" },
    { label: "Right Half", shortcut: "⌃⌥→", width: "50%", height: "100%", left: "50%", top: "0%" },
    { label: "Almost Maximize", shortcut: "", width: "90%", height: "90%", left: "5%", top: "5%" },
    { label: "Toggle Full Screen", shortcut: "⌃⌥↑", width: "100%", height: "100%", left: "0%", top: "0%" },
    { label: "Top Right Quarter", shortcut: "", width: "50%", height: "50%", left: "50%", top: "0%" },
    { label: "Bottom Half", shortcut: "", width: "100%", height: "50%", left: "0%", top: "50%" },
  ];
  const [activeLayout, setActiveLayout] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveLayout((current) => (current + 1) % layouts.length), 900);
    return () => window.clearInterval(interval);
  }, [layouts.length]);

  const layout = layouts[activeLayout];

  return (
    <div style={{ position: "relative", minHeight: "475px", overflow: "hidden", background: "rgba(0,0,0,0)" }}>
      {/* Background desktop scene */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #111827 0%, #0d1020 40%, #07080d 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 25%, rgba(99,102,241,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 10%, rgba(244,114,182,0.1) 0%, transparent 35%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "24px", overflow: "hidden", borderRadius: "12px" }}>
        <motion.div animate={{ width: layout.width, height: layout.height, left: layout.left, top: layout.top }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", boxShadow: "0 4px 40px 8px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,0,0,0.8), inset 0 0.5px 0 1px rgba(255,255,255,0.3)", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "6px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {[0,1,2].map((i) => <span key={i} style={{ width: "12px", height: "12px", borderRadius: "6px", background: i === 0 ? "rgba(255,95,87,0.7)" : i === 1 ? "rgba(255,189,46,0.7)" : "rgba(40,200,64,0.7)" }} />)}
          </div>
          <div style={{ padding: "16px", background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)" }}>
            {[{ w: "88%", h: "11px", opacity: 0.22 }, { w: "64%", h: "9px", opacity: 0.14 }, { w: "78%", h: "9px", opacity: 0.16 }, { w: "45%", h: "9px", opacity: 0.11 }, { w: "82%", h: "9px", opacity: 0.18 }].map(({ w, h, opacity }, index) => (
              <div key={index} style={{ width: w, height: h, borderRadius: "999px", marginBottom: "10px", background: `rgba(255,255,255,${opacity})` }} />
            ))}
          </div>
        </motion.div>
      </div>
      {/* Command palette */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "530px", transform: "translate(-50%, -50%)", borderRadius: "12px", border: "1px solid rgba(142,140,144,0.2)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(18px)", boxShadow: "0 4px 40px 8px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,0,0,0.8), inset 0 0.5px 0 1px rgba(255,255,255,0.3)", overflow: "hidden" }}>
        <div style={{ ...navBarStyle, height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
            <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "16px" }}>window management</span>
            <Cursor />
          </div>
        </div>
        <div style={{ padding: "8px", overflowY: "hidden", maxHeight: "280px" }}>
          <SectionLabel>Results</SectionLabel>
          {layouts.map((item, index) => {
            const isActive = index === activeLayout;
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "40px",
                  marginTop: "2px",
                  padding: "0 8px",
                  borderRadius: "6px",
                  background: isActive ? "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)" : "transparent",
                  border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                  transition: "background 180ms ease, border-color 180ms ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <LayoutPreviewIcon layoutLabel={item.label} />
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
                    <div style={{ color: isActive ? "white" : "rgba(255,255,255,0.64)", fontSize: "13px", whiteSpace: "nowrap" }}>{item.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", whiteSpace: "nowrap" }}>Window Management</div>
                  </div>
                </div>
                {item.shortcut ? <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{item.shortcut}</span> : null}
              </div>
            );
          })}
        </div>
        <ActionBar title="Window Management" titleIcon={<WindowLayoutIcon />} actions={[<>Open Command <KbdChip>↵</KbdChip></>, <>Actions <KbdChip>⌘K</KbdChip></>]} />
      </div>
    </div>
  );
}

function CalculatorSuggestions() {
  return (
    <div>
      <SectionLabel>Suggestions</SectionLabel>
      <ResultRow active icon={<img alt="" src={REMOTE_ICONS.clipboard} width="20" height="20" />} title="Clipboard History" subtitle="Raycast · Command" />
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.fileSearch} width="20" height="20" />} title="Search Files" subtitle="Raycast · Command" />
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.calendar} width="20" height="20" />} title="My Schedule" subtitle="Calendar · Extension" />
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.dictionary} width="20" height="20" />} title="Define Word" subtitle="Dictionary · Extension" />
    </div>
  );
}

function CalculatorResults({ answer, expression }: { answer: string; expression: string }) {
  return (
    <div>
      <SectionLabel>Commands</SectionLabel>
      <div style={{ marginBottom: "8px", padding: "12px 12px 10px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)" }}>
        <div style={{ color: "white", fontSize: "28px", lineHeight: 1.1, fontWeight: 600 }}>{answer}</div>
        <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px", marginTop: "4px" }}>{expression}</div>
      </div>
      <SectionLabel>Time</SectionLabel>
      <TimeRow time="12:00 PM" label="Local Time" />
      <TimeRow time="06:30" label="London, GMT" />
      <SectionLabel>Use with...</SectionLabel>
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.fileSearch} width="20" height="20" />} title="File Search" />
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.google} width="20" height="20" />} title="Search Google" />
      <ResultRow icon={<img alt="" src={REMOTE_ICONS.duckduckgo} width="20" height="20" />} title="Search DuckDuckGo" />
    </div>
  );
}

function TimeRow({ time, label }: { time: string; label: string }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 10px", borderRadius: "8px", color: "rgba(255,255,255,0.7)" }}><div style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px" }}>{time}</div><div style={{ color: "rgba(255,255,255,0.36)", fontSize: "12px" }}>{label}</div></div>;
}

function ResultRow({ icon, title, subtitle, active }: { icon: ReactNode; title: string; subtitle?: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "10px", borderRadius: "8px", border: active ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", background: active ? "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)" : "transparent" }}>
      <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", background: "rgba(255,255,255,0.06)" }}>{icon}</div>
      <div><div style={{ color: "rgba(255,255,255,0.88)", fontSize: "13px" }}>{title}</div>{subtitle ? <div style={{ color: "rgba(255,255,255,0.36)", fontSize: "12px", marginTop: "1px" }}>{subtitle}</div> : null}</div>
    </div>
  );
}

function ClipboardItemIcon({ item }: { item: { type: string; swatch?: string } }) {
  if (item.type === "color" && item.swatch) return <div style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: item.swatch }} />;
  if (item.type === "image") return <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }} />;
  return (
    <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5.5 2.5h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" stroke="rgba(255,255,255,0.48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M7.5 2.5v-1h1v1" stroke="rgba(255,255,255,0.48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
    </div>
  );
}

function ActionBar({ title, titleIcon, actions }: { title: string; titleIcon: ReactNode; actions: ReactNode[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", minHeight: "40px", padding: "0 12px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.55)", fontSize: "12px" }}>{titleIcon}<span>{title}</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end", color: "rgba(255,255,255,0.42)", fontSize: "12px" }}>{actions.map((action, index) => <div key={index} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{action}</div>)}</div>
    </div>
  );
}

function Toast({ children }: { children: ReactNode }) {
  return <div style={{ position: "absolute", left: "50%", bottom: "54px", transform: "translateX(-50%)", padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(18,19,23,0.95)", boxShadow: "0 14px 40px rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.82)", fontSize: "12px", animation: "feature-toast 1600ms ease forwards" }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5.5 2.5h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M7.5 2.5v-1h1v1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>{children}</div>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div style={{ color: "rgba(255,255,255,0.32)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, padding: "4px 10px 8px" }}>{children}</div>;
}

function KbdChip({ children }: { children: ReactNode }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "18px", height: "18px", padding: "0 6px", borderRadius: "5px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: "11px", lineHeight: 1 }}>{children}</span>;
}

function Cursor() {
  return <span style={{ width: "1px", height: "15px", background: "rgba(255,255,255,0.65)", animation: "feature-blink 1s linear infinite" }} />;
}

function BackButton() {
  return <div style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.42)" }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg></div>;
}

function ChevronDown() {
  return <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

function SparkleIcon({ color }: { color: string }) {
  return <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill={color} /></svg>;
}

function SparkleOutline() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

function EmojiIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 9.5c.5 1 2.5 1.5 5 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><circle cx="6" cy="7" r=".75" fill="currentColor" /><circle cx="10" cy="7" r=".75" fill="currentColor" /></svg>;
}

function CalculatorIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 5h6M5 8h2m4 0h-2m-2 3h2m2 0h-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function WindowLayoutIcon({ small, layoutLabel }: { small?: boolean; layoutLabel?: string }) {
  if (small && layoutLabel) return <LayoutPreviewIcon layoutLabel={layoutLabel} />;
  return <svg width={small ? "12" : "16"} height={small ? "12" : "16"} viewBox="0 0 16 16" fill="none"><rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 2.5v11" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

const LAYOUT_ICON_STYLES: Record<string, { pt: number; pb: number; pl: number; pr: number }> = {
  "Left Half":          { pt: 2.5, pb: 2.5, pl: 2.5, pr: 10 },
  "Right Half":         { pt: 2.5, pb: 2.5, pl: 10,  pr: 2.5 },
  "Almost Maximize":    { pt: 2.5, pb: 2.5, pl: 2.5, pr: 2.5 },
  "Toggle Full Screen": { pt: 1,   pb: 1,   pl: 1,   pr: 1   },
  "Top Right Quarter":  { pt: 2.5, pb: 10,  pl: 10,  pr: 2.5 },
  "Bottom Half":        { pt: 10,  pb: 2.5, pl: 2.5, pr: 2.5 },
};

function WinLayoutIcon({ label }: { label: string }) {
  const s = LAYOUT_ICON_STYLES[label] ?? { pt: 2.5, pb: 2.5, pl: 2.5, pr: 2.5 };
  return (
    <div style={{ width: "20px", height: "20px", borderRadius: "5px", flexShrink: 0, background: "linear-gradient(135deg, rgb(86,194,255) 0%, rgb(19,138,242) 100%)", padding: `${s.pt}px ${s.pr}px ${s.pb}px ${s.pl}px`, display: "flex" }}>
      <div style={{ flex: 1, background: "white", borderRadius: "2.5px" }} />
    </div>
  );
}

function StarField() {
  // Stars positioned OUTSIDE the frame border in a thin ring (~12px strip)
  // Container matches the outer frame bounds (inset:0), no overflow:hidden
  // so stars with negative positions appear outside the frame edge
  const s = (n: number) => Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
  const stars: { left: string; top: string; delay: string; duration: string }[] = [];

  // Top edge: spread from 1px to 50px above the frame
  for (let i = 0; i < 60; i++) {
    const y = -(s(i + 50) * 49 + 1); // -50 to -1
    stars.push({ left: `${s(i) * 100}%`, top: `${y}px`, delay: `${(s(i + 200) * 7000).toFixed(0)}ms`, duration: `${(7000 + s(i + 300) * 7000).toFixed(0)}ms` });
  }
  // Bottom edge: spread from 1px to 50px below the frame
  for (let i = 60; i < 120; i++) {
    const y = s(i + 50) * 49 + 1; // 1 to 50
    stars.push({ left: `${s(i) * 100}%`, top: `calc(100% + ${y}px)`, delay: `${(s(i + 200) * 7000).toFixed(0)}ms`, duration: `${(7000 + s(i + 300) * 7000).toFixed(0)}ms` });
  }
  // Left edge: spread from 1px to 50px left of the frame
  for (let i = 120; i < 155; i++) {
    const x = -(s(i + 50) * 49 + 1);
    stars.push({ left: `${x}px`, top: `${s(i) * 100}%`, delay: `${(s(i + 200) * 7000).toFixed(0)}ms`, duration: `${(7000 + s(i + 300) * 7000).toFixed(0)}ms` });
  }
  // Right edge: spread from 1px to 50px right of the frame
  for (let i = 155; i < 190; i++) {
    const x = s(i + 50) * 49 + 1;
    stars.push({ left: `calc(100% + ${x}px)`, top: `${s(i) * 100}%`, delay: `${(s(i + 200) * 7000).toFixed(0)}ms`, duration: `${(7000 + s(i + 300) * 7000).toFixed(0)}ms` });
  }

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
      {stars.map((star, i) => (
        <span key={i} style={{ position: "absolute", left: star.left, top: star.top, width: "1px", height: "1px", borderRadius: "50%", background: "white", animation: `feature-star ${star.duration} ease-in-out ${star.delay} infinite` }} />
      ))}
    </div>
  );
}

const navBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  height: "52px",
  padding: "0 16px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
} as const;

const dropdownButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "5px 10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.62)",
  fontSize: "12px",
} as const;

const dropdownMenuStyle = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  width: "164px",
  padding: "8px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(17,18,22,0.97)",
  boxShadow: "0 16px 44px rgba(0,0,0,0.45)",
  zIndex: 4,
} as const;

const avatarStyle = {
  width: "22px",
  height: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  flexShrink: 0,
  background: "linear-gradient(135deg, rgba(255,110,110,0.95), rgba(206,77,232,0.92))",
} as const;
