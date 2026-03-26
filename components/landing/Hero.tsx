"use client";

import { motion } from "framer-motion";
import HeroArtifact from "@/components/landing/HeroArtifact";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 16px",
        textAlign: "center",
        backgroundColor: "#07080a",
      }}
    >
      <style>{`
        @property --r2 {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @property --x {
          syntax: '<length>';
          initial-value: 0px;
          inherits: false;
        }
        @keyframes glaze-x {
          0%       { --x: 20px; }
          32.8228% { --x: 206px; }
          50%      { --x: 206px; }
          82.8228% { --x: 20px; }
          100%     { --x: 20px; }
        }
        @keyframes glaze-r2 {
          0%       { --r2: 0deg; }
          32.8228% { --r2: 0deg; }
          50%      { --r2: 180deg; }
          82.8228% { --r2: 180deg; }
          100%     { --r2: 360deg; }
        }
        .glaze-border-wrap {
          padding: 1px;
          background: conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px, transparent 0, rgb(236,165,167) 20%, transparent 25%), #452324;
          border-radius: 43px;
          box-shadow: rgba(245, 48, 107, 0.1) 0px 0px 20px 0px;
          transition: background-color 0.2s, box-shadow 0.2s;
          transform: translateZ(0);
          animation: 3s linear -0.64s infinite glaze-r2, 3s linear -0.64s infinite glaze-x;
        }
        .glaze-border-wrap:hover {
          background-color: rgb(131, 54, 55);
          box-shadow: rgba(245, 49, 108, 0.25) 0px 0px 20px 3px;
        }
        .glaze-inner {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          height: 30px;
          border-radius: 1000px;
          background: rgb(19, 13, 14);
          padding: 4px 12px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.2px;
          color: white;
          text-decoration: none;
          white-space: nowrap;
        }
      `}</style>

      <HeroArtifact />

      {/* Outer wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Text group — h1 + p only, with the 370/212 padding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            maxWidth: "800px",
            width: "100%",
            paddingTop: "370px",
            paddingBottom: "212px",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(44px, 6vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "rgb(255, 255, 255)",
              maxWidth: "540px",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
            }}
          >
            Your shortcut to everything.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "18px",
              fontWeight: 400,
              letterSpacing: "0.2px",
              lineHeight: 1.6,
              color: "rgb(255, 255, 255)",
              maxWidth: "500px",
            }}
          >
            A collection of powerful productivity tools all within an extendable launcher.
            Fast, ergonomic and reliable.
          </motion.p>
        </div>

        {/* Buttons, meta, pill — separate group below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            paddingBottom: "clamp(40px, 6vh, 80px)",
            textAlign: "center",
          }}
        >

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}
        >
          <DownloadButton icon="apple" label="Download for Mac" />
          <DownloadButton icon="windows" label="Download for Windows (beta)" />
        </motion.div>

        {/* Meta line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36, duration: 0.7, ease: "easeOut" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgb(106, 107, 108)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>V1.104.11</span>
          <span style={{ width: "1px", height: "10px", background: "rgb(156, 156, 157)", display: "inline-block", opacity: 0.4 }} />
          <span>macOS 13+</span>
          <span style={{ width: "1px", height: "10px", background: "rgb(156, 156, 157)", display: "inline-block", opacity: 0.4 }} />
          <a
            href="https://brew.sh"
            style={{ color: "rgb(106, 107, 108)", textDecoration: "none", transition: "color 150ms ease" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgb(106, 107, 108)"; }}
          >
            Install via homebrew
          </a>
        </motion.div>

        {/* Glaze pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingTop: "40px" }}
        >
          <div className="glaze-border-wrap">
            <a href="/blog/introducing-glaze" className="glaze-inner">
              <span>Introducing Glaze</span>
              <span style={{ color: "rgb(156, 156, 157)", display: "flex", alignItems: "center", gap: "4px" }}>
                Join waitlist
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
        </div>{/* end buttons group */}
      </div>{/* end outer wrapper */}
    </section>
  );
}

function DownloadButton({
  icon,
  label,
}: {
  icon: "apple" | "windows";
  label: string;
}) {
  return (
    <a
      href="#download"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        height: "36px",
        padding: "0 14px",
        borderRadius: "8px",
        background: "rgb(230, 230, 230)",
        color: "rgb(24, 25, 26)",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        boxShadow: "rgba(255, 255, 255, 0.19) 0px 0px 14px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0.4px 0px inset, rgb(255, 255, 255) 0px 1px 0.4px 0px inset",
        transition: "opacity 150ms ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
    >
      {icon === "apple" ? <AppleIcon /> : <WindowsIcon />}
      {label}
    </a>
  );
}

function AppleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="none" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M12.665 15.358c-.905.844-1.893.711-2.843.311-1.006-.409-1.93-.427-2.991 0-1.33.551-2.03.391-2.825-.31C-.498 10.886.166 4.078 5.28 3.83c1.246.062 2.114.657 2.843.71 1.09-.213 2.133-.826 3.296-.746 1.393.107 2.446.64 3.138 1.6-2.88 1.662-2.197 5.315.443 6.337-.526 1.333-1.21 2.657-2.345 3.635zM8.03 3.778C7.892 1.794 9.563.16 11.483 0c.268 2.293-2.16 4-3.452 3.777" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 88 88" fill="currentColor" aria-hidden="true">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.066 41.455-47.318-6.82-.066-34.752z" />
    </svg>
  );
}
