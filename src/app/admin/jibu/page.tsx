"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaUploaderWithPreview } from "@/components/admin/MediaUploaderWithPreview";
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
  Inbox,
  MessageSquare,
  RefreshCw,
  TrendingUp,
  BookOpen,
  Globe,
  FileText,
  Eye,
  Smartphone,
  Monitor,
  Upload,
  UserCheck,
  Bed,
  Sparkles,
  ShieldCheck,
  Heart,
  HelpCircle,
  LayoutDashboard,
  Menu,
  ChevronDown,
  Video,
  Film,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

type ActiveTab =
  | "dashboard"
  | "analytics"
  | "hero"
  | "about"
  | "destinations"
  | "experiences"
  | "journeys"
  | "services"
  | "journal"
  | "reviews"
  | "faq"
  | "enquiries"
  | "contact"
  | "footer";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [aboutStoryImage, setAboutStoryImage] = useState<string>("");
  const [aboutJibuImage, setAboutJibuImage] = useState<string>("");
  const [curtainVideo1, setCurtainVideo1] = useState<string>("");
  const [curtainVideo2, setCurtainVideo2] = useState<string>("");
  const [curtainImage, setCurtainImage] = useState<string>("");

  // Guest Enquiries state
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("all");

  // Notification Toast state
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    type: "destination" | "experience" | "journey" | "service" | "review" | "journal" | "faq";
    id: string;
    title: string;
  } | null>(null);

  // Modal edit/create forms
  const [editModal, setEditModal] = useState<{
    section: "destination" | "experience" | "journey" | "service" | "review" | "hero" | "journal" | "about" | "faq";
    isNew: boolean;
    data: any;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUploadImageFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onUploaded(data.url);
        showToast("Photo uploaded successfully!");
      } else {
        showToast(data.error || "Failed to upload photo.", "error");
      }
    } catch {
      showToast("Network error uploading photo.", "error");
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = "";
    }
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
      if (data?.about?.storyImage) setAboutStoryImage(data.about.storyImage);
      if (data?.about?.jibuImage) setAboutJibuImage(data.about.jibuImage);
      if (data?.about?.curtainVideo1) setCurtainVideo1(data.about.curtainVideo1);
      if (data?.about?.curtainVideo2) setCurtainVideo2(data.about.curtainVideo2);
      if (data?.about?.curtainImage) setCurtainImage(data.about.curtainImage);
    } catch {
      showToast("Failed to load website content from database.", "error");
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  // Fetch enquiries
  const loadEnquiries = useCallback(async (status = "all") => {
    setIsLoadingEnquiries(true);
    try {
      const res = await fetch(`/api/enquiries?status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      } else {
        showToast("Failed to fetch customer enquiries.", "error");
      }
    } catch {
      showToast("Network error while fetching enquiries.", "error");
    } finally {
      setIsLoadingEnquiries(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
      loadEnquiries();
    }
  }, [isAuthenticated, loadContent, loadEnquiries]);

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Enquiry marked as ${newStatus}`);
        loadEnquiries(enquiryStatusFilter);
      } else {
        showToast("Failed to update enquiry status", "error");
      }
    } catch {
      showToast("Network error updating enquiry", "error");
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this customer enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Enquiry deleted successfully");
        loadEnquiries(enquiryStatusFilter);
      } else {
        showToast("Failed to delete enquiry", "error");
      }
    } catch {
      showToast("Network error deleting enquiry", "error");
    }
  };

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

    if (["destination", "experience", "journey", "service", "journal"].includes(section) && !data.image) {
      showToast("Please upload a photo before saving.", "error");
      return;
    }
    let url = "";
    let method = isNew ? "POST" : "PUT";

    if (section === "destination") {
      url = isNew ? "/api/content/destinations" : `/api/content/destinations/${data.id}`;
    } else if (section === "experience") {
      url = isNew ? "/api/content/experiences" : `/api/content/experiences/${data.id}`;
    } else if (section === "journey") {
      url = isNew ? "/api/content/journeys" : `/api/content/journeys/${data.id}`;
    } else if (section === "service") {
      url = isNew ? "/api/content/services" : `/api/content/services/${data.id || data._id}`;
    } else if (section === "review") {
      url = isNew ? "/api/content/reviews" : `/api/content/reviews/${data._id || data.id}`;
    } else if (section === "journal") {
      url = isNew ? "/api/content/journal" : `/api/content/journal/${data.id || data._id}`;
    } else if (section === "faq") {
      url = isNew ? "/api/content/faq" : `/api/content/faq/${data.id || data._id}`;
    } else if (section === "about") {
      url = "/api/content/about";
      method = "PUT";
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
    if (type === "service") url = `/api/content/services/${id}`;
    if (type === "review") url = `/api/content/reviews/${id}`;
    if (type === "journal") url = `/api/content/journal/${id}`;
    if (type === "faq") url = `/api/content/faq/${id}`;

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
    { label: "Munnar Highlands Tea Plantation", path: "/images/generated/tea-plantation-approach.webp" },
    { label: "Alleppey Luxury Kettuvallam Houseboat", path: "/images/generated/houseboat-backwaters.webp" },
    { label: "Fort Kochi Colonial Maritime Heritage", path: "/images/generated/fort-kochi-heritage.webp" },
    { label: "Varkala Red Laterite Coastline", path: "/images/generated/coastal-varkala.webp" },
    { label: "Wayanad Cardamom Rainforest & Spices", path: "/images/generated/spice-gardens.webp" },
    { label: "Kumarakom Lakeside Luxury Resort", path: "/images/generated/luxury-resort-stay.webp" },
    { label: "Periyar Wildlife Sanctuary", path: "/images/generated/hero-kerala.webp" },
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
              src="/images/logo.webp"
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
                src="/images/logo.webp"
                alt="Journeys"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-[#E9E0D2]" />
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest font-semibold text-[#8B5E35]">
          Admin Panel
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
        {/* MOBILE SECTION SELECTOR (Visible on < md) */}
        <div className="md:hidden w-full bg-white rounded-2xl border border-[#E9E0D2] p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {(() => {
                const current = [
                  { id: "dashboard", label: "Operations Dashboard", icon: LayoutDashboard },
                  { id: "analytics", label: "Live Analytics & Visitors", icon: TrendingUp },
                  { id: "hero", label: "Hero Slideshow", icon: LayoutTemplate },
                  { id: "about", label: "About Atelier & Media", icon: UserCheck },
                  { id: "destinations", label: `Destinations (${content?.destinations?.length || 16})`, icon: MapPin },
                  { id: "experiences", label: `Experiences (${content?.experiences?.length || 8})`, icon: Waves },
                  { id: "journeys", label: `Signature Journeys (${content?.journeys?.length || 5})`, icon: Compass },
                  { id: "services", label: `Ways to Travel / Stays (${content?.services?.length || 5})`, icon: Bed },
                  { id: "journal", label: `Blog & Journal (${content?.journal?.length || 2})`, icon: BookOpen },
                  { id: "reviews", label: `Google Reviews (${content?.reviews?.length || 6})`, icon: Star },
                  { id: "faq", label: `FAQs (${content?.faqs?.length || 5})`, icon: HelpCircle },
                  {
                    id: "enquiries",
                    label: `Guest Enquiries (${enquiries.filter((e) => e.status === "new").length > 0 ? `${enquiries.filter((e) => e.status === "new").length} New` : enquiries.length})`,
                    icon: Inbox,
                  },
                  { id: "contact", label: "Contact & Concierge", icon: Phone },
                  { id: "footer", label: "Footer & Social", icon: Share2 },
                ].find((t) => t.id === activeTab) || { id: "dashboard", label: "Dashboard", icon: LayoutDashboard };
                const Icon = current.icon;
                return (
                  <>
                    <div className="w-8 h-8 rounded-xl bg-[#183D2B] text-white flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#E9E0D2]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold block">
                        Active Section
                      </span>
                      <span className="text-xs font-bold text-[#183D2B]">
                        {current.label}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9E0D2] bg-[#FFFCF5] text-xs font-semibold text-[#183D2B] hover:bg-[#183D2B]/5 transition-colors cursor-pointer"
            >
              <span>Sections</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileNavOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Mobile Dropdown Drawer */}
          {isMobileNavOpen && (
            <div className="mt-3 pt-3 border-t border-[#E9E0D2] grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {[
                { id: "dashboard", label: "Operations Dashboard", icon: LayoutDashboard },
                { id: "analytics", label: "Live Analytics & Visitors", icon: TrendingUp },
                { id: "hero", label: "Hero Slideshow", icon: LayoutTemplate },
                { id: "about", label: "About Atelier & Media", icon: UserCheck },
                { id: "destinations", label: `Destinations (${content?.destinations?.length || 16})`, icon: MapPin },
                { id: "experiences", label: `Experiences (${content?.experiences?.length || 8})`, icon: Waves },
                { id: "journeys", label: `Signature Journeys (${content?.journeys?.length || 5})`, icon: Compass },
                { id: "services", label: `Ways to Travel / Stays (${content?.services?.length || 5})`, icon: Bed },
                { id: "journal", label: `Blog & Journal (${content?.journal?.length || 2})`, icon: BookOpen },
                { id: "reviews", label: `Google Reviews (${content?.reviews?.length || 6})`, icon: Star },
                { id: "faq", label: `FAQs (${content?.faqs?.length || 5})`, icon: HelpCircle },
                {
                  id: "enquiries",
                  label: `Guest Enquiries (${enquiries.filter((e) => e.status === "new").length > 0 ? `${enquiries.filter((e) => e.status === "new").length} New` : enquiries.length})`,
                  icon: Inbox,
                },
                { id: "contact", label: "Contact & Concierge", icon: Phone },
                { id: "footer", label: "Footer & Social", icon: Share2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as ActiveTab);
                      setIsMobileNavOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? "bg-[#183D2B] text-white shadow-sm"
                        : "text-[#242424]/80 hover:bg-[#183D2B]/5 hover:text-[#183D2B]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#E9E0D2]" : "text-[#8B5E35]"}`} />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#E9E0D2]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* DESKTOP SIDEBAR (Visible on md+) */}
        <aside className="hidden md:block w-64 bg-white rounded-3xl border border-[#E9E0D2] p-4 shadow-sm shrink-0 md:sticky md:top-24">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B5E35] px-3 pb-2 block border-b border-[#E9E0D2] mb-3">
            Website Sections
          </span>
          <nav className="flex flex-col space-y-1">
            {[
              { id: "dashboard", label: "Operations Dashboard", icon: LayoutDashboard },
              { id: "analytics", label: "Live Analytics & Visitors", icon: TrendingUp },
              { id: "hero", label: "Hero Slideshow", icon: LayoutTemplate },
              { id: "about", label: "About Atelier & Media", icon: UserCheck },
              { id: "destinations", label: `Destinations (${content?.destinations?.length || 16})`, icon: MapPin },
              { id: "experiences", label: `Experiences (${content?.experiences?.length || 8})`, icon: Waves },
              { id: "journeys", label: `Signature Journeys (${content?.journeys?.length || 5})`, icon: Compass },
              { id: "services", label: `Ways to Travel / Stays (${content?.services?.length || 5})`, icon: Bed },
              { id: "journal", label: `Blog & Journal (${content?.journal?.length || 2})`, icon: BookOpen },
              { id: "reviews", label: `Google Reviews (${content?.reviews?.length || 6})`, icon: Star },
              { id: "faq", label: `FAQs (${content?.faqs?.length || 5})`, icon: HelpCircle },
              {
                id: "enquiries",
                label: `Guest Enquiries (${enquiries.filter((e) => e.status === "new").length > 0 ? `${enquiries.filter((e) => e.status === "new").length} New` : enquiries.length})`,
                icon: Inbox,
              },
              { id: "contact", label: "Contact & Concierge", icon: Phone },
              { id: "footer", label: "Footer & Social", icon: Share2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer w-full text-left ${
                    isActive
                      ? "bg-[#183D2B] text-white shadow-md"
                      : "text-[#242424]/80 hover:bg-[#183D2B]/5 hover:text-[#183D2B] bg-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#E9E0D2]" : "text-[#8B5E35]"}`} />
                  <span className="truncate">{tab.label}</span>
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
              {/* SECTION: OPERATIONS DASHBOARD (CENTRAL SINGLE-WINDOW HUB) */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  {/* Dashboard Header */}
                  <div className="pb-6 border-b border-[#E9E0D2] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183D2B]/5 text-[#183D2B] text-[11px] uppercase tracking-wider font-semibold mb-2">
                        <LayoutDashboard className="w-3 h-3 text-[#8B5E35]" />
                        <span>Central Operations Hub</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#183D2B]">
                         Overview &amp; Control
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light mt-1 max-w-2xl">
                        Manage all website content, media assets, visitor inquiries, and bespoke itineraries from this unified operations hub.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          loadContent();
                          loadEnquiries(enquiryStatusFilter);
                          showToast("Database content refreshed!");
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E9E0D2] bg-white hover:bg-[#183D2B]/5 text-[#183D2B] text-xs font-semibold transition-all shadow-sm cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#8B5E35] ${isLoadingContent || isLoadingEnquiries ? "animate-spin" : ""}`} />
                        <span>Refresh Data</span>
                      </button>

                      <Link
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs font-semibold transition-all shadow-sm"
                      >
                        <span>View Live Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Live Analytics Hero Banner */}
                  <div
                    onClick={() => setActiveTab("analytics")}
                    className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#183D2B] via-[#1E4C36] to-[#0E281C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E9E0D2] group-hover:scale-110 transition-transform shrink-0">
                        <TrendingUp className="w-6 h-6 text-[#E9E0D2]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                            Live Analytics Engine Active
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                          Website Traffic &amp; Conversion Analytics
                        </h3>
                        <p className="text-xs text-white/80 font-light">
                          Track real-time visitors, where they came from, most clicked buttons &amp; lead conversions.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#E9E0D2] text-[#183D2B] font-bold text-xs shrink-0 group-hover:bg-white transition-colors shadow-sm self-start sm:self-auto">
                      <span>Open Analytics</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* 8 Primary Content Metrics Cards */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E35] mb-3">
                      Live Website Content Architecture
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Metric 1: Destinations */}
                      <div
                        onClick={() => setActiveTab("destinations")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Destinations
                          </span>
                          <MapPin className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.destinations?.length || 16}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Locations</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Highlands, waterways, coasts &amp; heritage
                        </p>
                      </div>

                      {/* Metric 2: Signature Journeys */}
                      <div
                        onClick={() => setActiveTab("journeys")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Journeys
                          </span>
                          <Compass className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.journeys?.length || 5}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Signature Routes</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Private multi-day curated itineraries
                        </p>
                      </div>

                      {/* Metric 3: Experiences */}
                      <div
                        onClick={() => setActiveTab("experiences")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Experiences
                          </span>
                          <Waves className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.experiences?.length || 8}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Bespoke Activities</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Plantation walks, houseboats &amp; spices
                        </p>
                      </div>

                      {/* Metric 4: Services / Ways to Travel */}
                      <div
                        onClick={() => setActiveTab("services")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Stays &amp; Styles
                          </span>
                          <Bed className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.services?.length || 5}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Ways to Travel</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Heritage bungalows, retreats &amp; chauffeur
                        </p>
                      </div>

                      {/* Metric 5: Google Reviews */}
                      <div
                        onClick={() => setActiveTab("reviews")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Google Reviews
                          </span>
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.reviews?.length || 6}
                          </span>
                          <span className="text-[11px] text-amber-700 font-semibold">★ 4.9 Rating</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Verified international traveler feedback
                        </p>
                      </div>

                      {/* Metric 6: Journal & Blog */}
                      <div
                        onClick={() => setActiveTab("journal")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Blog &amp; Journal
                          </span>
                          <BookOpen className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.journal?.length || 2}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Articles</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Travel stories, routes &amp; insider guides
                        </p>
                      </div>

                      {/* Metric 7: FAQs */}
                      <div
                        onClick={() => setActiveTab("faq")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            FAQs Answered
                          </span>
                          <HelpCircle className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {content?.faqs?.length || 5}
                          </span>
                          <span className="text-[11px] text-[#242424]/60 font-medium">Questions</span>
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Planning, seasonal advice &amp; logistics
                        </p>
                      </div>

                      {/* Metric 8: Guest Enquiries */}
                      <div
                        onClick={() => setActiveTab("enquiries")}
                        className="p-5 rounded-2xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-[#242424]/60 font-semibold">
                            Guest Enquiries
                          </span>
                          <Inbox className="w-4 h-4 text-[#8B5E35] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-[#183D2B]">
                            {enquiries.length}
                          </span>
                          {enquiries.filter((e) => e.status === "new").length > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              {enquiries.filter((e) => e.status === "new").length} New
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#242424]/60 mt-1 font-light">
                          Active travel inquiries &amp; consultation leads
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-4">
                    <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Quick Creation &amp; Media Management Shortcuts</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setEditModal({
                            section: "destination",
                            isNew: true,
                            data: {
                              state: "Kerala",
                              region: "Highlands",
                              tags: [],
                              highlights: [],
                              bestTimeToVisit: "October to March",
                              idealDays: "3-4 Days",
                              heroBadge: "Bespoke Kerala",
                            },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Destination</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditModal({
                            section: "experience",
                            isNew: true,
                            data: {
                              location: "Kerala",
                              category: "Cultural",
                              duration: "Half Day",
                              highlights: [],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Experience</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditModal({
                            section: "journey",
                            isNew: true,
                            data: {
                              duration: "7 Days / 6 Nights",
                              idealFor: "Couples & Families",
                              highlights: [],
                              itinerary: [],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Signature Journey</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditModal({
                            section: "review",
                            isNew: true,
                            data: {
                              rating: 5,
                              relativeTime: "Recently",
                              avatarInitial: "J",
                              avatarColor: "bg-[#183D2B]",
                            },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Google Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditModal({
                            section: "faq",
                            isNew: true,
                            data: {
                              category: "Planning & Booking",
                              order: (content?.faqs?.length || 0) + 1,
                            },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add FAQ</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("hero")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Edit Hero Slideshow</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("about")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Edit Curtain Videos &amp; Photos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("contact")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Update Contact &amp; Concierge</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("footer")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E9E0D2] hover:border-[#183D2B] hover:bg-[#183D2B] hover:text-white text-xs font-semibold text-[#183D2B] transition-all shadow-sm cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Update Footer &amp; Social</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Guest Enquiries & Leads */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E9E0D2]">
                      <div>
                        <h3 className="text-base font-serif font-bold text-[#183D2B]">
                          Recent Guest Consultations &amp; Enquiries
                        </h3>
                        <p className="text-xs text-[#242424]/60 font-light">
                          Latest 5 inquiries received from the public website consultation form.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab("enquiries")}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183D2B] hover:text-[#8B5E35] transition-colors cursor-pointer"
                      >
                        <span>View All ({enquiries.length})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {enquiries.length === 0 ? (
                      <div className="p-8 rounded-2xl bg-neutral-50 border border-[#E9E0D2] text-center text-xs text-[#242424]/60">
                        No guest inquiries found. When visitors submit the consultation form on the website, they will appear here.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {enquiries.slice(0, 5).map((enq) => {
                          const id = enq._id || enq.id;
                          const phoneClean = (enq.phone || "").replace(/[^0-9]/g, "");
                          return (
                            <div
                              key={id}
                              className="p-4 rounded-2xl border border-[#E9E0D2] bg-white hover:border-[#183D2B]/40 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#183D2B]">
                                    {enq.name || "Guest Traveler"}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      enq.status === "new"
                                        ? "bg-amber-100 text-amber-800"
                                        : enq.status === "contacted"
                                        ? "bg-blue-100 text-blue-800"
                                        : enq.status === "converted"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-neutral-100 text-neutral-700"
                                    }`}
                                  >
                                    {enq.status || "new"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-[#242424]/70 font-light">
                                  {enq.email && <span>{enq.email}</span>}
                                  {enq.phone && <span>&bull; {enq.phone}</span>}
                                  {enq.destination && <span>&bull; Destination: <strong>{enq.destination}</strong></span>}
                                  {enq.dates && <span>&bull; Dates: {enq.dates}</span>}
                                </div>
                                {enq.notes && (
                                  <p className="text-xs text-[#242424]/75 italic mt-1 line-clamp-1">
                                    &ldquo;{enq.notes}&rdquo;
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {phoneClean && (
                                  <a
                                    href={`https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(enq.name || "there")}%2C%20thank%20you%20for%20contacting%20Journeys%20by%20Jibu%20Thomas.%20I%20am%20reviewing%20your%20inquiry%20regarding%20${encodeURIComponent(enq.destination || "Kerala")}.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>WhatsApp</span>
                                  </a>
                                )}

                                <select
                                  value={enq.status || "new"}
                                  onChange={(e) => handleUpdateEnquiryStatus(id, e.target.value)}
                                  className="px-2.5 py-1.5 rounded-full border border-[#E9E0D2] bg-white text-xs font-semibold text-[#183D2B] outline-none cursor-pointer"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="converted">Converted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION: LIVE NATIVE ANALYTICS */}
              {activeTab === "analytics" && <AnalyticsDashboard />}

              {/* SECTION: ABOUT ATELIER & FOUNDER JIBU */}
              {activeTab === "about" && (
                <div className="space-y-8">
                  <div className="pb-4 border-b border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        About Atelier &amp; Founder Jibu Thomas
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Manage founder biography, story vision, philosophy pillars, why travel with us, and official photos.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const form = document.getElementById("about-atelier-form") as HTMLFormElement;
                        if (form) form.requestSubmit();
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save About Content</span>
                    </button>
                  </div>

                  <form
                    id="about-atelier-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);

                      const payload = {
                        storyBadge: formData.get("storyBadge") as string,
                        storyTitle: formData.get("storyTitle") as string,
                        storyQuote: formData.get("storyQuote") as string,
                        storyImage: formData.get("storyImage") as string,
                        storyDescription: formData.get("storyDescription") as string,

                        jibuBadge: formData.get("jibuBadge") as string,
                        jibuTitle: formData.get("jibuTitle") as string,
                        jibuSubtitle: formData.get("jibuSubtitle") as string,
                        jibuImage: formData.get("jibuImage") as string,
                        jibuDescription: formData.get("jibuDescription") as string,
                        jibuStats: [
                          { value: (formData.get("jibu_stat_0_val") as string) || "20+ Yrs", label: (formData.get("jibu_stat_0_lbl") as string) || "Experience" },
                          { value: (formData.get("jibu_stat_1_val") as string) || "100%", label: (formData.get("jibu_stat_1_lbl") as string) || "Tailored" },
                          { value: (formData.get("jibu_stat_2_val") as string) || "Direct", label: (formData.get("jibu_stat_2_lbl") as string) || "Concierge" },
                        ],

                        philosophyBadge: formData.get("philosophyBadge") as string,
                        philosophyTitle: formData.get("philosophyTitle") as string,
                        philosophyQuote: formData.get("philosophyQuote") as string,

                        whyUsBadge: formData.get("whyUsBadge") as string,
                        whyUsTitle: formData.get("whyUsTitle") as string,
                        whyUsQuote: formData.get("whyUsQuote") as string,

                        curtainVideo1: (formData.get("curtainVideo1") as string) || curtainVideo1 || content?.about?.curtainVideo1 || "/curtainvideo1.mp4",
                        curtainVideo2: (formData.get("curtainVideo2") as string) || curtainVideo2 || content?.about?.curtainVideo2 || "/curtainvideo2.mp4",
                        curtainImage: (formData.get("curtainImage") as string) || curtainImage || content?.about?.curtainImage || "/images/generated/hero-kerala.webp",
                      };

                      try {
                        const res = await fetch("/api/content/about", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });
                        if (res.ok) {
                          showToast("About atelier & Founder story saved successfully!");
                          loadContent();
                        } else {
                          showToast("Failed to save About section.", "error");
                        }
                      } catch {
                        showToast("Network error saving About section.", "error");
                      }
                    }}
                    className="space-y-8"
                  >
                    {/* Part 1: Our Story & Founding Vision */}
                    <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-4">
                      <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Part 1: Our Story &amp; Founding Vision</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Story Badge
                          </label>
                          <input
                            name="storyBadge"
                            defaultValue={content?.about?.storyBadge || "Our Story • Founding Vision"}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Headline Title
                          </label>
                          <input
                            name="storyTitle"
                            defaultValue={content?.about?.storyTitle || "The Founding Vision of Journeys by Jibu Thomas"}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Signature Quote / Subtitle
                          </label>
                          <input
                            name="storyQuote"
                            defaultValue={content?.about?.storyQuote || "South India, experienced with soul, depth, and unhurried grace."}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <input
                            type="hidden"
                            name="storyImage"
                            value={aboutStoryImage || content?.about?.storyImage || "/images/generated/tea-plantation-approach.webp"}
                          />
                          <MediaUploaderWithPreview
                            label="Story Photo *"
                            value={aboutStoryImage || content?.about?.storyImage || "/images/generated/tea-plantation-approach.webp"}
                            onChange={({ url }) => setAboutStoryImage(url)}
                            onClear={() => setAboutStoryImage("")}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Full Story Description
                          </label>
                          <textarea
                            rows={3}
                            name="storyDescription"
                            defaultValue={content?.about?.storyDescription || "Journeys by Jibu Thomas was created to show South India differently. We grew up along these waterways and highland ridges, unlocking private tea bungalows, quiet family kitchens, and secret viewpoints."}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Meet Jibu Thomas */}
                    <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-4">
                      <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                        <UserCheck className="w-4 h-4" />
                        <span>Part 2: Meet Founder Jibu Thomas</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Founder Badge
                          </label>
                          <input
                            name="jibuBadge"
                            defaultValue={content?.about?.jibuBadge || "Founder • Lead Travel Designer"}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Founder Title
                          </label>
                          <input
                            name="jibuTitle"
                            defaultValue={content?.about?.jibuTitle || "Two decades of personal destination craftsmanship."}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Founder Subtitle Quote
                          </label>
                          <input
                            name="jibuSubtitle"
                            defaultValue={content?.about?.jibuSubtitle || "Direct personal accountability for every journey that carries my name."}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <input
                            type="hidden"
                            name="jibuImage"
                            value={aboutJibuImage || content?.about?.jibuImage || "/images/generated/fort-kochi-heritage.webp"}
                          />
                          <MediaUploaderWithPreview
                            label="Jibu Thomas Official Portrait *"
                            value={aboutJibuImage || content?.about?.jibuImage || "/images/generated/fort-kochi-heritage.webp"}
                            onChange={({ url }) => setAboutJibuImage(url)}
                            onClear={() => setAboutJibuImage("")}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1">
                            Founder Bio / Overview
                          </label>
                          <textarea
                            rows={3}
                            name="jibuDescription"
                            defaultValue={content?.about?.jibuDescription || "Jibu personally reviews your travel style, inspects every boutique stay, and briefs your private chauffeur. When you travel, his personal WhatsApp line is with you 24/7."}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white font-sans"
                          />
                        </div>

                        {/* Experience Stats */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#183D2B] mb-1">Stat 1 (e.g. 20+ Yrs / Experience)</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input name="jibu_stat_0_val" defaultValue={content?.about?.jibuStats?.[0]?.value || "20+ Yrs"} placeholder="Value" className="px-3 py-2 rounded-lg border border-[#E9E0D2] text-xs bg-white" />
                            <input name="jibu_stat_0_lbl" defaultValue={content?.about?.jibuStats?.[0]?.label || "Experience"} placeholder="Label" className="px-3 py-2 rounded-lg border border-[#E9E0D2] text-xs bg-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#183D2B] mb-1">Stat 2 (e.g. 100% / Tailored)</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input name="jibu_stat_1_val" defaultValue={content?.about?.jibuStats?.[1]?.value || "100%"} placeholder="Value" className="px-3 py-2 rounded-lg border border-[#E9E0D2] text-xs bg-white" />
                            <input name="jibu_stat_1_lbl" defaultValue={content?.about?.jibuStats?.[1]?.label || "Tailored"} placeholder="Label" className="px-3 py-2 rounded-lg border border-[#E9E0D2] text-xs bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Part 3 & 4: Philosophy & Why Us */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-3">
                        <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                          <Heart className="w-4 h-4" />
                          <span>Part 3: Philosophy</span>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#183D2B] mb-1">Philosophy Title</label>
                          <input name="philosophyTitle" defaultValue={content?.about?.philosophyTitle || "How We Approach Every Single Itinerary"} className="w-full px-3 py-2 rounded-xl border border-[#E9E0D2] text-xs bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#183D2B] mb-1">Philosophy Quote</label>
                          <input name="philosophyQuote" defaultValue={content?.about?.philosophyQuote || "Generous pacing, living heritage, and conscious respect for local hosts."} className="w-full px-3 py-2 rounded-xl border border-[#E9E0D2] text-xs bg-white" />
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-3">
                        <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Part 4: Standards / Why Us</span>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#183D2B] mb-1">Why Us Title</label>
                          <input name="whyUsTitle" defaultValue={content?.about?.whyUsTitle || "The Discerning Boutique Difference"} className="w-full px-3 py-2 rounded-xl border border-[#E9E0D2] text-xs bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#183D2B] mb-1">Why Us Quote</label>
                          <input name="whyUsQuote" defaultValue={content?.about?.whyUsQuote || "No middle-tier sales reps, no hidden commissions, pristine standards."} className="w-full px-3 py-2 rounded-xl border border-[#E9E0D2] text-xs bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Part 5: Cinematic Curtain Video & Image Reveals */}
                    <div className="p-6 rounded-3xl bg-neutral-50/70 border border-[#E9E0D2] space-y-6">
                      <div className="flex items-center gap-2 text-[#8B5E35] font-semibold text-xs uppercase tracking-wider">
                        <Film className="w-4 h-4" />
                        <span>Part 5: Full-Width Cinematic Curtain Video &amp; Image Reveals</span>
                      </div>
                      <p className="text-xs text-[#242424]/70 font-light leading-relaxed">
                        These are the luxury full-width media reveal curtains seen as guests scroll down the website. Upload MP4/WebM videos (up to 16MB) or high-res photos. Uploading replaces the live background seamlessly.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Curtain Video 1 */}
                        <div className="p-4 rounded-2xl bg-white border border-[#E9E0D2] space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#183D2B]">
                            <Video className="w-4 h-4 text-[#8B5E35]" />
                            <span>Curtain Video Reveal #1</span>
                          </div>
                          <span className="text-[11px] text-[#242424]/60 block font-light">
                            First scroll curtain reveal (Backwaters / Landscape)
                          </span>
                          <input
                            type="hidden"
                            name="curtainVideo1"
                            value={curtainVideo1 || content?.about?.curtainVideo1 || "/curtainvideo1.mp4"}
                          />
                          <MediaUploaderWithPreview
                            label="Video 1 (MP4/WebM up to 16MB) *"
                            value={curtainVideo1 || content?.about?.curtainVideo1 || "/curtainvideo1.mp4"}
                            mediaType="video"
                            maxSizeMb={16}
                            onChange={({ url }) => setCurtainVideo1(url)}
                            onClear={() => setCurtainVideo1("")}
                          />
                        </div>

                        {/* Curtain Video 2 */}
                        <div className="p-4 rounded-2xl bg-white border border-[#E9E0D2] space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#183D2B]">
                            <Video className="w-4 h-4 text-[#8B5E35]" />
                            <span>Curtain Video Reveal #2</span>
                          </div>
                          <span className="text-[11px] text-[#242424]/60 block font-light">
                            Second scroll curtain reveal (Western Ghats / Highlands)
                          </span>
                          <input
                            type="hidden"
                            name="curtainVideo2"
                            value={curtainVideo2 || content?.about?.curtainVideo2 || "/curtainvideo2.mp4"}
                          />
                          <MediaUploaderWithPreview
                            label="Video 2 (MP4/WebM up to 16MB) *"
                            value={curtainVideo2 || content?.about?.curtainVideo2 || "/curtainvideo2.mp4"}
                            mediaType="video"
                            maxSizeMb={16}
                            onChange={({ url }) => setCurtainVideo2(url)}
                            onClear={() => setCurtainVideo2("")}
                          />
                        </div>

                        {/* Curtain Image */}
                        <div className="p-4 rounded-2xl bg-white border border-[#E9E0D2] space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#183D2B]">
                            <Sparkles className="w-4 h-4 text-[#8B5E35]" />
                            <span>Curtain Photo Reveal</span>
                          </div>
                          <span className="text-[11px] text-[#242424]/60 block font-light">
                            Editorial photographic reveal curtain
                          </span>
                          <input
                            type="hidden"
                            name="curtainImage"
                            value={curtainImage || content?.about?.curtainImage || "/images/generated/hero-kerala.webp"}
                          />
                          <MediaUploaderWithPreview
                            label="Photo (JPG/PNG/WebP up to 10MB) *"
                            value={curtainImage || content?.about?.curtainImage || "/images/generated/hero-kerala.webp"}
                            mediaType="image"
                            maxSizeMb={10}
                            onChange={({ url }) => setCurtainImage(url)}
                            onClear={() => setCurtainImage("")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All About Content &amp; Photos</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

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
                            image: "",
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
                            image: "",
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
                            image: "",
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

              {/* SECTION: WAYS TO TRAVEL & HANDPICKED STAYS */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Ways to Travel &amp; Handpicked Stays
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Add and edit your travel services, private chauffeurs, heritage stays, and bespoke on-ground coordination.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "service",
                          isNew: true,
                          data: {
                            id: `service-${Date.now().toString().slice(-4)}`,
                            number: `0${(content?.services?.length || 0) + 1}`,
                            title: "",
                            shortVibe: "",
                            description: "",
                            points: [],
                            image: "",
                            order: (content?.services?.length || 0) + 1,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service / Stay</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(content?.services || []).map((srv: any, idx: number) => (
                      <div
                        key={srv.id || srv._id || idx}
                        className="rounded-3xl bg-white border border-[#E9E0D2] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                          <img
                            src={srv.image || "/images/services/private-chauffeur.webp"}
                            alt={srv.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-[#183D2B]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold text-white tracking-wider">
                            Service {srv.number || `0${idx + 1}`}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="text-base font-serif font-bold text-[#183D2B] leading-snug">
                              {srv.title}
                            </h3>
                            <p className="text-xs text-[#8B5E35] font-medium mt-1">
                              {srv.shortVibe}
                            </p>
                            <p className="text-xs text-[#242424]/75 font-light line-clamp-3 mt-2 leading-relaxed">
                              {srv.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#E9E0D2]/70 flex items-center justify-between">
                            <span className="text-[11px] text-[#242424]/50 font-mono">
                              ID: {srv.id}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  setEditModal({
                                    section: "service",
                                    isNew: false,
                                    data: { ...srv },
                                  })
                                }
                                className="p-2 rounded-xl text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors cursor-pointer"
                                title="Edit Service"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteModal({
                                    type: "service",
                                    id: srv.id || srv._id,
                                    title: srv.title,
                                  })
                                }
                                className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Service"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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

              {/* SECTION: ENQUIRIES & LEADS */}
              {activeTab === "enquiries" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Guest Enquiries &amp; Journey Leads
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Review, manage, and follow up with travellers who submitted bespoke journey requests.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadEnquiries(enquiryStatusFilter)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E9E0D2] text-[#183D2B] text-xs font-semibold hover:bg-[#183D2B]/5 transition-all cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEnquiries ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { id: "all", label: "All Enquiries" },
                      { id: "new", label: "New" },
                      { id: "in-progress", label: "In Progress" },
                      { id: "contacted", label: "Contacted" },
                      { id: "confirmed", label: "Confirmed" },
                      { id: "archived", label: "Archived" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setEnquiryStatusFilter(f.id);
                          loadEnquiries(f.id);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          enquiryStatusFilter === f.id
                            ? "bg-[#183D2B] text-white shadow-sm"
                            : "bg-[#FFFCF5] border border-[#E9E0D2] text-[#242424]/70 hover:border-[#183D2B]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Enquiries Listing */}
                  {isLoadingEnquiries ? (
                    <div className="py-16 text-center text-xs text-[#183D2B] font-semibold">
                      <div className="w-6 h-6 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin mx-auto mb-2" />
                      Loading guest enquiries...
                    </div>
                  ) : enquiries.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-[#FFFCF5] border border-[#E9E0D2] text-center space-y-2">
                      <Inbox className="w-8 h-8 text-[#8B5E35] mx-auto opacity-60" />
                      <h4 className="text-sm font-serif font-bold text-[#183D2B]">
                        No Enquiries Found
                      </h4>
                      <p className="text-xs text-[#242424]/60 max-w-sm mx-auto font-light">
                        When travellers submit requests through the Plan Your Journey forms, their details and travel preferences will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enquiries.map((enq) => {
                        const cleanPhone = (enq.phone || "").replace(/[^0-9]/g, "");
                        const waLink = cleanPhone
                          ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${enq.fullName}, this is Jibu Thomas from Journeys by Jibu. I received your bespoke journey request and would love to consult with you.`)}`
                          : null;

                        return (
                          <div
                            key={enq._id}
                            className="p-5 sm:p-6 rounded-2xl border border-[#E9E0D2] bg-[#FFFCF5] hover:border-[#8B5E35]/40 transition-all shadow-sm space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9E0D2]">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-bold text-[#183D2B]">
                                    {enq.fullName}
                                  </h3>
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      enq.status === "new"
                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                        : enq.status === "contacted"
                                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                                        : enq.status === "confirmed"
                                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                                        : "bg-stone-100 text-stone-700 border border-stone-300"
                                    }`}
                                  >
                                    {enq.status}
                                  </span>
                                </div>
                                <span className="text-[11px] text-[#242424]/60 font-light">
                                  Received {new Date(enq.createdAt).toLocaleString()}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-all"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                                    <span>Reply on WhatsApp</span>
                                  </a>
                                )}
                                <a
                                  href={`mailto:${enq.email}`}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#E9E0D2] bg-white hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-medium transition-all"
                                >
                                  <span>Email</span>
                                </a>
                                <select
                                  value={enq.status}
                                  onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                                  className="px-2.5 py-1.5 rounded-full border border-[#E9E0D2] bg-white text-xs text-[#183D2B] font-medium outline-none cursor-pointer"
                                >
                                  <option value="new">Mark New</option>
                                  <option value="in-progress">In Progress</option>
                                  <option value="contacted">Mark Contacted</option>
                                  <option value="confirmed">Mark Confirmed</option>
                                  <option value="archived">Archive</option>
                                </select>
                                <button
                                  onClick={() => handleDeleteEnquiry(enq._id)}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                              <div className="p-3 rounded-xl bg-white border border-[#E9E0D2]">
                                <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                                  Contact Phone / WhatsApp
                                </span>
                                <span className="text-[#183D2B] font-medium block mt-0.5">
                                  {enq.phone || "Not specified"}
                                </span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#E9E0D2]">
                                <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                                  Email Address
                                </span>
                                <span className="text-[#183D2B] font-medium block mt-0.5 break-all">
                                  {enq.email || "Not specified"}
                                </span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#E9E0D2]">
                                <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                                  Travel Dates &amp; Days
                                </span>
                                <span className="text-[#183D2B] font-medium block mt-0.5">
                                  {enq.travelDates || "Flexible"}{" "}
                                  {enq.approximateDays ? `(${enq.approximateDays})` : ""}
                                </span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#E9E0D2]">
                                <span className="text-[10px] uppercase font-semibold text-[#8B5E35] block">
                                  Guests / Party
                                </span>
                                <span className="text-[#183D2B] font-medium block mt-0.5">
                                  {enq.guestsCount || `${enq.adultCount || 2} Adults`}
                                </span>
                              </div>
                            </div>

                            {/* Additional preferences */}
                            {(enq.accommodationStyle || enq.specialInterests?.length > 0) && (
                              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                                {enq.accommodationStyle && (
                                  <span className="px-2.5 py-1 rounded-lg bg-[#183D2B]/5 text-[#183D2B] border border-[#183D2B]/10">
                                    <strong>Stay:</strong> {enq.accommodationStyle}
                                  </span>
                                )}
                                {enq.specialInterests?.map((item: string) => (
                                  <span
                                    key={item}
                                    className="px-2.5 py-1 rounded-lg bg-[#8B5E35]/10 text-[#8B5E35] border border-[#8B5E35]/20 font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Guest Message */}
                            {enq.message && (
                              <div className="p-3.5 rounded-xl bg-white border border-[#E9E0D2] text-xs text-[#242424]/85 leading-relaxed">
                                <span className="text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold block mb-1">
                                  Guest Note &amp; Vision:
                                </span>
                                <p className="whitespace-pre-wrap">{enq.message}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                        WhatsApp Number 
                      </label>
                      <input
                        name="whatsappNumber"
                        defaultValue={content?.contactInfo?.whatsappNumber || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Display Phone Number 
                      </label>
                      <input
                        name="phoneDisplay"
                        defaultValue={content?.contactInfo?.phoneDisplay || ""}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Direct Dial Phone
                      </label>
                      <input
                        name="phoneNumber"
                        defaultValue={content?.contactInfo?.phoneNumber || ""}
                        placeholder="+919447000000"
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

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Kerala Atelier Physical Address
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

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Concierge Banner Title
                      </label>
                      <input
                        name="conciergeTitle"
                        defaultValue={content?.contactInfo?.conciergeTitle || "Private Concierge & Direct Atelier Access"}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Concierge Subtitle
                      </label>
                      <input
                        name="conciergeSubtitle"
                        defaultValue={content?.contactInfo?.conciergeSubtitle || "Every journey begins with a conversation."}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E9E0D2] focus:border-[#183D2B] outline-none text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                        Concierge Reassurance Note
                      </label>
                      <input
                        name="conciergeNote"
                        defaultValue={content?.contactInfo?.conciergeNote || "Expect a response within 4 hours. No obligation."}
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

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2">
                          Copyright Notice Text
                        </label>
                        <input
                          name="copyrightText"
                          defaultValue={content?.footerContent?.copyrightText || "© 2026 Journeys by Jibu Thomas. All Rights Reserved."}
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

              {/* SECTION: BLOG & JOURNAL ARTICLES */}
              {activeTab === "journal" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E0D2]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Blog &amp; Travel Journal Articles
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Publish editorial essays, slow-travel dispatches, and insider guides. Changes sync immediately to the live site.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "journal",
                          isNew: true,
                          data: {
                            id: `dispatch-${Date.now().toString().slice(-4)}`,
                            issueNumber: `Dispatch 0${(content?.journal?.length || 0) + 1}`,
                            title: "",
                            subtitle: "",
                            category: "Destination Guides",
                            categoryKey: "guides",
                            readTime: "5 min read",
                            date: "Kerala Atelier • Guide",
                            image: "",
                            summary: "",
                            fullContent: [],
                            takeaways: [],
                            order: (content?.journal?.length || 0) + 1,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Article</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(content?.journal || []).map((art: any, idx: number) => (
                      <div
                        key={art.id || art._id || idx}
                        className="rounded-3xl bg-white border border-[#E9E0D2] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                          <img
                            src={art.image || "/images/generated/tea-plantation-approach.webp"}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-[#183D2B]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold text-white tracking-wider">
                            {art.issueNumber || "Dispatch"}
                          </div>
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white">
                            {art.readTime || "5 min read"}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8B5E35] font-semibold block mb-1">
                              {art.category || "Journal"} &bull; {art.date || "Dispatch"}
                            </span>
                            <h3 className="text-base font-serif font-bold text-[#183D2B] leading-snug line-clamp-2">
                              {art.title}
                            </h3>
                            <p className="text-xs text-[#242424]/75 font-light line-clamp-3 mt-2 leading-relaxed">
                              {art.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#E9E0D2]/70 flex items-center justify-between">
                            <span className="text-[11px] text-[#242424]/50 font-mono">
                              ID: {art.id}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  setEditModal({
                                    section: "journal",
                                    isNew: false,
                                    data: { ...art },
                                  })
                                }
                                className="p-2 rounded-xl text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors cursor-pointer"
                                title="Edit Article"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteModal({
                                    type: "journal",
                                    id: art.id || art._id,
                                    title: art.title,
                                  })
                                }
                                className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Article"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}





              {/* SECTION: FREQUENTLY ASKED QUESTIONS (FAQ) */}
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#E9E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                        Frequently Asked Questions (FAQ)
                      </h2>
                      <p className="text-xs text-[#242424]/70 font-light">
                        Add, edit, reorder, or remove guest questions and detailed answers. Changes are live immediately.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setEditModal({
                          section: "faq",
                          isNew: true,
                          data: {
                            question: "",
                            answer: "",
                            category: "General",
                            order: (content?.faqs?.length || 0) + 1,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Question</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(content?.faqs || []).map((faq: any, idx: number) => (
                      <div
                        key={faq.id || faq._id || idx}
                        className="p-5 sm:p-6 rounded-2xl border border-[#E9E0D2] bg-white hover:border-[#8B5E35]/40 transition-all shadow-sm hover:shadow-md space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-[#183D2B]/5 text-[#183D2B] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            {faq.category && (
                              <span className="px-2.5 py-1 rounded-full bg-[#8B5E35]/10 text-[#8B5E35] text-[10px] uppercase tracking-wider font-semibold">
                                {faq.category}
                              </span>
                            )}
                            <span className="text-[11px] text-[#242424]/40 font-mono">
                              Order: {faq.order ?? idx + 1}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() =>
                                setEditModal({
                                  section: "faq",
                                  isNew: false,
                                  data: { ...faq },
                                })
                              }
                              className="p-2 rounded-xl text-[#183D2B] hover:bg-[#183D2B]/10 transition-colors cursor-pointer"
                              title="Edit Question"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({
                                  type: "faq",
                                  id: faq.id || faq._id,
                                  title: faq.question,
                                })
                              }
                              className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-[#183D2B] leading-snug">
                            {faq.question}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#242424]/80 font-light mt-2 leading-relaxed bg-[#FFFCF5] p-3.5 rounded-xl border border-[#E9E0D2]/60">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* EDIT / CREATE MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-3xl border border-[#E9E0D2] max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* STICKY HEADER - NEVER CUT OFF ON ANY SCREEN */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E9E0D2] shrink-0 bg-white">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#183D2B]">
                  {editModal.isNew ? `Add New ${editModal.section}` : `Edit ${editModal.section}`}
                </h3>
                <p className="text-[11px] text-[#242424]/60 font-light mt-0.5">
                  Fill in the details below. Changes reflect on the live website immediately upon saving.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="p-2 rounded-full text-[#242424]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 transition-colors cursor-pointer shrink-0"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE FORM BODY & STICKY FOOTER */}
            <form onSubmit={handleSaveEntity} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
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

                  <div>
                    <MediaUploaderWithPreview
                      label="Destination Cover Photo *"
                      value={editModal.data.image || ""}
                      onChange={({ url }) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: url },
                        })
                      }
                      onClear={() =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: "" },
                        })
                      }
                    />
                  </div>
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

                  <div>
                    <MediaUploaderWithPreview
                      label="Experience Cover Photo *"
                      value={editModal.data.image || ""}
                      onChange={({ url }) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: url },
                        })
                      }
                      onClear={() =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: "" },
                        })
                      }
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
                    <MediaUploaderWithPreview
                      label="Journey Route Photo *"
                      value={editModal.data.image || ""}
                      onChange={({ url }) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: url },
                        })
                      }
                      onClear={() =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: "" },
                        })
                      }
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

              {/* Service Form Fields */}
              {editModal.section === "service" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Service Title *
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

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Service Number (e.g. 01, 02)
                      </label>
                      <input
                        type="text"
                        value={editModal.data.number || "01"}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, number: e.target.value },
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
                    <MediaUploaderWithPreview
                      label="Service Feature Photo *"
                      value={editModal.data.image || ""}
                      onChange={({ url }) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: url },
                        })
                      }
                      onClear={() =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, image: "" },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Detailed Description *
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
                      Key Highlights / Inclusions (One point per line)
                    </label>
                    <textarea
                      rows={4}
                      value={
                        Array.isArray(editModal.data.points)
                          ? editModal.data.points.join("\n")
                          : editModal.data.points || ""
                      }
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: {
                            ...editModal.data,
                            points: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      placeholder="Pristine AC fleet with seasoned chauffeurs&#10;Complimentary Wi-Fi and chilled water"
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

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B]">
                        Slide Media (Photo or Video) *
                      </label>
                      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 border border-[#E9E0D2]">
                        <button
                          type="button"
                          onClick={() =>
                            setEditModal({
                              ...editModal,
                              data: { ...editModal.data, type: "video" },
                            })
                          }
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            editModal.data.type === "video" || (!editModal.data.type && editModal.data.src?.endsWith(".mp4"))
                              ? "bg-[#183D2B] text-white shadow-xs"
                              : "text-[#242424]/70 hover:text-[#183D2B]"
                          }`}
                        >
                          Video (16MB)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditModal({
                              ...editModal,
                              data: { ...editModal.data, type: "image" },
                            })
                          }
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            editModal.data.type === "image" || (editModal.data.type !== "video" && !editModal.data.src?.endsWith(".mp4"))
                              ? "bg-[#183D2B] text-white shadow-xs"
                              : "text-[#242424]/70 hover:text-[#183D2B]"
                          }`}
                        >
                          Photo (10MB)
                        </button>
                      </div>
                    </div>

                    <MediaUploaderWithPreview
                      label={
                        editModal.data.type === "video" || (!editModal.data.type && editModal.data.src?.endsWith(".mp4"))
                          ? "Cinematic MP4/WebM Video (up to 16MB) *"
                          : "High-Resolution Photograph (up to 10MB) *"
                      }
                      value={editModal.data.src || ""}
                      mediaType={
                        editModal.data.type === "video" || (!editModal.data.type && editModal.data.src?.endsWith(".mp4"))
                          ? "video"
                          : "image"
                      }
                      maxSizeMb={
                        editModal.data.type === "video" || (!editModal.data.type && editModal.data.src?.endsWith(".mp4"))
                          ? 16
                          : 10
                      }
                      onChange={({ url, type }) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, src: url, type: type || editModal.data.type },
                        })
                      }
                      onClear={() =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, src: "" },
                        })
                      }
                    />
                  </div>
                </>
              )}

              {/* Journal Article Form Fields */}
              {editModal.section === "journal" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Article Headline / Title *
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

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Editorial Subtitle
                      </label>
                      <input
                        type="text"
                        value={editModal.data.subtitle || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Category
                      </label>
                      <select
                        value={editModal.data.category || "Destination Guides"}
                        onChange={(e) => {
                          const cat = e.target.value;
                          const keyMap: Record<string, string> = {
                            "Destination Guides": "guides",
                            "Travel Tips & Planning": "tips",
                            "Culture & Local Stories": "culture",
                            "Seasonal Travel Inspiration": "seasons",
                          };
                          setEditModal({
                            ...editModal,
                            data: {
                              ...editModal.data,
                              category: cat,
                              categoryKey: keyMap[cat] || "guides",
                            },
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none bg-white"
                      >
                        <option value="Destination Guides">Destination Guides</option>
                        <option value="Travel Tips & Planning">Travel Tips &amp; Planning</option>
                        <option value="Culture & Local Stories">Culture &amp; Local Stories</option>
                        <option value="Seasonal Travel Inspiration">Seasonal Travel Inspiration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Issue / Dispatch Label
                      </label>
                      <input
                        type="text"
                        value={editModal.data.issueNumber || "Dispatch 01"}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, issueNumber: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Reading Time
                      </label>
                      <input
                        type="text"
                        value={editModal.data.readTime || "5 min read"}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, readTime: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Date / Region Tag
                      </label>
                      <input
                        type="text"
                        value={editModal.data.date || "Destination Guide • Highlands"}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, date: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <MediaUploaderWithPreview
                        label="Article Cover Photo *"
                        value={editModal.data.image || ""}
                        onChange={({ url }) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, image: url },
                          })
                        }
                        onClear={() =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, image: "" },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Editorial Summary *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editModal.data.summary || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, summary: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Full Article Paragraphs (One paragraph per line)
                    </label>
                    <textarea
                      rows={6}
                      value={
                        Array.isArray(editModal.data.fullContent)
                          ? editModal.data.fullContent.join("\n\n")
                          : editModal.data.fullContent || ""
                      }
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: {
                            ...editModal.data,
                            fullContent: e.target.value
                              .split("\n")
                              .map((s: string) => s.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none font-sans"
                      placeholder="Enter each article paragraph separated by blank lines..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Discerning Traveller Takeaways (One point per line)
                    </label>
                    <textarea
                      rows={3}
                      value={
                        Array.isArray(editModal.data.takeaways)
                          ? editModal.data.takeaways.join("\n")
                          : editModal.data.takeaways || ""
                      }
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: {
                            ...editModal.data,
                            takeaways: e.target.value
                              .split("\n")
                              .map((s: string) => s.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      placeholder="e.g. Best Time: October through March&#10;Stay in authentic restored planters' bungalows"
                    />
                  </div>
                </>
              )}

              {/* FAQ Form Fields */}
              {editModal.section === "faq" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Question *
                    </label>
                    <input
                      type="text"
                      required
                      value={editModal.data.question || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, question: e.target.value },
                        })
                      }
                      placeholder="e.g. How does private chauffeur-driven travel work?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none font-medium text-[#183D2B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={editModal.data.category || ""}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, category: e.target.value },
                          })
                        }
                        placeholder="e.g. Logistics & Transport, Planning & Pacing"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editModal.data.order ?? 1}
                        onChange={(e) =>
                          setEditModal({
                            ...editModal,
                            data: { ...editModal.data, order: Number(e.target.value) },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-1.5">
                      Detailed Answer *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={editModal.data.answer || ""}
                      onChange={(e) =>
                        setEditModal({
                          ...editModal,
                          data: { ...editModal.data, answer: e.target.value },
                        })
                      }
                      placeholder="Enter the complete, thoughtful answer for your guests..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9E0D2] text-xs focus:border-[#183D2B] outline-none leading-relaxed"
                    />
                  </div>
                </>
              )}

              </div>

              {/* STICKY FOOTER - ALWAYS ACCESSIBLE */}
              <div className="flex items-center justify-end gap-3 p-4 sm:p-5 border-t border-[#E9E0D2] bg-neutral-50/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="px-4 py-2 rounded-full border border-[#E9E0D2] bg-white text-xs font-semibold text-[#242424]/70 hover:bg-neutral-100 transition-colors cursor-pointer"
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

