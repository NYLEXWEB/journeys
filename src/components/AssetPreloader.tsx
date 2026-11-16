"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRealtimeAssetLoader } from "@/hooks/useRealtimeAssetLoader";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  decay: number;
  rotation: number;
  spin: number;
}

export default function AssetPreloader() {
  const { progress: realProgress, isLoading, isComplete } = useRealtimeAssetLoader();

  // Visual animated percentage (0 to 100)
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isTakeoff, setIsTakeoff] = useState<boolean>(false);
  const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const planePosRef = useRef<{ x: number; y: number; prevX: number }>({ x: 0, y: 0, prevX: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Freeze background scrolling while preloading
  useEffect(() => {
    if (!hasFinished) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [hasFinished]);

  // Smooth progress interpolator: ensures silky, continuous progression even if network loads in chunks
  useEffect(() => {
    let currentVal = 0;
    const startTime = performance.now();
    // Minimum 2.2 seconds glide to appreciate the graceful flight animation
    const minGlideDuration = 2400;

    const updateInterval = () => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / minGlideDuration);

      // Target from both time pacing and actual real network asset loader
      const networkTarget = Math.round(realProgress * 100);
      const timeTarget = Math.round(timeRatio * 100);

      // We pace it gracefully so the flight has a steady, cinematic glide
      const combinedTarget = Math.max(timeTarget, networkTarget);

      // Step smoothly towards target
      if (currentVal < combinedTarget) {
        const step = Math.max(0.6, (combinedTarget - currentVal) * 0.12);
        currentVal = Math.min(100, currentVal + step);
        setDisplayProgress(currentVal);
      }

      if (currentVal < 100 || isLoading) {
        animFrameRef.current = requestAnimationFrame(updateInterval);
      } else {
        // Reached 100%
        setDisplayProgress(100);
        // Trigger takeoff acceleration burst
        setIsTakeoff(true);
        setTimeout(() => {
          setShouldFadeOut(true);
          setTimeout(() => {
            setHasFinished(true);
          }, 850);
        }, 500);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateInterval);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [realProgress, isLoading]);

  // Setup Canvas and 60FPS Smoke / Vapor / Pollution Cloud Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let loopId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Calculate flight track dimensions
      const isMobile = width < 640;
      const startX = width * (isMobile ? 0.08 : 0.15);
      const endX = width * (isMobile ? 0.92 : 0.85);
      const trackDistance = endX - startX;

      // Track altitude with a subtle upward slope (cruising altitude)
      const trackY = height * 0.48;

      // Current plane position based on percentage
      const frac = displayProgress / 100;
      let currentPlaneX = startX + trackDistance * frac;
      let currentPlaneY = trackY;

      // Takeoff burst: fly off to the right beyond the screen
      if (isTakeoff) {
        currentPlaneX += (width * 0.35) * (frac);
        currentPlaneY -= (height * 0.15) * (frac);
      }

      planePosRef.current = {
        x: currentPlaneX,
        y: currentPlaneY,
        prevX: planePosRef.current.x,
      };

      // 1. Draw Flight Waypoint Trajectory (Dashed Guide Line)
      ctx.save();
      ctx.strokeStyle = "rgba(233, 224, 210, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(startX, trackY);
      ctx.lineTo(endX, trackY);
      ctx.stroke();

      // Start & End Waypoint Nodes
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(200, 168, 118, 0.3)";
      ctx.beginPath();
      ctx.arc(startX, trackY, 3, 0, Math.PI * 2);
      ctx.arc(endX, trackY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Spawn Smoke / Contrail / Vapor Puff Particles at Jet Engine Exhaust
      // Engine nozzle is located slightly behind the plane's center
      const nozzleX = currentPlaneX - 28;
      const nozzleY = currentPlaneY + 5;

      // Spawn particles when moving
      if (displayProgress > 0 && displayProgress < 100 && Math.random() < 0.85) {
        const puffCount = isTakeoff ? 3 : 2;
        for (let i = 0; i < puffCount; i++) {
          particlesRef.current.push({
            x: nozzleX + (Math.random() - 0.5) * 4,
            y: nozzleY + (Math.random() - 0.5) * 4,
            vx: -0.9 - Math.random() * 1.5,
            vy: (Math.random() - 0.5) * 0.6,
            radius: 5 + Math.random() * 4,
            maxRadius: 24 + Math.random() * 18,
            opacity: 0.75 + Math.random() * 0.2,
            decay: 0.009 + Math.random() * 0.008,
            rotation: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.02,
          });
        }
      }

      // 3. Render and Update Smoke / Pollution Clouds
      ctx.save();
      const aliveParticles: SmokeParticle[] = [];

      for (const p of particlesRef.current) {
        // Expand puff into billowing cloud
        p.radius += (p.maxRadius - p.radius) * 0.05;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.decay;
        p.rotation += p.spin;

        if (p.opacity > 0.01 && p.radius > 1) {
          aliveParticles.push(p);

          // Realistic condensed vapor cloud with feather-soft radial gradient
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            p.radius * 0.1,
            p.x,
            p.y,
            p.radius
          );

          // Warm champagne smoke puff core fading into ambient air
          grad.addColorStop(0, `rgba(255, 250, 240, ${p.opacity * 0.7})`);
          grad.addColorStop(0.35, `rgba(230, 218, 198, ${p.opacity * 0.45})`);
          grad.addColorStop(0.7, `rgba(180, 168, 150, ${p.opacity * 0.18})`);
          grad.addColorStop(1, "rgba(140, 130, 115, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      particlesRef.current = aliveParticles;
      ctx.restore();

      // 4. Draw Luminous Jet Stream Trail Linking Start to Plane
      ctx.save();
      const trailGrad = ctx.createLinearGradient(startX, trackY, currentPlaneX, trackY);
      trailGrad.addColorStop(0, "rgba(200, 168, 118, 0)");
      trailGrad.addColorStop(0.6, "rgba(233, 224, 210, 0.25)");
      trailGrad.addColorStop(1, "rgba(255, 252, 245, 0.75)");

      ctx.strokeStyle = trailGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, trackY);
      ctx.lineTo(currentPlaneX - 20, trackY);
      ctx.stroke();
      ctx.restore();

      loopId = requestAnimationFrame(render);
    };

    loopId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(loopId);
    };
  }, [displayProgress, isTakeoff]);

  if (hasFinished) return null;

  // Calculate percentage integer
  const pctInt = Math.min(100, Math.max(0, Math.round(displayProgress)));

  return (
    <AnimatePresence>
      {!shouldFadeOut && (
        <motion.div
          key="luxury-flight-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between overflow-hidden select-none bg-[#091510]"
          style={{ width: "100vw", height: "100vh" }}
          aria-live="polite"
          aria-busy={true}
        >
          {/* Deep Luxury Atmospheric Sky Gradient */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#07130D] via-[#0E2218] to-[#08160F]" />

          {/* Warm Celestial Radial Ambient Glow */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(200,168,118,0.08)_0%,transparent_65%)] pointer-events-none" />

          {/* Faint Distant Starlight / High-Altitude Particles */}
          <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#FAF6EF_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

          {/* Canvas for Smoke Clouds & Flight Trajectory Path */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 w-full h-full pointer-events-none"
          />

          {/* Top Subtle Spacing */}
          <div className="relative z-20 pt-12 sm:pt-16 text-center">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-[#C8A876]/80 font-medium">
              Journeys Atelier
            </span>
          </div>

          {/* Center Flight Stage with Airplane and Moving Percentage */}
          <div className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center">
            {/* The Animated Airplane Flying Along The Progress Track */}
            <div className="relative w-full h-32 flex items-center">
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `calc(15% + ${displayProgress * 0.7}% - 34px)`,
                  top: "calc(50% - 20px)",
                }}
                animate={
                  isTakeoff
                    ? {
                        x: 240,
                        y: -80,
                        rotate: 14,
                        scale: 1.15,
                        transition: { duration: 0.8, ease: "easeIn" },
                      }
                    : {
                        y: [-2, 2, -2],
                        rotate: [3.5, 4.5, 3.5],
                        transition: {
                          repeat: Infinity,
                          duration: 2.8,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                {/* Ultra-Refined Luxury Jet SVG */}
                <svg
                  width="72"
                  height="44"
                  viewBox="0 0 72 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                >
                  {/* Engine Thrust / Afterburner Glow */}
                  <ellipse
                    cx="18"
                    cy="25"
                    rx="4.5"
                    ry="2.5"
                    fill="url(#thrustGlow)"
                    opacity="0.9"
                  />

                  {/* Underwing Jet Engine */}
                  <rect
                    x="19"
                    y="23"
                    width="14"
                    height="5.5"
                    rx="2.5"
                    fill="#1C382B"
                    stroke="#C8A876"
                    strokeWidth="0.8"
                  />
                  {/* Engine Intake */}
                  <ellipse cx="32" cy="25.8" rx="1.5" ry="2.4" fill="#C8A876" />

                  {/* Main Aerodynamic Swept Wing */}
                  <path
                    d="M32 20 L16 32 C15 32.8 13.5 32.5 14 31 L24 20 Z"
                    fill="url(#wingGradient)"
                    stroke="#E9E0D2"
                    strokeWidth="0.75"
                  />
                  {/* Wingtip Navigation Strobe Light */}
                  <circle cx="15" cy="31.8" r="1.5" fill="#4ADE80" className="animate-pulse" />

                  {/* Main Fuselage Body */}
                  <path
                    d="M68 20 C64 18 52 16 36 16 C22 16 8 18 4 19 C2 19.5 2 21 4 21.5 C10 22.5 24 24 40 24 C56 24 64 22 68 20 Z"
                    fill="url(#fuselageGradient)"
                    stroke="#FAF6EF"
                    strokeWidth="0.8"
                  />

                  {/* Cockpit Tinted Windshield Visor */}
                  <path
                    d="M58 18.5 C55 17.5 50 17.5 48 18.2 L52 19.8 C54.5 19.8 56.5 19.2 58 18.5 Z"
                    fill="#0A1811"
                  />

                  {/* Swept Vertical Stabilizer Tail Fin */}
                  <path
                    d="M14 17.5 L4 5 C3 4 1.8 4.5 2.5 6 L7 18 Z"
                    fill="url(#tailGradient)"
                    stroke="#C8A876"
                    strokeWidth="0.75"
                  />

                  {/* Subtle Luxury Gold Pinstripe Accent */}
                  <path
                    d="M20 20 L58 20"
                    stroke="#C8A876"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* SVG Gradients */}
                  <defs>
                    <linearGradient id="fuselageGradient" x1="4" y1="16" x2="68" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FAF6EF" />
                      <stop offset="0.6" stopColor="#E9E0D2" />
                      <stop offset="1" stopColor="#FFFFFF" />
                    </linearGradient>

                    <linearGradient id="wingGradient" x1="14" y1="20" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D9CEBE" />
                      <stop offset="1" stopColor="#FAF6EF" />
                    </linearGradient>

                    <linearGradient id="tailGradient" x1="2" y1="4" x2="14" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C8A876" />
                      <stop offset="1" stopColor="#FAF6EF" />
                    </linearGradient>

                    <radialGradient id="thrustGlow" cx="50%" cy="50%" r="50%">
                      <stop stopColor="#FDE047" />
                      <stop offset="0.6" stopColor="#FB923C" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#EA580C" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            {/* Clean, Minimalist Percentage Display */}
            <div className="flex flex-col items-center justify-center mt-6 sm:mt-8">
              <div className="flex items-baseline gap-1.5 font-serif text-[#FFFCF5] tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                <span className="text-5xl sm:text-7xl font-light tabular-nums leading-none">
                  {pctInt}
                </span>
                <span className="text-2xl sm:text-3xl text-[#C8A876] font-light leading-none">
                  %
                </span>
              </div>

              {/* Minimalist Micro Flight Status Tagline */}
              <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#E9E0D2]/70 font-light font-sans">
                {pctInt < 100 ? "In Flight • Curating Journeys" : "Landing at Sanctuary"}
              </p>
            </div>
          </div>

          {/* Bottom Elegant Progress Track Line Indicator */}
          <div className="relative z-20 pb-12 sm:pb-16 w-full max-w-xs mx-auto px-6">
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C8A876] via-[#FAF6EF] to-[#C8A876] rounded-full shadow-[0_0_8px_rgba(250,246,239,0.8)]"
                style={{ width: `${pctInt}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
