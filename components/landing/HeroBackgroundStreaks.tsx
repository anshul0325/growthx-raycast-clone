"use client";

import { motion } from "framer-motion";

/**
 * HeroBackground: Canvas-rendered diagonal beam background matching Raycast's live site.
 * Uses an SVG inside a div with overflow:hidden to create the diagonal beam effect.
 * SVG approach is reliable cross-browser and doesn't have the clipping issues of CSS transforms.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#07080a",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <svg
          viewBox="0 0 1536 862"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main beam gradient: bright center, dark edges */}
            <linearGradient id="beamA" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#07080a" stopOpacity="1" />
              <stop offset="30%" stopColor="#8b0000" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#c01818" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#8b0000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="beamB" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#07080a" stopOpacity="1" />
              <stop offset="20%" stopColor="#9a0a0a" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#d52828" stopOpacity="1" />
              <stop offset="80%" stopColor="#9a0a0a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="beamC" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#07080a" stopOpacity="1" />
              <stop offset="25%" stopColor="#880808" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#bf2020" stopOpacity="0.92" />
              <stop offset="75%" stopColor="#880808" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="beamD" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#07080a" stopOpacity="1" />
              <stop offset="30%" stopColor="#780606" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#aa1818" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#780606" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="beamE" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#07080a" stopOpacity="1" />
              <stop offset="35%" stopColor="#650404" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#951212" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#650404" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>

            {/* Glow filter for all beams */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="30" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/*
            Beams are parallelograms.
            We draw them as rotated rectangles.
            The "rotation" is achieved by using polygon/parallelogram shapes.
            A -35deg rotation means for each 100px of height, x shifts by -70px (tan(35deg) ≈ 0.7).
            
            Base coordinates for full height (1000px):
            For a parallelogram at x-center C, width W:
            Left edge:  (C - W/2, 0) to (C - W/2 - 700, 1000)
            Right edge: (C + W/2, 0) to (C + W/2 - 700, 1000)
            
            Beams are positioned in the right-center area of the viewport.
          */}

          {/* BEAM E (far left, faintest) */}
          <polygon
            points="450,0 530,0 -250,862 -330,862"
            fill="url(#beamE)"
            filter="url(#softGlow)"
            opacity="0.7"
          />

          {/* BEAM D */}
          <polygon
            points="620,0 720,0 -80,862 -180,862"
            fill="url(#beamD)"
            filter="url(#glow)"
            opacity="0.8"
          />

          {/* BEAM C */}
          <polygon
            points="820,0 960,0 120,862 -20,862"
            fill="url(#beamC)"
            filter="url(#glow)"
            opacity="0.9"
          />

          {/* BEAM B (widest, brightest, most prominent) */}
          <polygon
            points="1060,0 1240,0 360,862 180,862"
            fill="url(#beamB)"
            filter="url(#glow)"
            opacity="1"
          />

          {/* BEAM A (rightmost, slightly thinner) */}
          <polygon
            points="1310,0 1430,0 610,862 490,862"
            fill="url(#beamA)"
            filter="url(#softGlow)"
            opacity="0.85"
          />

          {/* Extra wide ambient glow layer (behind everything, very blurred) */}
          <polygon
            points="800,0 1500,0 100,862 -600,862"
            fill="#3d0000"
            opacity="0.25"
            filter="url(#softGlow)"
          />

          {/* Bottom fade overlay */}
          <defs>
            <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#07080a" stopOpacity="0" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1536" height="862" fill="url(#bottomFade)" />
        </svg>
      </motion.div>
    </div>
  );
}
