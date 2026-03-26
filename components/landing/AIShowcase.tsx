"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAB_DURATION_MS = 6000;
const INDICATOR_GROUP_WIDTH = 300;
const INDICATOR_ACTIVE_WIDTH = 92;
const INDICATOR_INACTIVE_WIDTH = 46;
const INDICATOR_GAP = 12;

const chatData = [
  {
    boldDesc: "Ask Anything, Anytime, Anywhere.",
    dimDesc: " Quick AI combines the power of AI with the web to answer any question.",
    history: [
      { label: "Form validation in React", sub: "There are many useful..." },
      { label: "JavaScript code to split a..." },
      { label: "Alternatives to describe..." },
      { label: "Fixing errors in a series o..." },
      { label: "Convert React to TypeSc..." },
    ],
    activeTitle: "New Chat",
    question: "What is the difference between useEffect and useLayoutEffect?",
    answer: `The main difference between useEffect and useLayoutEffect in React is the timing at which they are executed during the rendering process.\n\nuseEffect is asynchronous and runs after the browser has painted the screen. It is commonly used for handling side effects like data fetching, subscriptions, or updating the DOM.\n\nHere's an example of useEffect:\n\nimport React, { useEffect } from 'react';\n\nconst ExampleComponent = () => {\n  useEffect(() => {`,
  },
  {
    boldDesc: "Always On ChatGPT.",
    dimDesc: " Stuck while coding? Need help writing an email? Meet your new virtual assistant.",
    history: [
      { label: "Draft release notes", active: true, sub: "There are many useful..." },
      { label: "Write a tweet" },
      { label: "Explain quantum computing" },
      { label: "Recipe for banana bread" },
    ],
    activeTitle: "Draft release notes",
    question: "Write a short, engaging release note for Raycast's new AI features.",
    answer: `🚀 Raycast AI is here!\n\nYour Mac just got a massive upgrade. We've brought the power of ChatGPT directly into your workflow — faster and more accessible than ever.\n\nAsk questions, draft emails, or debug code without switching apps. It's built right into macOS and ready whenever you need it.\n\nWork smarter. Ship faster.`,
  },
  {
    boldDesc: "Your Automation Assistant.",
    dimDesc: " Create your own AI Commands to automate repetitive tasks and eliminate chores.",
    history: [
      { label: "Fix Python indentation", active: true, sub: "There are many useful..." },
      { label: "Draft release notes" },
      { label: "Write a tweet" },
    ],
    activeTitle: "Fix Python indentation",
    question: "Extract email addresses from a JSON array of users using jq",
    answer: "You can use the following `jq` command:\n\n```bash\ncat users.json | jq -r '.[].email' > emails.txt\n```\n\nThis reads the JSON file, iterates over the array, extracts the raw email string, and outputs it to emails.txt.",
  },
];

