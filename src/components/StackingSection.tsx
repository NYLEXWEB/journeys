"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackingSectionProps {
  children: React.ReactNode;
  zIndex: number;
  isFirst?: boolean;
  isFooter?: boolean;
  disableOverlap?: boolean;
  disableScale?: boolean;
  className?: string;
}

export default function StackingSection({
  children,
  zIndex,
  isFirst = false,
  isFooter = false,
  disableOverlap = false,
  disableScale = false,
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
          ? "rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-[#E9E0D2] bg-[#FFFCF5]"
          : isFooter
          ? "-mt-10 sm:-mt-14 md:-mt-16 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-[#8B5E35]/40 bg-[#183D2B]"
          : disableOverlap
          ? "bg-[#FFFCF5]"
          : "-mt-10 sm:-mt-14 md:-mt-16 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-[#E9E0D2] bg-[#FFFCF5]"
      } ${className}`}
    >
      <motion.div
        style={isFooter || disableScale ? undefined : { scale, opacity }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}
