"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  User,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  Save,
  Compass,
  MapPin,
  Waves,
  Star,
  Phone,
  LayoutTemplate,
  X,
  Share2,
} from "lucide-react";

type ActiveTab =
  | "hero"
  | "destinations"
  | "experiences"
  | "journeys"
  | "reviews"
  | "contact"
  | "footer";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>("destinations");
  const [content, setContent] = useState<any>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Notification Toast state
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    type: "destination" | "experience" | "journey" | "review";
    id: string;
    title: string;
  } | null>(null);

  // Modal edit/create forms
  const [editModal, setEditModal] = useState<{
    section: "destination" | "experience" | "journey" | "review" | "hero";
    isNew: boolean;
    data: any;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check current session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch all content
  const loadContent = useCallback(async () => {
    setIsLoadingContent(true);
    try {
      const res = await fetch("/api/content/all");
      const data = await res.json();
      setContent(data);
    } catch {
      showToast("Failed to load website content from database.", "error");
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated, loadContent]);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed. Check your credentials.");
        return;
      }

      setIsAuthenticated(true);
      showToast("Welcome back, Administrator.");
      loadContent();
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setContent(null);
      showToast("Logged out successfully.");
    } catch {
      setIsAuthenticated(false);
    }
  };

  // Generic Save / Update Handler
  const handleSaveEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal) return;

    const { section, isNew, data } = editModal;
    let url = "";
    let method = isNew ? "POST" : "PUT";

    if (section === "destination") {
      url = isNew ? "/api/content/destinations" : `/api/content/destinations/${data.id}`;
    } else if (section === "experience") {
      url = isNew ? "/api/content/experiences" : `/api/content/experiences/${data.id}`;
    } else if (section === "journey") {
      url = isNew ? "/api/content/journeys" : `/api/content/journeys/${data.id}`;
    } else if (section === "review") {
      url = isNew ? "/api/content/reviews" : `/api/content/reviews/${data._id || data.id}`;
    } else if (section === "hero") {
      url = "/api/content/hero";
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        showToast(result.error || "Save failed. Please check input values.", "error");
        return;
      }

      showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} saved successfully!`);
      setEditModal(null);
      loadContent();
    } catch {
      showToast("Network error while saving data.", "error");
    }
  };

  // Delete Handler
  const confirmDelete = async () => {
    if (!deleteModal) return;
    const { type, id } = deleteModal;
    let url = "";

    if (type === "destination") url = `/api/content/destinations/${id}`;
    if (type === "experience") url = `/api/content/experiences/${id}`;
    if (type === "journey") url = `/api/content/journeys/${id}`;
    if (type === "review") url = `/api/content/reviews/${id}`;

    try {
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed to delete item.", "error");
        return;
      }

      showToast("Item deleted successfully.");
      setDeleteModal(null);
      loadContent();
    } catch {
      showToast("Network error while deleting item.", "error");
    }
  };

  // Contact Info Save
  const handleSaveContact = async (contactData: any) => {
    try {
      const res = await fetch("/api/content/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!res.ok) {
        showToast("Failed to save contact information.", "error");
        return;
      }

      showToast("Contact details updated successfully!");
      loadContent();
    } catch {
      showToast("Network error while saving contact.", "error");
    }
  };

  // Footer & Social Save
  const handleSaveFooter = async (footerData: any) => {
    try {
      const res = await fetch("/api/content/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footerData),
      });

      if (!res.ok) {
        showToast("Failed to save footer information.", "error");
        return;
      }

      showToast("Footer and social links updated successfully!");
      loadContent();
    } catch {
      showToast("Network error while saving footer.", "error");
    }
  };

  // Predefined Curated Images for New Content
  const CURATED_IMAGES = [
    { label: "Munnar Highlands Tea Plantation", path: "/images/generated/tea-plantation-approach.jpg" },
    { label: "Alleppey Luxury Kettuvallam Houseboat", path: "/images/generated/houseboat-backwaters.jpg" },
    { label: "Fort Kochi Colonial Maritime Heritage", path: "/images/generated/fort-kochi-heritage.jpg" },
    { label: "Varkala Red Laterite Coastline", path: "/images/generated/coastal-varkala.jpg" },
    { label: "Wayanad Cardamom Rainforest & Spices", path: "/images/generated/spice-gardens.jpg" },
    { label: "Kumarakom Lakeside Luxury Resort", path: "/images/generated/luxury-resort-stay.jpg" },
    { label: "Periyar Wildlife Sanctuary", path: "/images/generated/hero-kerala.jpg" },
  ];

  // 1. Loading Initial Authentication Check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FFFCF5] flex items-center justify-center p-6 text-[#183D2B]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest font-semibold">Loading Journeys Atelier...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Professional Minimal Admin Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFCF5] flex flex-col justify-between p-6 sm:p-10 font-sans text-[#242424]">
        {/* Top Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="relative h-9 w-36">
            <Image
              src="/images/logo.png"
              alt="Journeys by Jibu Thomas"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-[#183D2B] font-semibold hover:text-[#8B5E35] flex items-center gap-1.5 transition-colors"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Login Box */}
        <div className="max-w-md w-full mx-auto my-12 bg-white rounded-3xl border border-[#E9E0D2] shadow-[0_20px_50px_rgba(24,61,43,0.06)] p-8 sm:p-10">
          <div className="space-y-2 mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183D2B]/5 text-[#183D2B] text-[11px] uppercase tracking-wider font-semibold">
              <Lock className="w-3 h-3" />
              <span>Admin Access &bull; Atelier Jibu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#183D2B]">
              Sign in to Dashboard
            </h1>
            <p className="text-xs text-[#242424]/70 font-light leading-relaxed">
              Manage live website content, destinations, experiences, and traveler reviews.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-3.5 pl-10 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm transition-all"
                />
                <User className="w-4 h-4 text-[#8B5E35] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pl-10 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] focus:ring-1 focus:ring-[#183D2B] outline-none text-sm transition-all"
                />
                <Lock className="w-4 h-4 text-[#8B5E35] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Sign in to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#242424]/50 font-light">
          &copy; 2026 Journeys by Jibu Thomas &bull; Boutique Destination Management System
        </div>
      </div>
    );
  }

  // 3. Authenticated: Professional Clean Admin Hub
  return (
    <div className="min-h-screen bg-[#FFFCF5] font-sans text-[#242424] flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-2.5 transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-300 ${
            toast.type === "success"
              ? "bg-[#183D2B] text-white border border-[#8B5E35]"
              : "bg-red-700 text-white"
          }`}
        >
          {toast.type === "success" ? <Check className="w-4 h-4 text-[#E9E0D2]" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#FFFCF5]/95 backdrop-blur-xl border-b border-[#E9E0D2] px-6 sm:px-10 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/jibu" className="flex items-center gap-2">
            <div className="relative h-8 w-32">
              <Image
                src="/images/logo.png"
                alt="Journeys"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-[#E9E0D2]" />
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest font-semibold text-[#8B5E35]">
            Content Management Hub
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E9E0D2] bg-white hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-medium transition-all shadow-sm"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-600 text-red-700 hover:text-white text-xs font-medium transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white rounded-3xl border border-[#E9E0D2] p-4 shadow-sm shrink-0 sticky top-24">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B5E35] px-3 pb-2 block border-b border-[#E9E0D2] mb-3">
            Website Sections
          </span>
          <nav className="space-y-1">
            {[
              { id: "destinations", label: "Destinations (16)", icon: MapPin },
              { id: "experiences", label: "Curated Experiences", icon: Waves },
              { id: "journeys", label: "Travel with Jibu", icon: Compass },
              { id: "reviews", label: "Google Reviews", icon: Star },
              { id: "hero", label: "Hero Headings", icon: LayoutTemplate },
              { id: "contact", label: "Contact & Concierge", icon: Phone },
              { id: "footer", label: "Footer & Social", icon: Share2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all text-left ${
                    isActive
                      ? "bg-[#183D2B] text-white shadow-md"
                      : "text-[#242424]/80 hover:bg-[#183D2B]/5 hover:text-[#183D2B]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#E9E0D2]" : "text-[#8B5E35]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full bg-white rounded-3xl border border-[#E9E0D2] p-6 sm:p-8 shadow-sm min-h-[600px]">
          {isLoadingContent ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-[#183D2B]">
              <div className="w-7 h-7 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin" />
              <span className="text-xs uppercase tracking-widest font-semibold">Synchronizing with MongoDB...</span>
            </div>
          ) : (
            <>
              {/* SECTION: DESTINATIONS */}
              {activeTab === "destinations" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Destinations Directory
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Add, edit, and organize all destinations displayed across Kerala, Tamil Nadu, and Karnataka.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "destination",
                          isNew: true,
                          data: {
                            name: "",
                            state: "Kerala",
                            region: "",
                            shortVibe: "",
                            overview: "",
                            highlights: ["", "", ""],
                            image: "/images/generated/tea-plantation-approach.jpg",
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Destination</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content?.destinations?.map((dest: any) => (
                      <div
                        key={dest.id}
                        className="p-5 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5]/50 hover:bg-[#FFFCF5] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#8B5E35]/10 text-[#8B5E35]">
                              {dest.state} &bull; {dest.region}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-[#183D2B]">{dest.name}</h3>
                          <p className="text-xs text-[#242424]/80 font-light line-clamp-2 leading-relaxed">
                            {dest.shortVibe}
                          </p>
                          <p className="text-xs text-[#242424]/60 font-light line-clamp-3 leading-relaxed">
                            {dest.overview}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E9E0D2] flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#242424]/50">
                            {dest.highlights?.length || 0} Highlights
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setEditModal({
                                  section: "destination",
                                  isNew: false,
                                  data: { ...dest },
                                })
                              }
                              className="p-1.5 rounded-lg text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors"
                              title="Edit Destination"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({
                                  type: "destination",
                                  id: dest.id,
                                  title: dest.name,
                                })
                              }
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Destination"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: EXPERIENCES */}
              {activeTab === "experiences" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Curated Cultural Experiences
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Manage all signature travel experiences, durations, locations, and narrative descriptions.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "experience",
                          isNew: true,
                          data: {
                            title: "",
                            idealDuration: "",
                            locations: "",
                            description: "",
                            highlights: ["", "", ""],
                            image: "/images/generated/houseboat-backwaters.jpg",
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content?.experiences?.map((exp: any) => (
                      <div
                        key={exp.id}
                        className="p-5 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5]/50 hover:bg-[#FFFCF5] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-[#183D2B]/10 text-[#183D2B]">
                              #{exp.number} &bull; {exp.idealDuration}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-[#183D2B]">{exp.title}</h3>
                          <span className="text-[11px] text-[#8B5E35] font-medium block">
                            {exp.locations}
                          </span>
                          <p className="text-xs text-[#242424]/75 font-light line-clamp-3 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E9E0D2] flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#242424]/50">
                            {exp.highlights?.length || 0} Key Highlights
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setEditModal({
                                  section: "experience",
                                  isNew: false,
                                  data: { ...exp },
                                })
                              }
                              className="p-1.5 rounded-lg text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors"
                              title="Edit Experience"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({
                                  type: "experience",
                                  id: exp.id,
                                  title: exp.title,
                                })
                              }
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Experience"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: TRAVEL WITH JIBU */}
              {activeTab === "journeys" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Signature Journeys & Routes
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Manage private curated itineraries, durations, routes, and signature stays.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "journey",
                          isNew: true,
                          data: {
                            title: "",
                            route: "",
                            duration: "",
                            shortVibe: "",
                            overview: "",
                            highlights: ["", "", ""],
                            image: "/images/generated/houseboat-backwaters.jpg",
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Journey</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content?.journeys?.map((j: any) => (
                      <div
                        key={j.id}
                        className="p-5 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5]/50 hover:bg-[#FFFCF5] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-[#8B5E35]/15 text-[#8B5E35] block w-fit">
                            #{j.number} &bull; {j.duration}
                          </span>
                          <h3 className="text-base font-serif font-bold text-[#183D2B]">{j.title}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-[#242424]/60 font-semibold block">
                            {j.route}
                          </span>
                          <p className="text-xs text-[#242424]/75 font-light line-clamp-3 leading-relaxed">
                            {j.overview}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E9E0D2] flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#242424]/50">
                            {j.highlights?.length || 0} Inclusions
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setEditModal({
                                  section: "journey",
                                  isNew: false,
                                  data: { ...j },
                                })
                              }
                              className="p-1.5 rounded-lg text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors"
                              title="Edit Journey"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({
                                  type: "journey",
                                  id: j.id,
                                  title: j.title,
                                })
                              }
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Journey"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: GOOGLE REVIEWS */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Google Reviews & Testimonials
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Add, edit, and maintain authentic client testimonials and owner replies.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "review",
                          isNew: true,
                          data: {
                            author: "",
                            location: "",
                            rating: 5,
                            relativeTime: "Recently",
                            tripType: "Bespoke Kerala Journey",
                            text: "",
                            ownerResponseDate: "Recently",
                            ownerResponseText: "",
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Review</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content?.reviews?.map((r: any) => (
                      <div
                        key={r._id || r.id}
                        className="p-5 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5]/50 hover:bg-[#FFFCF5] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-[#183D2B] text-sm">
                              {r.author}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {Array.from({ length: r.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-[11px] text-[#8B5E35] font-light block">
                            {r.location} &bull; {r.relativeTime}
                          </span>
                          <p className="text-xs text-[#242424]/80 font-light line-clamp-4 leading-relaxed">
                            &ldquo;{r.text}&rdquo;
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E9E0D2] flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() =>
                              setEditModal({
                                section: "review",
                                isNew: false,
                                data: { ...r },
                              })
                            }
                            className="p-1.5 rounded-lg text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors"
                            title="Edit Review"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({
                                type: "review",
                                id: r._id || r.id,
                                title: r.author,
                              })
                            }
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: HERO HEADINGS */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#E9E0D2]">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                      Hero Section Headings & Descriptions
                    </h2>
                    <p className="text-xs text-[#242424]/70 font-light">
                      Edit the animated words and descriptions for the 4 cinematic video slides.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {content?.heroSlides?.map((slide: any) => (
                      <div
                        key={slide.slideId}
                        className="p-5 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B5E35]">
                            Slide #{slide.slideId} &bull; {slide.location}
                          </span>
                          <h3 className="text-base font-bold text-[#183D2B]">
                            {slide.word} <span className="italic font-serif font-normal">{slide.subWord}</span>
                          </h3>
                          <p className="text-xs text-[#242424]/75 font-light max-w-xl">
                            {slide.description}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setEditModal({
                              section: "hero",
                              isNew: false,
                              data: { ...slide },
                            })
                          }
                          className="px-4 py-2 rounded-full border border-[#183D2B] text-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
                        >
                          Edit Slide
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: CONTACT & CONCIERGE */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#E9E0D2]">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                      Contact Details & WhatsApp Concierge
                    </h2>
                    <p className="text-xs text-[#242424]/70 font-light">
                      Manage phone numbers, email addresses, WhatsApp concierge numbers, and consultation copy.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      handleSaveContact({
                        whatsappNumber: formData.get("whatsappNumber"),
                        whatsappMessage: formData.get("whatsappMessage"),
                        phoneNumber: formData.get("phoneNumber"),
                        phoneDisplay: formData.get("phoneDisplay"),
                        email: formData.get("email"),
                        address: formData.get("address"),
                        conciergeTitle: formData.get("conciergeTitle"),
                        conciergeSubtitle: formData.get("conciergeSubtitle"),
                        conciergeNote: formData.get("conciergeNote"),
                      });
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        WhatsApp Number (e.g. 919447000000)
                      </label>
                      <input
                        name="whatsappNumber"
                        defaultValue={content?.contactInfo?.whatsappNumber || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Display Phone Number (e.g. +91 (0) 9447 000 000)
                      </label>
                      <input
                        name="phoneDisplay"
                        defaultValue={content?.contactInfo?.phoneDisplay || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Official Inquiry Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        defaultValue={content?.contactInfo?.email || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Kerala Atelier Address
                      </label>
                      <input
                        name="address"
                        defaultValue={content?.contactInfo?.address || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Default WhatsApp Message Preset
                      </label>
                      <input
                        name="whatsappMessage"
                        defaultValue={content?.contactInfo?.whatsappMessage || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Contact Details</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SECTION: FOOTER & SOCIAL LINKS */}
              {activeTab === "footer" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#E9E0D2]">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                      Footer Information & Social Media Links
                    </h2>
                    <p className="text-xs text-[#242424]/70 font-light">
                      Manage footer branding, company description, and social media links with active/disabled toggles.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);

                      const socialLinks = [
                        {
                          platform: "WhatsApp",
                          url: formData.get("social_whatsapp") as string,
                          active: formData.get("social_whatsapp_active") === "on",
                        },
                        {
                          platform: "Instagram",
                          url: formData.get("social_instagram") as string,
                          active: formData.get("social_instagram_active") === "on",
                        },
                        {
                          platform: "Facebook",
                          url: formData.get("social_facebook") as string,
                          active: formData.get("social_facebook_active") === "on",
                        },
                        {
                          platform: "YouTube",
                          url: formData.get("social_youtube") as string,
                          active: formData.get("social_youtube_active") === "on",
                        },
                      ];

                      handleSaveFooter({
                        brandName: formData.get("brandName"),
                        tagline: formData.get("tagline"),
                        atelierDescription: formData.get("atelierDescription"),
                        copyrightText: formData.get("copyrightText"),
                        socialLinks,
                      });
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                          Brand / Company Name
                        </label>
                        <input
                          name="brandName"
                          defaultValue={content?.footerContent?.brandName || "Journeys by Jibu Thomas"}
                          className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                          Tagline
                        </label>
                        <input
                          name="tagline"
                          defaultValue={content?.footerContent?.tagline || "South India, tailored around your pace."}
                          className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                          Atelier Description
                        </label>
                        <textarea
                          rows={2}
                          name="atelierDescription"
                          defaultValue={content?.footerContent?.atelierDescription || ""}
                          className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#E9E0D2]">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#183D2B]">
                        Social Media Channels
                      </h3>

                      {[
                        { platform: "WhatsApp", field: "social_whatsapp", defaultUrl: "https://wa.me/919447000000" },
                        { platform: "Instagram", field: "social_instagram", defaultUrl: "https://instagram.com" },
                        { platform: "Facebook", field: "social_facebook", defaultUrl: "https://facebook.com" },
                        { platform: "YouTube", field: "social_youtube", defaultUrl: "https://youtube.com" },
                      ].map((item) => {
                        const existingLink = content?.footerContent?.socialLinks?.find(
                          (s: any) => s.platform.toLowerCase() === item.platform.toLowerCase()
                        );
                        return (
                          <div key={item.platform} className="flex items-center gap-4">
                            <span className="w-24 text-xs font-semibold text-[#183D2B]">{item.platform}</span>
                            <input
                              name={item.field}
                              defaultValue={existingLink ? existingLink.url : item.defaultUrl}
                              placeholder="https://..."
                              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                            />
                            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#242424]/75 shrink-0">
                              <input
                                type="checkbox"
                                name={`${item.field}_active`}
                                defaultChecked={existingLink ? existingLink.active : true}
                                className="w-4 h-4 rounded text-[#183D2B] focus:ring-[#183D2B]"
                              />
                              <span>Active</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Footer &amp; Social Links</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* EDIT / CREATE MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E9E0D2] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setEditModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#242424]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#183D2B] mb-1">
              {editModal.isNew ? `Add New ${editModal.section}` : `Edit ${editModal.section}`}
            </h3>
            <p className="text-xs text-[#242424]/60 font-light mb-6">
              Fill in the textual content below. Changes reflect on the public website immediately after saving.
            </p>

            <form onSubmit={handleSaveEntity} className="space-y-4">
              {/* Destination Form Fields */}
              {editModal.section === "destination" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Destination Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.name || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, name: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        State *
                      </label>
                      <select
                        value={editModal.data.state || "Kerala"}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, state: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      >
                        <option value="Kerala">Kerala</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Geographic Region * (e.g. Western Ghats Highlands)
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.region || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, region: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Short Atmosphere Vibe * (1 line)
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.shortVibe || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, shortVibe: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Detailed Narrative Overview *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editModal.data.overview || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, overview: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Highlights (Separate with commas)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(editModal.data.highlights)
                          ? editModal.data.highlights.join(", ")
                          : editModal.data.highlights || ""
                      }
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: {
                            ...editModal.data,
                            highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Private Tea Estate Walks, Top Station Sunrise Vistas"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  {editModal.isNew && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Select Existing Image Asset
                      </label>
                      <select
                        value={editModal.data.image}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, image: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      >
                        {CURATED_IMAGES.map((img) => (
                          <option key={img.path} value={img.path}>
                            {img.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

              {/* Experience Form Fields */}
              {editModal.section === "experience" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Experience Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.title || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Ideal Duration * (e.g. 2 to 3 Nights)
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.idealDuration || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, idealDuration: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Locations * (e.g. Alleppey &bull; Kumarakom)
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.locations || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, locations: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Narrative Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editModal.data.description || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, description: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Highlights (Separate with commas)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(editModal.data.highlights)
                          ? editModal.data.highlights.join(", ")
                          : editModal.data.highlights || ""
                      }
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: {
                            ...editModal.data,
                            highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>
                </>
              )}

              {/* Journey Form Fields */}
              {editModal.section === "journey" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Journey Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.title || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Route * (e.g. KOCHI &bull; MUNNAR &bull; ALLEPPEY)
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.route || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, route: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Duration * (e.g. 10 Days &bull; 9 Nights)
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.duration || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, duration: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Short Atmosphere Vibe *
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.shortVibe || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, shortVibe: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Overview Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editModal.data.overview || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, overview: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>
                </>
              )}

              {/* Review Form Fields */}
              {editModal.section === "review" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.author || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, author: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Location * (e.g. Edinburgh, UK)
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.location || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, location: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Star Rating (1 to 5)
                      </label>
                      <select
                        value={editModal.data.rating || 5}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, rating: Number(e.target.value) },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      >
                        <option value={5}>5 Stars (Exceptional)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Relative Time (e.g. 2 weeks ago)
                      </label>
                      <input
                        type="text"
                        value={editModal.data.relativeTime || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, relativeTime: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Review Content *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={editModal.data.text || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, text: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Owner Response (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={editModal.data.ownerResponse?.text || editModal.data.ownerResponseText || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, ownerResponseText: e.target.value },
                        })
                      }
                      placeholder="Thank you for your kind feedback..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>
                </>
              )}

              {/* Hero Slide Form Fields */}
              {editModal.section === "hero" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Main Word *
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.data.word || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, word: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Italic Sub-Word
                      </label>
                      <input
                        type="text"
                        value={editModal.data.subWord || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, subWord: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={editModal.data.location || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, location: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Slide Description
                    </label>
                    <textarea
                      rows={2}
                      value={editModal.data.description || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, description: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E9E0D2]">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="px-4 py-2 rounded-full border border-[#E9E0D2] text-xs font-semibold text-[#242424]/70 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E9E0D2] max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-[#183D2B]">
                Delete {deleteModal.type}?
              </h3>
              <p className="text-xs text-[#242424]/70 font-light mt-1">
                Are you sure you want to remove &ldquo;{deleteModal.title}&rdquo;? This change will immediately be reflected on the live website.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 rounded-full border border-[#E9E0D2] text-xs font-semibold text-[#242424]/70 hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

