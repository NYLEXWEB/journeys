"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  MessageSquare,
  Globe2,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Compass,
  ArrowUpRight,
  Clock,
  Sparkles,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Flame,
} from "lucide-react";

interface AnalyticsData {
  kpis: {
    totalVisitors: number;
    totalPageviews: number;
    totalClicks: number;
    conversions: number;
    conversionRate: number;
    bounceRate: number;
    avgSessionDuration: string;
  };
  timeline: Array<{
    date: string;
    visitors: number;
    pageviews: number;
  }>;
  topButtons: Array<{
    name: string;
    count: number;
    category: string;
    percent: number;
  }>;
  topReferrers: Array<{
    source: string;
    count: number;
    percent: number;
  }>;
  topPages: Array<{
    path: string;
    title: string;
    views: number;
    percent: number;
  }>;
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browsers: Array<{
    name: string;
    count: number;
    percent: number;
  }>;
  operatingSystems: Array<{
    name: string;
    percent: number;
  }>;
  topCountries: Array<{
    country: string;
    code?: string;
    flag: string;
    count: number;
    percent: number;
  }>;
  recentEvents: Array<{
    id: string;
    type: string;
    eventName: string;
    elementText: string;
    path: string;
    country: string;
    device: string;
    browser: string;
    timeAgo: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<"24h" | "7d" | "30d" | "all">("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/analytics/stats?range=${range}`);
      if (!res.ok) {
        throw new Error(`Failed to load analytics: HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error("Analytics fetch error:", err);
      setError(err?.message || "Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh every 30 seconds if enabled
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchStats]);

  const handleResetData = async () => {
    try {
      setIsResetting(true);
      const res = await fetch("/api/analytics/stats", { method: "DELETE" });
      if (res.ok) {
        setShowResetModal(false);
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to reset:", err);
    } finally {
      setIsResetting(false);
    }
  };

  // SVG Line Chart Calculation
  const timeline = data?.timeline || [];
  const maxVal = Math.max(
    ...timeline.map((t) => Math.max(t.visitors, t.pageviews)),
    10
  );
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  const pointsPageviews = timeline.map((item, idx) => {
    const x = paddingX + (idx / Math.max(timeline.length - 1, 1)) * plotWidth;
    const y = svgHeight - paddingY - (item.pageviews / maxVal) * plotHeight;
    return { x, y, ...item };
  });

  const pointsVisitors = timeline.map((item, idx) => {
    const x = paddingX + (idx / Math.max(timeline.length - 1, 1)) * plotWidth;
    const y = svgHeight - paddingY - (item.visitors / maxVal) * plotHeight;
    return { x, y, ...item };
  });

  const pathPageviews =
    pointsPageviews.length > 0
      ? `M ${pointsPageviews.map((p) => `${p.x},${p.y}`).join(" L ")}`
      : "";

  const areaPageviews =
    pointsPageviews.length > 0
      ? `${pathPageviews} L ${pointsPageviews[pointsPageviews.length - 1].x},${
          svgHeight - paddingY
        } L ${pointsPageviews[0].x},${svgHeight - paddingY} Z`
      : "";

  const pathVisitors =
    pointsVisitors.length > 0
      ? `M ${pointsVisitors.map((p) => `${p.x},${p.y}`).join(" L ")}`
      : "";

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E9E0D2] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800">
              Live Native Analytics Engine
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#183D2B] mt-1">
            Visitor &amp; Conversion Analytics
          </h2>
          <p className="text-xs text-[#242424]/70 mt-0.5">
            Real-time user engagement, button clicks, geographic locations, and conversion tracking.
          </p>
        </div>

        {/* Range Selector & Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time range pills */}
          <div className="inline-flex bg-[#FFFCF5] p-1 rounded-2xl border border-[#E9E0D2]">
            {(
              [
                { id: "24h", label: "24 Hours" },
                { id: "7d", label: "7 Days" },
                { id: "30d", label: "30 Days" },
                { id: "all", label: "All Time" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setRange(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  range === t.id
                    ? "bg-[#183D2B] text-white shadow-sm"
                    : "text-[#242424]/70 hover:text-[#183D2B] hover:bg-black/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Auto refresh toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-medium border transition-colors cursor-pointer ${
              autoRefresh
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
            title="Toggle 30s automatic refresh"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                autoRefresh ? "bg-emerald-500 animate-ping" : "bg-gray-400"
              }`}
            />
            <span>{autoRefresh ? "Live (30s)" : "Paused"}</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={fetchStats}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#FFFCF5] hover:bg-[#183D2B] text-[#183D2B] hover:text-white border border-[#E9E0D2] text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          {/* Reset option */}
          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-2xl text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Reset analytics test data"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Top 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Unique Visitors */}
        <div className="p-6 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm relative overflow-hidden group hover:border-[#183D2B] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E35]">
              Unique Visitors
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#183D2B]">
              {data?.kpis.totalVisitors.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> Unique
            </span>
          </div>
          <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
            Distinct visitors recorded across all devices
          </p>
        </div>

        {/* KPI 2: Total Page Views */}
        <div className="p-6 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm relative overflow-hidden group hover:border-[#183D2B] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E35]">
              Total Pageviews
            </span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-800">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#183D2B]">
              {data?.kpis.totalPageviews.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-[#242424]/60 font-medium">
              ~
              {(
                (data?.kpis.totalPageviews || 1) /
                (data?.kpis.totalVisitors || 1)
              ).toFixed(1)}{" "}
              / visitor
            </span>
          </div>
          <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
            Total screens &amp; luxury routes explored
          </p>
        </div>

        {/* KPI 3: Total Button Clicks */}
        <div className="p-6 rounded-3xl bg-white border border-[#E9E0D2] shadow-sm relative overflow-hidden group hover:border-[#183D2B] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E35]">
              Interactive Clicks
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#183D2B]">
              {data?.kpis.totalClicks.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-amber-800 font-semibold flex items-center">
              <Flame className="w-3.5 h-3.5 mr-0.5" /> High Engagement
            </span>
          </div>
          <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
            WhatsApp, CTAs, phone calls &amp; navigation
          </p>
        </div>

        {/* KPI 4: Conversions & Leads */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#183D2B] to-[#0E281C] text-white shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E9E0D2]">
              Direct Conversions
            </span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-[#E9E0D2]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-white">
              {data?.kpis.conversions.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">
              {data?.kpis.conversionRate}% Rate
            </span>
          </div>
          <p className="text-[11px] text-white/70 mt-1 font-light">
            WhatsApp concierge conversations &amp; leads
          </p>
        </div>
      </div>

      {/* 3. Interactive Traffic Timeline Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#183D2B]">
              Engagement &amp; Visitor Timeline
            </h3>
            <p className="text-xs text-[#242424]/60 font-light">
              Daily trend curve of Pageviews vs. Unique Visitors
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#183D2B]" />
              <span className="text-[#183D2B]">Unique Visitors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C49A58]" />
              <span className="text-[#8B5E35]">Pageviews</span>
            </div>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] h-[240px] relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pageviewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C49A58" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C49A58" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#183D2B" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#183D2B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = svgHeight - paddingY - pct * plotHeight;
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#E9E0D2"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 4}
                      fill="#8B5E35"
                      fontSize="9"
                      textAnchor="end"
                      fontWeight="500"
                    >
                      {Math.round(pct * maxVal)}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line: Pageviews */}
              <path d={areaPageviews} fill="url(#pageviewsGradient)" />
              <path
                d={pathPageviews}
                fill="none"
                stroke="#C49A58"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Area & Line: Visitors */}
              <path
                d={pathVisitors}
                fill="none"
                stroke="#183D2B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Plot Points & Dates */}
              {pointsVisitors.map((p, idx) => (
                <g key={idx}>
                  {/* Visitor circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredIndex === idx ? 6 : 4}
                    fill="#183D2B"
                    stroke="#FFFCF5"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />

                  {/* Date label on X axis */}
                  <text
                    x={p.x}
                    y={svgHeight - 8}
                    fill="#242424"
                    fillOpacity="0.6"
                    fontSize="10"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover Tooltip */}
            {hoveredIndex !== null && pointsVisitors[hoveredIndex] && (
              <div
                className="absolute z-30 -translate-x-1/2 bg-[#183D2B] text-white p-3 rounded-2xl shadow-xl pointer-events-none text-xs"
                style={{
                  left: `${(pointsVisitors[hoveredIndex].x / svgWidth) * 100}%`,
                  top: `${Math.max(
                    10,
                    (pointsVisitors[hoveredIndex].y / svgHeight) * 100 - 30
                  )}%`,
                }}
              >
                <div className="font-bold text-[#E9E0D2] mb-1">
                  {pointsVisitors[hoveredIndex].date}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-300 font-semibold">
                    {pointsVisitors[hoveredIndex].visitors} Visitors
                  </span>
                  <span className="text-[#E9E0D2]">
                    {pointsPageviews[hoveredIndex]?.pageviews} Pageviews
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Two-Column Deep Dive: Top Buttons & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Top Clicked Buttons & CTAs */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-[#8B5E35]" />
                <h3 className="text-lg font-serif font-bold text-[#183D2B]">
                  Most Clicked Buttons &amp; CTAs
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8B5E35] bg-[#8B5E35]/10 px-2.5 py-1 rounded-full">
                Ranked by volume
              </span>
            </div>
            <p className="text-xs text-[#242424]/60 font-light mb-6">
              Identifies which calls to action resonate most with visitors.
            </p>

            <div className="space-y-4">
              {(data?.topButtons || []).map((btn, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFFCF5] border border-[#E9E0D2] flex items-center justify-center font-bold text-[10px] text-[#183D2B]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[#183D2B] group-hover:text-[#8B5E35] transition-colors">
                        {btn.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-[#183D2B]">{btn.count} clicks</span>
                      <span className="text-[#242424]/50 text-[11px]">({btn.percent}%)</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#FFFCF5] border border-[#E9E0D2]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#183D2B] to-[#C49A58] transition-all duration-700"
                      style={{ width: `${Math.min(btn.percent * 2, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E9E0D2]/80 flex items-center justify-between text-xs text-[#242424]/60 font-light">
            <span>Total interactive actions logged</span>
            <span className="font-semibold text-[#183D2B] font-mono">
              {data?.kpis.totalClicks || 0} Total Clicks
            </span>
          </div>
        </div>

        {/* Card: Traffic Sources / Referrers */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#8B5E35]" />
                <h3 className="text-lg font-serif font-bold text-[#183D2B]">
                  Traffic Sources &amp; Referrers
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                Where guests come from
              </span>
            </div>
            <p className="text-xs text-[#242424]/60 font-light mb-6">
              Channels delivering travellers to Journeys by Jibu Thomas.
            </p>

            <div className="space-y-4">
              {(data?.topReferrers || []).map((ref, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#183D2B]">
                        {ref.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-[#183D2B]">{ref.count} visits</span>
                      <span className="text-[#242424]/50 text-[11px]">({ref.percent}%)</span>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#FFFCF5] border border-[#E9E0D2]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 transition-all duration-700"
                      style={{ width: `${Math.min(ref.percent * 1.8, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E9E0D2]/80 flex items-center justify-between text-xs text-[#242424]/60 font-light">
            <span>Direct &amp; Organic share</span>
            <span className="font-semibold text-emerald-800 font-mono">
              {data?.topReferrers?.[0]?.percent || 0}% Dominant
            </span>
          </div>
        </div>
      </div>

      {/* 5. Secondary Section: Top Visited Pages & Geographic Origin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Most Viewed Pages */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-[#8B5E35]" />
            <h3 className="text-lg font-serif font-bold text-[#183D2B]">
              Top Viewed Pages &amp; Itineraries
            </h3>
          </div>
          <p className="text-xs text-[#242424]/60 font-light mb-6">
            Most popular sections and itineraries visited on the website.
          </p>

          <div className="space-y-3">
            {(data?.topPages || []).map((page, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2]/70 flex items-center justify-between hover:border-[#183D2B] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#8B5E35] w-5 text-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#183D2B] block">
                      {page.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#242424]/50">
                      {page.path}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-[#183D2B]">
                    {page.views} views
                  </span>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-[#183D2B] hover:bg-black/5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Geographic Origin */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 className="w-5 h-5 text-[#8B5E35]" />
            <h3 className="text-lg font-serif font-bold text-[#183D2B]">
              Traveller Geographic Origins
            </h3>
          </div>
          <p className="text-xs text-[#242424]/60 font-light mb-6">
            Countries and international hubs where prospective guests visit from.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(data?.topCountries || []).map((country, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2]/70 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <span className="text-xs font-bold text-[#183D2B] block">
                      {country.country}
                    </span>
                    <span className="text-[10px] text-[#242424]/50">
                      {country.percent}% of visitors
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#8B5E35]">
                  {country.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Hardware & Platform Distribution */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm">
        <h3 className="text-lg font-serif font-bold text-[#183D2B] mb-2">
          Devices &amp; Platforms Distribution
        </h3>
        <p className="text-xs text-[#242424]/60 font-light mb-6">
          Device hardware, mobile responsiveness, and browser breakdown.
        </p>

        {/* Device Segmented Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <div className="flex items-center gap-2 text-emerald-800">
              <Smartphone className="w-4 h-4" />
              <span>Mobile ({data?.devices.mobile || 0}%)</span>
            </div>
            <div className="flex items-center gap-2 text-sky-800">
              <Monitor className="w-4 h-4" />
              <span>Desktop ({data?.devices.desktop || 0}%)</span>
            </div>
            <div className="flex items-center gap-2 text-amber-800">
              <Tablet className="w-4 h-4" />
              <span>Tablet ({data?.devices.tablet || 0}%)</span>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-100 flex overflow-hidden border border-[#E9E0D2]">
            <div
              className="bg-emerald-600 transition-all duration-700"
              style={{ width: `${data?.devices.mobile || 0}%` }}
              title="Mobile"
            />
            <div
              className="bg-sky-600 transition-all duration-700"
              style={{ width: `${data?.devices.desktop || 0}%` }}
              title="Desktop"
            />
            <div
              className="bg-amber-600 transition-all duration-700"
              style={{ width: `${data?.devices.tablet || 0}%` }}
              title="Tablet"
            />
          </div>
        </div>

        {/* Browsers & OS Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E9E0D2]/80">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B5E35] block mb-2">
              Top Browsers
            </span>
            <div className="flex flex-wrap gap-2">
              {(data?.browsers || []).map((b, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-xs font-semibold text-[#183D2B]"
                >
                  {b.name}: <span className="font-mono text-[#8B5E35]">{b.percent}%</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B5E35] block mb-2">
              Operating Systems
            </span>
            <div className="flex flex-wrap gap-2">
              {(data?.operatingSystems || []).map((o, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-[#FFFCF5] border border-[#E9E0D2] text-xs font-semibold text-[#183D2B]"
                >
                  {o.name}: <span className="font-mono text-emerald-800">{o.percent}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7. Live Real-Time Activity Log */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E0D2] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-lg font-serif font-bold text-[#183D2B]">
              Live Visitor Activity Stream
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            Last 15 events
          </span>
        </div>

        <div className="divide-y divide-[#E9E0D2]/60">
          {(data?.recentEvents || []).map((event) => (
            <div
              key={event.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#FFFCF5] px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    event.type === "conversion"
                      ? "bg-emerald-100 text-emerald-800"
                      : event.type === "lead"
                      ? "bg-purple-100 text-purple-800"
                      : event.type === "click"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {event.type}
                </span>

                <div>
                  <span className="text-xs font-semibold text-[#183D2B] block">
                    {event.elementText}
                  </span>
                  <span className="text-[10px] text-[#242424]/60 font-mono">
                    {event.path}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#242424]/70">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Globe2 className="w-3 h-3 text-[#8B5E35]" />
                  {event.country}
                </span>
                <span className="capitalize text-[11px] font-light bg-black/5 px-2 py-0.5 rounded-md">
                  {event.device} · {event.browser}
                </span>
                <span className="text-[11px] font-mono text-[#8B5E35]">
                  {event.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full border border-[#E9E0D2] shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Reset Analytics Data?</h3>
            </div>
            <p className="text-xs text-[#242424]/70">
              Are you sure you want to purge recorded analytics events? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#242424] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isResetting ? "Purging..." : "Confirm Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
