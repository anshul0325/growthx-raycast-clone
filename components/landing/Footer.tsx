"use client";

import Link from "next/link";

const footerLinks: Record<string, Array<{ label: string; href: string; external?: boolean }>> = {
  Product: [
    { label: "Store", href: "/store" },
    { label: "Pro", href: "/pro" },
    { label: "Teams", href: "/teams" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Browser Extension", href: "/browser-extension" },
    { label: "Developers", href: "/developers" },
    { label: "iOS", href: "/ios" },
    { label: "Windows", href: "/windows" },
    { label: "API Docs", href: "https://developers.raycast.com", external: true },
    { label: "Manual", href: "https://manual.raycast.com", external: true },
    { label: "Troubleshooting", href: "https://manual.raycast.com/troubleshooting", external: true },
    { label: "Raycast vs Alfred", href: "/alfred" },
    { label: "FAQ", href: "/faq" },
  ],
  "Core Features": [
    { label: "Raycast AI", href: "/ai" },
    { label: "Raycast Notes", href: "/core/notes" },
    { label: "Raycast Focus", href: "/core/focus" },
    { label: "Clipboard History", href: "/core/clipboard-history" },
    { label: "Window Management", href: "/core/window-management" },
    { label: "Snippets", href: "/core/snippets" },
    { label: "File Search", href: "/core/file-search" },
    { label: "Quicklinks", href: "/core/quicklinks" },
    { label: "Calculator", href: "/core/calculator" },
    { label: "Calendar", href: "/core/calendar" },
    { label: "System", href: "/core/system" },
    { label: "Emoji Picker", href: "/core/emoji-picker" },
  ],
  "Top Extensions": [
    { label: "Design Tools", href: "/store/design-tools" },
    { label: "Developer Tools", href: "/store/developer-tools" },
    { label: "Pomodoro Timer", href: "/store/pomodoro-timer" },
    { label: "Productivity", href: "/store/productivity" },
    { label: "Project Management", href: "/store/project-management" },
    { label: "Time Management", href: "/store/time-management" },
    { label: "Transcript", href: "/store/transcript" },
    { label: "Translation", href: "/store/translation" },
    { label: "Work From Home", href: "/store/work-from-home" },
    { label: "AI", href: "/store/ai" },
  ],
  Company: [
    { label: "Manifesto", href: "/manifesto" },
    { label: "Customers", href: "/customers" },
    { label: "Careers", href: "/jobs" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Acceptable Use Policy", href: "/aup" },
    { label: "DPA", href: "/dpa" },
    { label: "Trust Center", href: "https://trust.raycast.com", external: true },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Community: [
    { label: "Community Stories", href: "/stories" },
    { label: "Ambassadors", href: "/ambassadors" },
    { label: "Slack", href: "https://raycast.com/community", external: true },
    { label: "X/Twitter", href: "https://twitter.com/raycast", external: true },
    { label: "GitHub", href: "https://github.com/raycast", external: true },
    { label: "Dribbble", href: "https://dribbble.com/raycast", external: true },
  ],
  "By Raycast": [
    { label: "Try Raycast AI", href: "/ai", external: true },
    { label: "Explore Snippets", href: "/snippets", external: true },
    { label: "Explore Quicklinks", href: "/quicklinks", external: true },
    { label: "Prompts", href: "/prompts", external: true },
    { label: "Chat Presets", href: "/presets", external: true },
    { label: "ray.so", href: "https://ray.so", external: true },
    { label: "Icon Maker", href: "https://icon.ray.so", external: true },
    { label: "Merch", href: "https://merch.raycast.com", external: true },
    { label: "Wallpapers", href: "/wallpapers" },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 24px 48px",
      background: "rgb(7, 8, 10)",
      position: "relative",
    }}>
      <div style={{ maxWidth: "1204px", margin: "0 auto" }}>
        {/* Main footer link grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "32px",
          marginBottom: "64px",
        }}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "white",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}>
                {category}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        transition: "color 150ms ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                    >
                      {link.label}
                      {link.external && (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
                          <path d="M2 10L10 2M10 2H4M10 2v6" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "48px 0 24px",
          borderTop: "0.8px solid rgb(27,28,30)",
          gap: "24px",
          marginBottom: "0",
        }}>
          {/* Left: text */}
          <div style={{ maxWidth: "260px" }}>
            <h5 style={{ fontSize: "14px", fontWeight: 500, color: "white", margin: "0 0 4px" }}>
              Subscribe to our newsletter.
            </h5>
            <p style={{ fontSize: "14px", color: "rgb(156,156,157)", margin: 0, lineHeight: "22.4px" }}>
              Get product updates and news in your inbox. No spam.
            </p>
          </div>

          {/* Right: form */}
          <form
            onSubmit={e => e.preventDefault()}
            style={{
              display: "grid",
              gridTemplateColumns: "276px 138px",
              gridTemplateRows: "42px auto",
              gap: "16px",
            }}
          >
            <input
              type="email"
              placeholder="brian@bell.labs"
              style={{
                height: "42px",
                background: "rgba(255,255,255,0.05)",
                border: "0.8px solid rgba(255,255,255,0.05)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                width: "100%",
                transition: "border-color 150ms ease, background 150ms ease",
              }}
              onFocus={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onBlur={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            />
            <div style={{ position: "relative", height: "42px" }}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(255,255,255,0.9)",
                  border: "0.8px solid rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  color: "rgb(0,0,0)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 2,
                  transition: "opacity 150ms ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  const glow = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                  if (glow) glow.style.opacity = "0.8";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  const glow = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                  if (glow) glow.style.opacity = "0";
                }}
              >
                Subscribe
              </button>
              <span style={{
                position: "absolute",
                inset: "-10.5px",
                borderRadius: "6px",
                background: "conic-gradient(from 136.95deg, rgb(2,148,254) -55.68deg, rgb(255,33,54) 113.23deg, rgb(155,77,255) 195deg, rgb(2,148,254) 304.32deg, rgb(255,33,54) 473.23deg)",
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 200ms ease",
                zIndex: 1,
              }} />
            </div>
            <span style={{
              gridColumn: "1 / -1",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.5,
            }}>
              By submitting your email address, you agree to receive Raycast&apos;s monthly newsletter. For more information, please read our{" "}
              <a href="/privacy" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>privacy policy</a>.
              {" "}You can always withdraw your consent.
            </span>
          </form>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: "24px",
          borderTop: "0.8px solid rgb(27,28,30)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          {/* Logo + Copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
              <path fill="#FF6363" fillRule="evenodd" d="M12 30.99V36L-.01 23.99l2.516-2.499zM17.01 36H12l12.011 12.01 2.506-2.505zm28.487-9.497L48 24 24 0l-2.503 2.503L30.98 12h-5.732l-6.62-6.614-2.506 2.503 4.122 4.122h-2.869v18.625H36V27.77l4.122 4.122 2.503-2.506L36 22.747v-5.732zM13.253 10.747l-2.503 2.506 2.686 2.686 2.503-2.506zm21.314 21.314-2.495 2.503 2.686 2.686 2.506-2.503zM7.878 16.121l-2.503 2.504L12 25.253v-5.012zM27.756 36h-5.009l6.628 6.625 2.503-2.503z" clipRule="evenodd" />
            </svg>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} Raycast Technologies Inc.
            </span>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="https://twitter.com/raycast" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", transition: "color 150ms ease", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://github.com/raycast" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", transition: "color 150ms ease", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <a href="https://www.youtube.com/@raycastapp" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", transition: "color 150ms ease", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"}>
              <svg width="15" height="11" viewBox="0 0 24 17" fill="currentColor"><path d="M23.495 2.205a3.02 3.02 0 0 0-2.122-2.124C19.505 0 12 0 12 0S4.495 0 2.627.081a3.02 3.02 0 0 0-2.122 2.124C0 4.073 0 8 0 8s0 3.927.505 5.795a3.02 3.02 0 0 0 2.122 2.124C4.495 16 12 16 12 16s7.505 0 9.373-.081a3.02 3.02 0 0 0 2.122-2.124C24 11.927 24 8 24 8s0-3.927-.505-5.795zM9.545 11.568V4.432L15.818 8l-6.273 3.568z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
