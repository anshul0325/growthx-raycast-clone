"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const SOCIAL_CARD_STYLE = {
  display: "flex" as const,
  flexDirection: "column" as const,
  gap: "16px",
  padding: "24px",
  borderRadius: "12px",
  border: "0.8px solid rgba(255,255,255,0.06)",
  background: "linear-gradient(137deg, rgba(17,18,20,0.75) 4.87%, rgba(12,13,15,0.9) 75.88%)",
  textDecoration: "none",
  cursor: "pointer",
  transition: "border-color 200ms ease, background 200ms ease",
};

const VIDEOS = [
  { id: "NZwqx_dS-k0", title: "Introducing Raycast Focus" },
  { id: "W9FPWzorLyI", title: "Mastering Quicklinks in Raycast" },
  { id: "6knS3y39f7k", title: "Raycast Notes is Finally Out" },
  { id: "A4bewhG4724", title: "We Tested Apple's New Window Management Against Raycast" },
  { id: "yR2hnn7Ghko", title: "You MUST change these Raycast settings ⚙️" },
  { id: "NuIpZoQwuVY", title: "101 Things You Can Do With Raycast" },
  { id: "qobDloop1bg", title: "7 more Raycast tricks to level up your productivity" },
  { id: "HDQIvbLCF7Y", title: "Kitze shows Pedro his Raycast setup in Barcelona" },
  { id: "_DxukQdW1yg", title: "12 months of Raycast Pro 🎉" },
  { id: "m5MDv9qwhU8", title: "Max Stoiber Owns His Workflow with Raycast" },
  { id: "4Hi21ZpdrOc", title: "Introducing Raycast AI Presets" },
  { id: "_P1b00n12PU", title: "All About Raycast Snippets: Stop Repeating Yourself!" },
  { id: "RFwumqHLc8Y", title: "Introducing a revamped AI Chat" },
  { id: "OHuLnaY7Nxs", title: "He's a Raycast newbie. What can he do?" },
  { id: "Xc262WTsZoU", title: "How we built the best emoji picker 🤖" },
  { id: "UUPStiOLKlU", title: "What's in Wes Bos's Raycast" },
  { id: "9KvmDCy23g0", title: "9 hidden Raycast tricks to up your game" },
  { id: "oy8jtxl7c2I", title: "Our Extension Picks for UI Developers" },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75" />
    </svg>
  );
}

