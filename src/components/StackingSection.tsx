"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackingSectionProps {
  children: React.ReactNode;
  zIndex: number;
  isFirst?: boolean;
  isFooter?: boolean;
  className?: string;
}

export default function StackingSection({
  children,
  zIndex,
  isFirst = false,
  isFooter = false,
  className = "",
}: StackingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scale-down & subtle depth dimming as the next section slides over this one
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.95, 0.85]);

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className={`relative origin-top ${
        isFirst
          ? "rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] shadow-[0_-30px_70px_rgba(24,61,43,0.22)] border-t border-[#E9E0D2] bg-[#FFFCF5]"
          : isFooter
          ? "-mt-10 sm:-mt-14 md:-mt-16 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.35)] border-t border-[#8B5E35]/40 bg-[#183D2B]"
          : "-mt-10 sm:-mt-14 md:-mt-16 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] shadow-[0_-25px_60px_rgba(24,61,43,0.18)] border-t border-[#E9E0D2] bg-[#FFFCF5]"
      } ${className}`}
    >
      <motion.div
        style={isFooter ? undefined : { scale, opacity }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}

