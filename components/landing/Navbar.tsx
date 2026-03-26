"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Store", href: "/store" },
  { label: "Pro", href: "/pro" },
  { label: "AI", href: "/ai" },
  { label: "iOS", href: "/ios" },
  { label: "Windows", href: "/windows" },
  { label: "Teams", href: "/teams" },
  { label: "Developers", href: "/developers" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 16px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "1204px",
          padding: "17px 33px",
          background: scrolled
            ? "linear-gradient(136.285deg, rgba(17, 18, 20, 0.92) 4.87%, rgba(12, 13, 15, 0.98) 75.88%)"
            : "linear-gradient(136.285deg, rgba(17, 18, 20, 0.75) 4.87%, rgba(12, 13, 15, 0.9) 75.88%)",
          transition: "background 300ms ease, box-shadow 300ms ease",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "0.8px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          boxShadow: scrolled
            ? "inset rgba(255,255,255,0.15) 0px 1px 1px 0px, 0 8px 32px rgba(0,0,0,0.4)"
            : "inset rgba(255,255,255,0.15) 0px 1px 1px 0px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            textDecoration: "none",
            color: "white",
          }}
        >
          <RaycastLogo />
          <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.01em" }}>
            Raycast
          </span>
        </Link>

        {/* Nav links — centered */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                padding: "6px 9px",
                fontSize: "14px",
                fontWeight: 500,
                color: "rgb(156, 156, 157)",
                textDecoration: "none",
                transition: "color 150ms ease, background 150ms ease",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "white";
                el.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgb(156, 156, 157)";
                el.style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Log in + Download */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0 }}>
          <a
            href="/login"
            style={{
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgb(156, 156, 157)",
              textDecoration: "none",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(156, 156, 157)"; }}
          >
            Log in
          </a>
          <DownloadButton />
        </div>
      </nav>
    </div>
  );
}

function DownloadButton() {
  return (
    <a
      href="#download"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        height: "36px",
        padding: "0 12px",
        borderRadius: "8px",
        background: "#e6e6e6",
        color: "rgb(24, 25, 26)",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 0px 2px, rgba(255, 255, 255, 0.19) 0px 0px 14px 0px",
        transition: "opacity 150ms ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
    >
      <AppleIcon />
      Download
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

function RaycastLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" width="22" height="22" aria-hidden="true">
      <path
        fill="#FF6363"
        fillRule="evenodd"
        d="M12 30.99V36L-.01 23.99l2.516-2.499zM17.01 36H12l12.011 12.01 2.506-2.505zm28.487-9.497L48 24 24 0l-2.503 2.503L30.98 12h-5.732l-6.62-6.614-2.506 2.503 4.122 4.122h-2.869v18.625H36V27.77l4.122 4.122 2.503-2.506L36 22.747v-5.732zM13.253 10.747l-2.503 2.506 2.686 2.686 2.503-2.506zm21.314 21.314-2.495 2.503 2.686 2.686 2.506-2.503zM7.878 16.121l-2.503 2.504L12 25.253v-5.012zM27.756 36h-5.009l6.628 6.625 2.503-2.503z"
        clipRule="evenodd"
      />
    </svg>
  );
}
