"use client";

import React from "react";

const DOT_BG = "radial-gradient(rgb(47,48,49) 0.5px, transparent 0) -8.5px -8.5px / 17px 17px";

const BASE = "#02193b";
const STROKE = "#143ca3";
const DARK = "#07080A";
const DARK2 = "#0F1013";

function FigCaption({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: "10px",
      fontFamily: "monospace",
      color: "rgb(106,107,108)",
      letterSpacing: "0.08em",
      position: "absolute",
      top: "16px",
      left: "16px",
      zIndex: 2,
    }}>
      {label}
    </div>
  );
}

function ExternalArrow() {
  return (
    <div
      className="ext-arrow-icon"
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        border: "0.8px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: "12px",
        transition: "transform 200ms ease, color 200ms ease",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 3.75h6m0 0v6m0-6-8.5 8.5"/>
      </svg>
    </div>
  );
}

const CELL = "0 0 0 0.5px rgba(255,255,255,0.07)"; // box-shadow for grid lines

function DottedCell({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: DOT_BG,
      boxShadow: CELL,
      ...style,
    }}>
      {children}
    </div>
  );
}

function TextCell({ children, href, style }: { children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      onMouseEnter={href ? (e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
        (e.currentTarget as HTMLElement).style.boxShadow = `${CELL}, inset 0 0 0 0.8px rgba(255,255,255,0.12)`;
        const arrow = (e.currentTarget as HTMLElement).querySelector('.ext-arrow-icon') as HTMLElement;
        if (arrow) arrow.style.transform = "translate(2px, -2px)";
      } : undefined}
      onMouseLeave={href ? (e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.background = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        const arrow = (e.currentTarget as HTMLElement).querySelector('.ext-arrow-icon') as HTMLElement;
        if (arrow) arrow.style.transform = "";
      } : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "16px",
        padding: "24px",
        boxShadow: CELL,
        textDecoration: "none",
        minHeight: "300px",
        transition: "background 200ms ease",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export default function APISection() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* Fade overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(90deg, #07080a 0%, transparent 8%, transparent 92%, #07080a 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(180deg, #07080a 0%, transparent 6%, transparent 94%, #07080a 100%)" }} />

      <div style={{
        maxWidth: "1204px",
        margin: "0 auto",
        position: "relative",
        zIndex: 3,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1px",
        backgroundColor: "rgba(255,255,255,0.06)",
      }}>

        {/* Row 1: Title (col 1) + Main figure (col 2-3) */}
        <TextCell style={{ minHeight: "280px", justifyContent: "flex-end" }}>
          <h3 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 400, color: "white", lineHeight: 1.17, letterSpacing: "0.2px", margin: 0 }}>
            Build the<br />perfect<br />tools.
          </h3>
        </TextCell>
        <DottedCell style={{ gridColumn: "2 / span 2", minHeight: "280px" }}>
          <FigCaption label="FIG_00" />
          <img src="/images/api-main-figure.svg" alt="Main API Figure" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>

        {/* Row 2: Description + Read docs (col 1) + empty dotted (col 2-3) */}
        <TextCell href="https://developers.raycast.com">
          <p style={{ fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, letterSpacing: "0.3px" }}>
            Our extension API is designed to allow anyone with web development skills to unleash the power of Raycast.
          </p>
          <div
            className="read-docs-link"
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "white";
              const arrow = el.querySelector<HTMLElement>(".read-docs-arrow");
              if (arrow) arrow.style.transform = "translateX(3px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.5)";
              const arrow = el.querySelector<HTMLElement>(".read-docs-arrow");
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
            style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.3px", cursor: "pointer" }}
          >
            Read the docs
            <span className="read-docs-arrow" style={{ display: "inline-flex", transition: "transform 200ms ease" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.25 3.75h6m0 0v6m0-6-8.5 8.5"/>
              </svg>
            </span>
          </div>
        </TextCell>
        <DottedCell style={{ gridColumn: "2 / span 2", minHeight: "180px" }} />

        {/* Row 3: React illustration (col 1-2) + React text (col 3) */}
        <DottedCell style={{ gridColumn: "1 / span 2", minHeight: "380px" }}>
          <FigCaption label="FIG_01" />
          <ExternalArrow />
          <img src="/images/api-react-macos.svg" alt="React to macOS" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>
        <TextCell href="https://developers.raycast.com" style={{ minHeight: "380px" }}>
          <div />
          <div>
            <h4 style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: "24px", fontWeight: 500, color: "white", margin: "0 0 12px", lineHeight: 1.6, letterSpacing: "0.2px" }}>React to macOS</h4>
            <p style={{ fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, letterSpacing: "0.3px" }}>
              Build rich, native extensions with the technologies you already know: React, TypeScript and Node.
            </p>
          </div>
          <ExternalArrow />
        </TextCell>

        {/* Row 4: Built-in illustration (col 1) + Built-in text (col 2) + extra dotted (col 3) */}
        <DottedCell style={{ minHeight: "300px" }}>
          <FigCaption label="FIG_02" />
          <img src="/images/api-builtin-ui1.svg" alt="Built-in UI 1" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>
        <TextCell href="https://developers.raycast.com" style={{ minHeight: "300px" }}>
          <div />
          <div>
            <h4 style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: "24px", fontWeight: 500, color: "white", margin: "0 0 12px", lineHeight: 1.6, letterSpacing: "0.2px" }}>Built-in UI</h4>
            <p style={{ fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, letterSpacing: "0.3px" }}>
              Our UI component library allows you to concentrate on the logic while we push the pixels.
            </p>
          </div>
          <ExternalArrow />
        </TextCell>
        <DottedCell style={{ minHeight: "300px" }}>
          <FigCaption label="FIG_02b" />
          <img src="/images/api-builtin-ui2.svg" alt="Built-in UI 2" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>

        {/* Row 5: Batteries text (col 1) + Batteries illustration (col 2-3) */}
        <TextCell href="https://developers.raycast.com" style={{ minHeight: "380px" }}>
          <div />
          <div>
            <h4 style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: "24px", fontWeight: 500, color: "white", margin: "0 0 12px", lineHeight: 1.6, letterSpacing: "0.2px" }}>Batteries included</h4>
            <p style={{ fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, letterSpacing: "0.3px" }}>
              A strongly typed API, hot-reloading and modern tooling that make it a blast to work with.
            </p>
          </div>
          <ExternalArrow />
        </TextCell>
        <DottedCell style={{ gridColumn: "2 / span 2", minHeight: "380px" }}>
          <FigCaption label="FIG_03" />
          <ExternalArrow />
          <img src="/images/api-batteries-included.svg" alt="Batteries Included" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>

        {/* Row 6: Publish illustration (col 1-2) + Publish text (col 3) */}
        <DottedCell style={{ gridColumn: "1 / span 2", minHeight: "380px" }}>
          <FigCaption label="FIG_04" />
          <ExternalArrow />
          <img src="/images/api-publish-store.svg" alt="Publish to Store" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </DottedCell>
        <TextCell href="https://developers.raycast.com" style={{ minHeight: "380px" }}>
          <div />
          <div>
            <h4 style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: "24px", fontWeight: 500, color: "white", margin: "0 0 12px", lineHeight: 1.6, letterSpacing: "0.2px" }}>Publish to the Store</h4>
            <p style={{ fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, letterSpacing: "0.3px" }}>
              Submit your extension to the Raycast Store and share it with thousands of users.
            </p>
          </div>
          <ExternalArrow />
        </TextCell>

        {/* Row 7: Get started (col 2) */}
        <div style={{ boxShadow: CELL }} />
        <TextCell href="https://developers.raycast.com" style={{ minHeight: "auto", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "8px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: "monospace", fontSize: "14px", color: "white", textDecoration: "none", letterSpacing: "0.3px",
          }}>
            Get started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"/>
            </svg>
          </div>
        </TextCell>
        <div style={{ boxShadow: CELL }} />

      </div>
    </section>
  );
}