export default function AIShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    const timer = window.setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % chatData.length);
    }, TAB_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  const current = chatData[activeTab];

  return (
    <section style={{ 
      padding: "160px 24px 120px", 
      position: "relative", 
      overflow: "hidden",
      backgroundImage: "url('/featureBackground.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}>

        {/* AI separator + heading */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}>
            <svg width="272" height="2" viewBox="0 0 272 2" fill="none" style={{ filter: "drop-shadow(0px 0px 4px rgba(245,48,107,0.7)) drop-shadow(0px 0px 10px rgba(245,48,107,0.4))" }}>
              <path d="M272 1L0.5 0.999976" stroke="url(#ai_left_grad)" />
              <defs>
                <linearGradient id="ai_left_grad" x1="272.5" y1="1.5" x2="0.5" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF6363" />
                  <stop offset="0.165" stopColor="#581D27" />
                  <stop offset="1" stopColor="#190E14" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ff6363", letterSpacing: "0.06em", textTransform: "uppercase" }}>AI</span>
            <svg width="272" height="2" viewBox="0 0 272 2" fill="none" style={{ filter: "drop-shadow(0px 0px 4px rgba(245,48,107,0.7)) drop-shadow(0px 0px 10px rgba(245,48,107,0.4))" }}>
              <path d="M0 1L271.5 1" stroke="url(#ai_right_grad)" />
              <defs>
                <linearGradient id="ai_right_grad" x1="-0.5" y1="0.5" x2="271.5" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF6363" />
                  <stop offset="0.165" stopColor="#581D27" />
                  <stop offset="1" stopColor="#190E14" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 600,
            color: "white",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}>
            Your Mac just got smarter.
          </h2>
          <p style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "rgb(106, 107, 108)",
            margin: 0,
          }}>
            AI where it&apos;s most useful — on your OS.
          </p>
        </div>

        {/* Chat panel */}
        <div style={{
          width: "100%",
          maxWidth: "860px",
          marginBottom: "30px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "linear-gradient(160deg, rgba(22,24,30,0.98) 0%, rgba(14,15,20,0.98) 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.7)",
          overflow: "hidden",
          display: "flex",
          height: "440px",
          position: "relative",
        }}>

          {/* Sidebar */}
          <div style={{
            width: "200px",
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* New Chat */}
            <div style={{ padding: "12px 10px 10px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 10px",
                borderRadius: "7px",
                background: "rgba(255,255,255,0.07)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 500,
                cursor: "pointer",
              }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 2v9M2 6.5h9" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                New Chat
              </div>
            </div>

            {/* History label */}
            <div style={{ padding: "6px 12px 4px", fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              History
            </div>

            {/* History items */}
            <div style={{ padding: "0 5px", flex: 1 }}>
              <AnimatePresence mode="popLayout">
                {current.history.map((item, i) => (
                  <motion.div
                    key={`${activeTab}-${i}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.03 }}
                    style={{
                      padding: "6px 9px",
                      borderRadius: "6px",
                      background: "active" in item && item.active ? "rgba(255,255,255,0.08)" : "transparent",
                      marginBottom: "1px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      fontSize: "12px",
                      color: "active" in item && item.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.42)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {item.label}
                    </div>
                    {"sub" in item && item.sub && (
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.sub}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Main chat area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {/* Header */}
            <div style={{
              height: "44px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              flexShrink: 0,
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${activeTab}-title`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}
                >
                  {current.activeTitle}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-messages`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  {/* User bubble */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(120,60,200,0.7), rgba(200,60,100,0.7))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.5" cy="3.8" r="2.2" fill="rgba(255,255,255,0.9)"/>
                        <path d="M1 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, fontSize: "12.5px", lineHeight: 1.65, color: "rgba(255,255,255,0.9)", paddingTop: "2px" }}>
                      {current.question}
                    </div>
                  </div>

                  {/* AI response */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", color: "rgba(255,255,255,0.7)",
                    }}>
                      ✦
                    </div>
                    <div style={{ flex: 1, fontSize: "12.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", whiteSpace: "pre-wrap" }}>
                      {current.answer}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div style={{ padding: "10px 14px 12px", flexShrink: 0 }}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9px",
                padding: "9px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <div style={{ flex: 1, fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>Ask AI anything...</div>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #E8474C, #C0392B)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M4.5 8V1M4.5 1L2 3.5M4.5 1L7 3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: `${INDICATOR_GROUP_WIDTH}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: `${INDICATOR_GAP}px`,
            marginBottom: "26px",
            height: "32px",
            padding: "40px 0",
          }}
        >
          <style>{`@keyframes ai-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
          {chatData.map((_, i) => {
            const isActive = activeTab === i;
            const isDone = activeTab > i;

            return (
              <button
                key={`indicator-${i}`}
                aria-label={`Show AI panel ${i + 1}`}
                onClick={() => setActiveTab(i)}
                onMouseEnter={() => setHoveredTab(i)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  position: "relative",
                  width: `${isActive ? INDICATOR_ACTIVE_WIDTH : INDICATOR_INACTIVE_WIDTH}px`,
                  height: "2px",
                  padding: 0,
                  border: "none",
                  borderRadius: "999px",
                  background: isDone ? "rgba(255,99,99,0.25)" : "rgba(255,99,99,0.1)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "width 220ms ease",
                  boxShadow: isActive ? "0 0 10px rgba(255,60,60,0.55)" : "none",
                  zIndex: 1,
                }}
              >
                {isDone && (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,120,120,0.7), rgba(255,55,55,0.6))", borderRadius: "999px" }} />
                )}
                {isActive && (
                  <div
                    key={`fill-${activeTab}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, rgba(255,140,140,1), rgba(255,60,60,0.95))",
                      borderRadius: "999px",
                      boxShadow: "0 0 8px rgba(255,80,80,0.9)",
                      transformOrigin: "left center",
                      animation: `ai-fill ${TAB_DURATION_MS}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Feature tabs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          width: "100%",
          maxWidth: "860px",
        }}>
          {chatData.map((tab, i) => {
            const isActive = activeTab === i;
            const isHovered = hoveredTab === i;
            const paraColor = isActive
              ? "rgba(255,255,255,0.85)"
              : isHovered
              ? "rgba(255,255,255,0.55)"
              : "rgba(255,255,255,0.35)";
            const strongColor = isActive
              ? "white"
              : isHovered
              ? "rgba(255,255,255,0.55)"
              : "rgba(255,255,255,0.35)";
            return (
              <div
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  startTimeRef.current = Date.now();
                  setProgress(0);
                }}
                onMouseEnter={() => setHoveredTab(i)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{ cursor: "pointer", padding: 0, position: "relative" }}
              >
                <p style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: paraColor,
                  lineHeight: 1.55,
                  margin: 0,
                  transition: "color 300ms ease",
                }}>
                  <strong style={{ fontWeight: 600, color: strongColor, transition: "color 300ms ease" }}>
                    {tab.boldDesc}
                  </strong>
                  {tab.dimDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* More about AI */}
        <div style={{ marginTop: "40px" }}>
          <a
            href="/ai"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.3px",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "white";
              const svg = (e.currentTarget as HTMLElement).querySelector("svg") as HTMLElement | null;
              if (svg) svg.style.transform = "translateX(3px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
              const svg = (e.currentTarget as HTMLElement).querySelector("svg") as HTMLElement | null;
              if (svg) svg.style.transform = "none";
            }}
          >
            More about AI
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 150ms ease" }}>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