export default function CommunitySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3200);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section style={{ padding: "120px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1204px", margin: "0 auto", padding: "0 24px" }}>

        {/* Social cards grid: title + 2 cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "40px",
          rowGap: "56px",
          marginBottom: "80px",
        }}>
          {/* Section title — spans both columns */}
          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, color: "white", letterSpacing: "-0.01em", lineHeight: 1.4 }}>
              Stay in the loop.
            </h2>
            <p style={{ fontSize: "20px", fontWeight: 400, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.01em" }}>
              Join the community and learn how other people get the most out of Raycast.
            </p>
          </div>

          {/* Slack */}
          <a
            href="https://raycast.com/community"
            target="_blank"
            rel="noreferrer"
            style={SOCIAL_CARD_STYLE}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.12)";
              el.style.background = "linear-gradient(137deg, rgba(22,24,28,0.85) 4.87%, rgba(16,18,22,0.95) 75.88%)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.06)";
              el.style.background = "";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M5.04761 15.3667C5.04761 16.7572 3.92382 17.8811 2.53332 17.8811C1.14282 17.8811 0.019043 16.7572 0.019043 15.3667C0.019043 13.9763 1.14282 12.8525 2.53342 12.8525H5.04751V15.3668L5.04761 15.3667ZM6.30479 15.3667C6.30479 13.9763 7.42857 12.8525 8.81907 12.8525C10.2096 12.8525 11.3334 13.9763 11.3334 15.3668V21.6525C11.3334 23.043 10.2096 24.1669 8.81898 24.1669C7.42867 24.1669 6.30479 23.043 6.30479 21.6525V15.3667Z" fill="#E01E5A"/>
                <path d="M8.81906 5.27173C7.42856 5.27173 6.30469 4.14795 6.30469 2.75745C6.30469 1.36695 7.42866 0.243164 8.81906 0.243164C10.2095 0.243164 11.3333 1.36695 11.3333 2.75745V5.27182H8.81897L8.81906 5.27173ZM8.81906 6.54795C10.2096 6.54795 11.3333 7.67173 11.3333 9.06223C11.3333 10.4527 10.2096 11.5765 8.81897 11.5765H2.51437C1.12378 11.5765 0 10.4527 0 9.06213C0 7.67182 1.12378 6.54795 2.51428 6.54795H8.81906Z" fill="#36C5F0"/>
                <path d="M19.0358 9.06223C19.0358 7.67173 20.1595 6.54785 21.5499 6.54785C22.9404 6.54785 24.0643 7.67173 24.0643 9.06223C24.0643 10.4527 22.9404 11.5765 21.5499 11.5765H19.0358V9.06223ZM17.7786 9.06223C17.7786 10.4527 16.6547 11.5765 15.2642 11.5765C13.8738 11.5765 12.75 10.4527 12.75 9.06213V2.75754C12.75 1.36695 13.8738 0.243164 15.2642 0.243164C16.6546 0.243164 17.7785 1.36695 17.7785 2.75745V9.06213L17.7786 9.06223Z" fill="#2EB67D"/>
                <path d="M15.1236 19.1383C16.5141 19.1383 17.6379 20.2621 17.6379 21.6525C17.6379 23.043 16.5141 24.1669 15.1236 24.1669C13.7332 24.1669 12.6094 23.043 12.6094 21.6525V19.1383H15.1236ZM15.1236 17.8811C13.7332 17.8811 12.6094 16.7572 12.6094 15.3667C12.6094 13.9763 13.7332 12.8525 15.1237 12.8525H21.4283C22.8188 12.8525 23.9427 13.9763 23.9427 15.3668C23.9427 16.7572 22.8188 17.8811 21.4283 17.8811H15.1236Z" fill="#ECB22E"/>
              </svg>
              <h5 style={{ fontSize: "16px", fontWeight: 600, color: "white", margin: 0 }}>Slack</h5>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginLeft: "2px" }}>32k members</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
              Get the inside track on new features and learn how other people use Raycast.
            </p>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginTop: "auto" }}>
              Join <ArrowIcon />
            </span>
          </a>

          {/* X/Twitter */}
          <a
            href="https://twitter.com/raycast"
            target="_blank"
            rel="noreferrer"
            style={SOCIAL_CARD_STYLE}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.12)";
              el.style.background = "linear-gradient(137deg, rgba(22,24,28,0.85) 4.87%, rgba(16,18,22,0.95) 75.88%)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.06)";
              el.style.background = "";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M18.901 1.396H22.581L14.541 10.586L24 23.089H16.594L10.794 15.505L4.156 23.089H0.474L9.074 13.259L0 1.397H7.594L12.837 8.329L18.901 1.396ZM17.61 20.887H19.649L6.486 3.483H4.298L17.61 20.887Z" fill="white"/>
              </svg>
              <h5 style={{ fontSize: "16px", fontWeight: 600, color: "white", margin: 0 }}>X/Twitter</h5>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginLeft: "2px" }}>80k followers</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
              Keep up to date with the latest releases, features and improvements.
            </p>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginTop: "auto" }}>
              Follow <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      {/* YouTube carousel — full bleed */}
      <div style={{ marginBottom: "40px" }}>
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "12px", paddingLeft: "24px" }}>
            {VIDEOS.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                style={{ flexShrink: 0, textDecoration: "none" }}
                onMouseEnter={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                  const overlay = (e.currentTarget as HTMLElement).querySelector('.yt-play-overlay') as HTMLElement;
                  if (overlay) overlay.style.background = 'rgba(0,0,0,0.35)';
                  const btn = (e.currentTarget as HTMLElement).querySelector('.yt-play-btn') as HTMLElement;
                  if (btn) { btn.style.background = 'rgba(255,255,255,0.25)'; btn.style.opacity = '1'; }
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector('img');
                  if (img) img.style.transform = '';
                  const overlay = (e.currentTarget as HTMLElement).querySelector('.yt-play-overlay') as HTMLElement;
                  if (overlay) overlay.style.background = 'rgba(0,0,0,0)';
                  const btn = (e.currentTarget as HTMLElement).querySelector('.yt-play-btn') as HTMLElement;
                  if (btn) { btn.style.background = 'rgba(255,255,255,0)'; btn.style.opacity = '0'; }
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
              >
                <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px", width: "230px", height: "129px" }}>
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    width={230}
                    height={129}
                    style={{
                      display: "block",
                      width: "230px",
                      height: "129px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      transition: "transform 200ms ease",
                    }}
                  />
                  <div className="yt-play-overlay" style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0)",
                    transition: "background 200ms ease",
                    borderRadius: "12px",
                  }}>
                    <div className="yt-play-btn" style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 200ms ease, opacity 200ms ease",
                      opacity: 0,
                    }}>
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                        <path d="M0 0L12 7L0 14V0Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  marginTop: "8px",
                  maxWidth: "230px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.4,
                }}>
                  {video.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{ maxWidth: "360px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", marginBottom: "16px", lineHeight: 1.5 }}>
            Check out our YouTube channel to learn about features you didn&apos;t even know existed.
          </p>
          <a
            href="https://www.youtube.com/@raycastapp"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", transition: "opacity 150ms ease" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.75"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
          {/* YouTube wordmark SVG */}
          <svg width="96" height="22" viewBox="0 0 108 25" fill="none">
            <g clipPath="url(#yt-clip)">
              <path d="M34.009 3.953a4.513 4.513 0 0 0-3.173-3.173C28.36.243 17.739.243 17.739.243s-10.622.022-13.26.738a4.513 4.513 0 0 0-3.17 3.174C.67 8.638.361 15.746 1.491 20.224a4.513 4.513 0 0 0 3.173 3.173c2.64.716 13.26.716 13.26.716s10.622 0 13.26-.716a4.513 4.513 0 0 0 3.173-3.173c.8-4.665 1.11-11.772-.02-16.27l.672-.001Z" fill="red"/>
              <path d="m14.554 17.379 8.838-5.136-8.838-5.136v10.272Z" fill="white"/>
            </g>
            <path d="M44.708 16.47c-.526-.356-.902-.897-1.121-1.624-.22-.727-.33-1.704-.33-2.93v-1.661c0-1.237.123-2.226.37-2.968.247-.741.638-1.288 1.173-1.64.535-.35 1.232-.527 2.09-.527.847 0 1.532.179 2.054.535.523.357.908.904 1.154 1.64.247.737.37 1.724.37 2.96v1.661c0 1.226-.115 2.204-.344 2.93-.23.727-.614 1.268-1.154 1.624-.54.356-1.238.534-2.094.534-.877 0-1.582-.178-2.168-.534Zm2.904-1.624c.147-.39.22-1.028.22-1.915v-3.83c0-.857-.073-1.488-.22-1.893-.148-.405-.398-.607-.75-.607-.343 0-.588.202-.732.607-.144.405-.216 1.036-.216 1.893v3.83c0 .887.071 1.526.211 1.915.14.39.387.585.737.585.352 0 .602-.195.75-.585Z" fill="white" fillOpacity=".9"/>
            <path d="M59.344 18.813h-1.908l-.213-1.332h-.054c-.52.996-1.294 1.494-2.322 1.494-.714 0-1.239-.228-1.577-.683-.338-.456-.507-1.164-.507-2.126V9.34h2.44v6.634c0 .49.054.839.162 1.046.108.208.285.31.53.31.214 0 .42-.066.618-.198.199-.132.347-.305.446-.52V9.34h2.385v9.473Z" fill="white" fillOpacity=".9"/>
            <path d="M66.15 7.178H63.71V18.813h-2.385V7.178H58.888V5.024H66.15v2.154Z" fill="white" fillOpacity=".9"/>
            <path d="M70.918 18.813h-1.908l-.214-1.332h-.054c-.52.996-1.293 1.494-2.322 1.494-.713 0-1.239-.228-1.577-.683-.337-.456-.506-1.164-.506-2.126V9.34h2.44v6.634c0 .49.053.839.162 1.046.108.208.284.31.53.31.213 0 .42-.066.618-.198.198-.132.346-.305.445-.52V9.34h2.386v9.473Z" fill="white" fillOpacity=".9"/>
            <path d="M78.3 11.02c-.166-.73-.44-1.253-.822-1.566-.382-.314-.893-.47-1.533-.47-.497 0-.96.14-1.386.419-.427.28-.756.648-.988 1.106h-.018V4.6h-2.35v14.213h2.017l.248-1.009h.054c.21.37.515.657.913.862.399.205.843.307 1.333.307.876 0 1.524-.406 1.942-1.216.418-.811.627-2.077.627-3.799 0-1.49-.038-2.728-.038-2.938Zm-2.359 5.584c-.1.509-.32.764-.657.764-.196 0-.381-.054-.555-.162a1.358 1.358 0 0 1-.41-.432v-5.09c.084-.284.228-.514.431-.69.204-.176.42-.264.65-.264.316 0 .543.256.683.77.14.512.21 1.356.21 2.53 0 1.26-.05 2.065-.152 2.574Z" fill="white" fillOpacity=".9"/>
            <path d="M85.986 13.87H81.51v.952c0 .887.085 1.52.255 1.9.17.38.448.57.833.57.406 0 .681-.178.826-.535.144-.356.222-.952.233-1.786l2.116.125c.012.1.018.236.018.405 0 1.042-.285 1.826-.856 2.353-.57.527-1.384.79-2.444.79-1.264 0-2.152-.39-2.664-1.172-.513-.782-.77-2.003-.77-3.663v-1.979c0-1.709.267-2.95.801-3.723.535-.772 1.44-1.158 2.718-1.158 1.224 0 2.103.364 2.638 1.092.535.727.802 1.851.802 3.37v1.459Zm-4.476-4.024v.95h2.152v-.95c0-.86-.08-1.482-.242-1.866-.162-.384-.42-.576-.775-.576-.355 0-.619.195-.79.585-.17.39-.345 1.006-.345 1.857Z" fill="white" fillOpacity=".9"/>
            <defs><clipPath id="yt-clip"><rect width="35.478" height="24" fill="white" transform="translate(0 .243)"/></clipPath></defs>
          </svg>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
