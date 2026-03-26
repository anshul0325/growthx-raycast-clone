"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CDN = "https://misc-assets.raycast.com/extension-cards";

type Extension = {
  name: string;
  desc: string;
  bg: string;
  shadow: string;
  icon: string;
  preview: string;
  href: string;
};

const EXTENSIONS_BY_CATEGORY: Record<string, Extension[]> = {
  Productivity: [
    { name: "Linear", desc: "Create, search and modify your issues without leaving your keyboard.", bg: "linear-gradient(138deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "linear-icon.png", preview: "linear-web.png", href: "https://www.raycast.com/linear/linear" },
    { name: "Notion", desc: "The fastest way to search and create Notion pages.", bg: "radial-gradient(126.42% 76.6% at 50% 32.26%, rgba(84, 95, 102, 0.7), rgba(0, 36, 69, 0.13))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "notion-icon.png", preview: "notion-web.png", href: "https://www.raycast.com/notion/notion" },
    { name: "Todoist", desc: "Check your Todoist tasks and quickly create new ones.", bg: "radial-gradient(126.42% 76.6% at 50% 32.26%, rgba(84, 95, 102, 0.7), rgba(0, 36, 69, 0.13))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "todoist-icon.png", preview: "todoist-web.png", href: "https://www.raycast.com/doist/todoist" },
    { name: "1Password", desc: "Easily grab any password or credential from your 1Password vaults.", bg: "radial-gradient(90.35% 49.25% at 50% 59.06%, rgba(2, 61, 114, 0.7), rgba(5, 11, 28, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "1password-icon.png", preview: "1password-web.png", href: "https://www.raycast.com/khasbilegt/1password" },
    { name: "Slack", desc: "Set your presence, see unread messages and search your chats.", bg: "radial-gradient(99.74% 100% at 50% 0%, rgba(74, 21, 75, 0.7), rgba(29, 5, 29, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(74,21,75,0.1) 0px 0px 20px 3px, rgba(74,21,75,0.1) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "slack-icon.png", preview: "slack-web.png", href: "https://www.raycast.com/mommertf/slack" },
    { name: "Zoom", desc: "See your upcoming calls and jump straight into them from Raycast.", bg: "radial-gradient(94.21% 78.4% at 50% 29.91%, rgba(4, 63, 150, 0.7), rgba(5, 9, 29, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "zoom-icon.png", preview: "zoom-web.png", href: "https://www.raycast.com/raycast/zoom" },
    { name: "Timers", desc: "Start stopwatches and timers to keep track of your daily tasks.", bg: "radial-gradient(94.21% 78.4% at 50% 29.91%, rgba(4, 62, 150, 0.7), rgba(16, 0, 43, 0.16))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "timers-icon.png", preview: "timers-web.png", href: "https://www.raycast.com/ThatNerd/timers" },
  ],
  Engineering: [
    { name: "GitHub", desc: "Work with issues, pull requests, and manage your repositories.", bg: "linear-gradient(138deg, rgba(20, 25, 35, 0.9) 22%, rgba(7, 9, 18, 0.9) 82%)", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "github-icon.png", preview: "github-web.png", href: "https://www.raycast.com/raycast/github" },
    { name: "JIRA", desc: "Manage your JIRA issues and sprints without leaving your keyboard.", bg: "radial-gradient(84.6% 73.49% at 50% 26.51%, rgba(4, 63, 150, 0.7), rgba(6, 18, 37, 0.25))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "jira-icon.png", preview: "jira-web.png", href: "https://www.raycast.com/raycast/jira" },
    { name: "Linear", desc: "Create, search and modify your issues without leaving your keyboard.", bg: "linear-gradient(138deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "linear-icon.png", preview: "linear-web.png", href: "https://www.raycast.com/linear/linear" },
    { name: "Arc", desc: "Navigate your open tabs or search through your browser history.", bg: "radial-gradient(94.21% 78.4% at 50% 29.91%, rgba(39, 61, 180, 0.7), rgba(15, 9, 38, 0.4))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "arc-icon.png", preview: "arc-web.png", href: "https://www.raycast.com/the-browser-company/arc" },
    { name: "Spotify", desc: "Search for music and podcasts, browse your library, and control playback.", bg: "radial-gradient(30% 40% at 52% 36.91%, rgb(13, 110, 48), rgb(8, 53, 24))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(46,212,105,0.05) 0px 0px 20px 3px, rgba(46,212,105,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "spotify-icon.png", preview: "spotify-web.png", href: "https://www.raycast.com/mattisssa/spotify-player" },
    { name: "1Password", desc: "Easily grab any password or credential from your 1Password vaults.", bg: "radial-gradient(90.35% 49.25% at 50% 59.06%, rgba(2, 61, 114, 0.7), rgba(5, 11, 28, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "1password-icon.png", preview: "1password-web.png", href: "https://www.raycast.com/khasbilegt/1password" },
  ],
  Design: [
    { name: "TinyPNG", desc: "Compress the selected images in Finder with TinyPNG.", bg: "radial-gradient(84.35% 70.19% at 50% 38.11%, rgba(2, 96, 101, 0.57), rgba(5, 136, 178, 0.06))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "tiny-png-icon.png", preview: "tiny-png-web.png", href: "https://www.raycast.com/kawamataryo/tinypng" },
    { name: "Figma", desc: "Browse your Figma files and open them in Figma.", bg: "radial-gradient(84.35% 70.19% at 50% 38.11%, rgba(80, 40, 120, 0.57), rgba(30, 20, 50, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "figma-icon.png", preview: "figma-web.png", href: "https://www.raycast.com/sonora/figma" },
    { name: "Arc", desc: "Navigate your open tabs or search through your browser history.", bg: "radial-gradient(94.21% 78.4% at 50% 29.91%, rgba(39, 61, 180, 0.7), rgba(15, 9, 38, 0.4))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "arc-icon.png", preview: "arc-web.png", href: "https://www.raycast.com/the-browser-company/arc" },
    { name: "Notion", desc: "The fastest way to search and create Notion pages.", bg: "radial-gradient(126.42% 76.6% at 50% 32.26%, rgba(84, 95, 102, 0.7), rgba(0, 36, 69, 0.13))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "notion-icon.png", preview: "notion-web.png", href: "https://www.raycast.com/notion/notion" },
    { name: "Spotify", desc: "Search for music and podcasts, browse your library, and control playback.", bg: "radial-gradient(30% 40% at 52% 36.91%, rgb(13, 110, 48), rgb(8, 53, 24))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(46,212,105,0.05) 0px 0px 20px 3px, rgba(46,212,105,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "spotify-icon.png", preview: "spotify-web.png", href: "https://www.raycast.com/mattisssa/spotify-player" },
  ],
  Writing: [
    { name: "Google Translate", desc: "Use Google Translate to effortlessly translate into multiple languages.", bg: "radial-gradient(94.21% 78.4% at 50% 29.91%, rgba(43, 94, 180, 0.7), rgba(13, 16, 35, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(85,0,98,0.1) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "google-translate-icon.png", preview: "google-translate-web.png", href: "https://www.raycast.com/gebeto/translate" },
    { name: "Notion", desc: "Write, plan, collaborate, and get organized in one tool.", bg: "radial-gradient(126.42% 76.6% at 50% 32.26%, rgba(84, 95, 102, 0.7), rgba(0, 36, 69, 0.13))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "notion-icon.png", preview: "notion-web.png", href: "https://www.raycast.com/notion/notion" },
    { name: "Linear", desc: "Write clear issue descriptions and updates without switching context.", bg: "linear-gradient(138deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%)", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "linear-icon.png", preview: "linear-web.png", href: "https://www.raycast.com/linear/linear" },
    { name: "Slack", desc: "Draft and send messages without switching away from your work.", bg: "radial-gradient(99.74% 100% at 50% 0%, rgba(74, 21, 75, 0.7), rgba(29, 5, 29, 0.42))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(74,21,75,0.1) 0px 0px 20px 3px, rgba(74,21,75,0.1) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "slack-icon.png", preview: "slack-web.png", href: "https://www.raycast.com/mommertf/slack" },
    { name: "Todoist", desc: "Capture tasks and notes quickly without disrupting your writing flow.", bg: "radial-gradient(126.42% 76.6% at 50% 32.26%, rgba(84, 95, 102, 0.7), rgba(0, 36, 69, 0.13))", shadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset, rgba(7,13,79,0.05) 0px 0px 20px 3px, rgba(7,13,79,0.05) 0px 0px 40px 20px, rgba(255,255,255,0.06) 0px 0px 0px 1px inset", icon: "todoist-icon.png", preview: "todoist-web.png", href: "https://www.raycast.com/doist/todoist" },
  ],
};

const CATEGORIES = ["Productivity", "Engineering", "Design", "Writing"];

export default function ExtensionsGallery() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [backdropPos, setBackdropPos] = useState({ left: 0, width: 110 });
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabRefs.current[activeCategory];
    if (!el) return;
    setBackdropPos({ left: el.offsetLeft - 12, width: el.offsetWidth + 24 });
  }, [activeCategory]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    reelRef.current?.scrollTo({ left: 0, behavior: "instant" });
    setCanScrollLeft(false);
    setCanScrollRight(true);
  }, [activeCategory]);

  const handleScroll = () => {
    const el = reelRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scrollBy = (dir: -1 | 1) => {
    const el = reelRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "120px 0", overflow: "hidden" }}>
      {/* Top row: title + category tabs */}
      <div style={{ maxWidth: "1204px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}>
          {/* Title */}
          <div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              margin: "0 0 4px",
            }}>
              There&apos;s an extension for that.
            </h2>
            <p style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}>
              Use your favorite tools without even opening them.
            </p>
          </div>

          {/* Category tabs */}
          <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "8px 20px",
              borderRadius: "31px",
              background: "linear-gradient(137deg, rgb(17,18,20) 4.87%, rgb(12,13,15) 75.88%)",
              boxShadow: "rgba(255,255,255,0.1) 0px 1px 0px 0px inset",
            }}>
              {/* Sliding backdrop */}
              <motion.div
                animate={{ x: backdropPos.left, width: backdropPos.width }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "8px",
                  height: "46px",
                  borderRadius: "36px",
                  background: "radial-gradient(51.07% 92.4% at 51% 7.61%, rgb(90,90,90) 0px, rgb(26,26,26) 100%)",
                  pointerEvents: "none",
                }}
              />
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat}
                  ref={el => { tabRefs.current[i] = el; }}
                  onClick={() => setActiveCategory(i)}
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    height: "46px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    userSelect: "none",
                    opacity: activeCategory === i ? 1 : hoveredCategory === i ? 0.8 : 0.6,
                    transition: "opacity 150ms ease",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Scrollable reel — full width with padding to show peek */}
      <div style={{
        position: "relative",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}>

        <div
          ref={reelRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: "50px",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "8px 166px 24px",
            WebkitOverflowScrolling: "touch",
          }}
          className="hide-scrollbars"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              exit={shouldReduceMotion ? { opacity: 0 } : {
                opacity: 0,
                scale: 0.98,
                y: -20,
                x: -20,
                transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] },
              }}
              style={{ display: "flex", gap: "50px", flexShrink: 0 }}
            >
              {EXTENSIONS_BY_CATEGORY[CATEGORIES[activeCategory]].map((ext, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, x: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.15 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.1 + i * 0.08,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{ transformOrigin: "right top" }}
                >
                  <ExtensionCard ext={ext} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* "Plus thousands more" card */}
          <div style={{
            flexShrink: 0,
            width: "360px",
            height: "536px",
            borderRadius: "16px",
            border: "0.8px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              border: "0.8px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "rgba(255,255,255,0.5)",
            }}>+</div>
            <div style={{ textAlign: "center", padding: "0 40px" }}>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", fontWeight: 500, margin: "0 0 6px", lineHeight: 1.5 }}>
                Explore 5,000+ extensions built by the community.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                {["A", "I"].map(k => (
                  <span key={k} style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "20px", height: "20px",
                    borderRadius: "4px",
                    border: "0.8px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.3)",
                  }}>{k}</span>
                ))}
              </div>
            </div>
            <a
              href="https://www.raycast.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 500,
                color: "white",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                border: "0.8px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                transition: "background 150ms ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.1)";
                const arrow = el.querySelector(".store-arrow") as HTMLElement | null;
                if (arrow) arrow.style.transform = "translateX(2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.06)";
                const arrow = el.querySelector(".store-arrow") as HTMLElement | null;
                if (arrow) arrow.style.transform = "";
              }}
            >
              Browse in the Store
              <span className="store-arrow" style={{ display: "inline-flex", transition: "transform 150ms ease" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom row: browse link + pagination */}
      <div style={{ maxWidth: "1204px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "8px",
        }}>
          <a
            href="https://www.raycast.com/store"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
            }}
            onMouseEnter={e => {
              const arrow = (e.currentTarget as HTMLElement).querySelector(".browse-arrow") as HTMLElement | null;
              if (arrow) arrow.style.transform = "translateX(2px)";
            }}
            onMouseLeave={e => {
              const arrow = (e.currentTarget as HTMLElement).querySelector(".browse-arrow") as HTMLElement | null;
              if (arrow) arrow.style.transform = "";
            }}
          >
            Browse thousands more
            <span className="browse-arrow" style={{ display: "inline-flex", transition: "transform 150ms ease" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75" />
              </svg>
            </span>
          </a>

          {/* Prev/Next buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <PaginationButton dir="prev" disabled={!canScrollLeft} onClick={() => scrollBy(-1)} />
            <PaginationButton dir="next" disabled={!canScrollRight} onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtensionCard({ ext }: { ext: Extension }) {
  return (
    <a
      href={ext.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flexShrink: 0,
        width: "360px",
        height: "536px",
        textDecoration: "none",
        display: "block",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{
        background: ext.bg,
        boxShadow: ext.shadow,
        borderRadius: "16px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 150ms ease",
      }}
        onMouseEnter={e => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            (e.currentTarget as HTMLElement).style.boxShadow = ext.shadow + ", rgba(255,255,255,0.05) 0px 0px 40px 0px";
          }
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = ext.shadow;
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={`${CDN}/${ext.icon}`}
                alt={ext.name}
                width={56}
                height={56}
                style={{ borderRadius: "14px", flexShrink: 0 }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.2,
              }}>
                {ext.name}
              </div>
            </div>
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              border: "0.8px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "2px",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.75 3.75 10.25 8l-4.5 4.25" style={{ color: "rgba(255,255,255,0.5)" }} />
              </svg>
            </div>
          </div>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            margin: "0 0 16px",
          }}>
            {ext.desc}
          </p>
          {/* Divider */}
          <div style={{ height: "0.8px", background: "rgba(255,255,255,0.08)", margin: "0 -20px" }} />
        </div>

        {/* Preview image */}
        <img
          src={`${CDN}/${ext.preview}`}
          alt=""
          width={360}
          height={360}
          loading="lazy"
          style={{
            width: "100%",
            flex: 1,
            minHeight: 0,
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
    </a>
  );
}

function PaginationButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: "none",
        background: "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "rgba(0,0,0,0.5) 0px 0px 0px 0.8px, rgba(255,255,255,0.14) 0px 0.8px 0px 0px inset",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "opacity 150ms ease, background 150ms ease, box-shadow 150ms ease",
      }}
      onMouseEnter={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)";
          el.style.boxShadow = "rgba(0,0,0,0.5) 0px 0px 0px 0.8px, rgba(255,255,255,0.14) 0px 0.8px 0px 0px inset, 0 0 14px rgba(255,255,255,0.1)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)";
        el.style.boxShadow = "rgba(0,0,0,0.5) 0px 0px 0px 0.8px, rgba(255,255,255,0.14) 0px 0.8px 0px 0px inset";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "prev" ? (
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 3.75 6.75 8l3.5 4.25" style={{ color: "rgba(255,255,255,0.6)" }} />
        ) : (
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.75 3.75 9.25 8l-3.5 4.25" style={{ color: "rgba(255,255,255,0.6)" }} />
        )}
      </svg>
    </button>
  );
}
