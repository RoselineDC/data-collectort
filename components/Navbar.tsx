"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    EllipsisVertical,
    X,
    ChevronDown,
    Mail,
    Globe,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    {
        label: "PROJECTS",
        href: "/dashboard/projects",
        hasDropdown: true,
        authOnly: true,
    },
    {
        label: "FORMS",
        href: "/dashboard/forms",
        hasDropdown: true,
        authOnly: true,
    },
    { label: "DASHBOARD", href: "/dashboard", authOnly: true },
    { label: "CONTACT", href: "/contact" },
];

const PROJECTS_LINKS = [
    { label: "All Projects", href: "/dashboard/projects" },
    { label: "New Project", href: "/dashboard/projects/new" },
];

const FORMS_LINKS = [
    { label: "All Forms", href: "/dashboard/forms" },
    { label: "New Form", href: "/dashboard/forms/new" },
    { label: "Submissions", href: "/dashboard/submissions" },
    { label: "Assets", href: "/dashboard/assets" },
];

const SOCIALS = [
    { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" },
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

interface NavbarProps {
    activeProject?: string | null;
}

export default function Navbar({ activeProject = null }: NavbarProps) {
    const pathname = usePathname();
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleSignOut() {
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = "/";
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [accountOpen, setAccountOpen] = useState(false);

    const toggleMobile = (label: string) =>
        setMobileExpanded((prev) => (prev === label ? null : label));

    const visibleLinks = NAV_LINKS.filter(
        (item) => !item.authOnly || user
    );

    return (
        <>
            {/* ── TOP BAR — only shown on lg+, kept slim ── */}
            <div className="hidden lg:block bg-white border-b border-gray-100">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-5">
                        <Link
                            href="mailto:support@datacollector.app"
                            className="flex items-center gap-1.5 group"
                        >
                            <Mail className="w-3 h-3 text-[#7ac943]" strokeWidth={1.5} />
                            <span className="text-[11px] text-gray-500 group-hover:text-[#7ac943] transition-colors">
                                support@datacollector.app
                            </span>
                        </Link>

                        <div className="flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-[#7ac943]" strokeWidth={1.5} />
                            <span className="text-[11px] text-gray-500">datacollector.app</span>
                        </div>

                        {activeProject && (
                            <>
                                <span className="text-gray-200">|</span>
                                <span className="text-[11px] text-[#7ac943] font-semibold">
                                    Project: {activeProject}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5">
                        {SOCIALS.map(({ icon: Icon, label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                aria-label={label}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#7ac943] transition-colors duration-200"
                            >
                                <Icon className="w-3 h-3" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN NAVBAR ── */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18">

                        {/* LOGO — desktop */}
                        <Link href="/" className="hidden lg:flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7ac943]">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                                    <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                    <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                    <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
                                </svg>
                            </span>
                            {/* FIX 1: Removed "Data Collection" subtitle — redundant */}
                            <span className="text-base font-bold tracking-tight text-gray-900">
                                Data Collector
                            </span>
                        </Link>

                        {/* DESKTOP NAV */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {visibleLinks.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);
                                const dropdownLinks =
                                    item.label === "PROJECTS"
                                        ? PROJECTS_LINKS
                                        : item.label === "FORMS"
                                        ? FORMS_LINKS
                                        : [];

                                return (
                                    <div key={item.label} className="group relative">
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                                                isActive
                                                    ? "text-[#7ac943]"
                                                    : "text-gray-700 hover:text-[#7ac943]"
                                            }`}
                                        >
                                            {item.label}
                                            {item.hasDropdown && (
                                                <ChevronDown
                                                    size={14}
                                                    className="transition-transform group-hover:rotate-180 duration-200"
                                                />
                                            )}
                                        </Link>

                                        {/* Active underline */}
                                        <span
                                            className={`absolute left-0 -bottom-[21px] h-[2px] bg-[#7ac943] transition-all duration-200 ${
                                                isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                        />

                                        {item.hasDropdown && (
                                            <div className="absolute top-full left-0 mt-5 w-52 rounded-xl border border-gray-100 bg-white shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                                                <div className="p-2">
                                                    {dropdownLinks.map(({ label, href }) => (
                                                        <Link
                                                            key={label}
                                                            href={href}
                                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#7ac943] rounded-lg transition-colors group/item"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-[#7ac943] opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                                                            {label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        {/* DESKTOP AUTH */}
                        <div className="hidden lg:flex items-center gap-3">
                            {isLoading && (
                                <div className="h-9 w-28 rounded-md bg-gray-100 animate-pulse" />
                            )}

                            {/* Signed IN */}
                            {!isLoading && user && (
                                <div className="relative">
                                    <button
                                        onClick={() => setAccountOpen((p) => !p)}
                                        className="flex items-center gap-2 border border-gray-200 rounded-full pl-1 pr-3 py-1 hover:border-[#7ac943] transition-colors"
                                    >
                                        {user?.user_metadata?.avatar_url ? (
                                            <Image
                                                src={user.user_metadata.avatar_url}
                                                alt={user.user_metadata.full_name ?? "Avatar"}
                                                width={28}
                                                height={28}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7ac943] text-xs font-bold text-white">
                                                {(
                                                    user?.user_metadata?.full_name?.[0] ??
                                                    user?.email?.[0] ??
                                                    "U"
                                                ).toUpperCase()}
                                            </span>
                                        )}
                                        {/* FIX 2: Show full name, not just first character */}
                                        <span className="text-xs font-semibold text-gray-800 max-w-[120px] truncate">
                                            {user?.user_metadata?.full_name ?? user?.email?.split("@")[0]}
                                        </span>
                                        <ChevronDown
                                            size={13}
                                            className={`text-gray-400 transition-transform duration-200 ${
                                                accountOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {accountOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl z-50 p-1">
                                            <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                                                <p className="text-xs font-semibold text-gray-900 truncate">
                                                    {user?.user_metadata?.full_name ?? user?.email}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                            {[
                                                { label: "Dashboard",   href: "/dashboard" },
                                                { label: "Projects",    href: "/dashboard/projects" },
                                                { label: "Forms",       href: "/dashboard/forms" },
                                                { label: "Submissions", href: "/dashboard/submissions" },
                                                { label: "Settings",    href: "/settings" },
                                            ].map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setAccountOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#7ac943] rounded-lg transition-colors group/item"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-[#7ac943] opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                                                    {item.label}
                                                </Link>
                                            ))}
                                            <div className="my-1 border-t border-gray-100" />
                                            <button
                                                onClick={handleSignOut}
                                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Signed OUT */}
                            {!isLoading && !user && (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        className="text-sm font-semibold text-gray-700 hover:text-[#7ac943] transition-colors"
                                    >
                                        SIGN IN
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="inline-flex items-center gap-2 bg-[#7ac943] hover:bg-[#6ab535] transition-colors text-white text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded-md"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* MOBILE bar */}
                        <div className="flex items-center justify-between w-full lg:hidden">
                            <Link href="/" className="flex items-center gap-1.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7ac943]">
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                        <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                                        <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                        <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                        <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
                                    </svg>
                                </span>
                                <span className="text-sm font-bold text-gray-900">Data Collector</span>
                            </Link>

                            <div className="flex items-center gap-5">
                                <Link
                                    href="/"
                                    className={`text-xs font-semibold ${
                                        pathname === "/" ? "text-[#7ac943]" : "text-gray-800"
                                    }`}
                                >
                                    Home
                                </Link>
                                {user ? (
                                    <Link
                                        href="/dashboard"
                                        className={`text-xs font-semibold ${
                                            pathname.startsWith("/dashboard")
                                                ? "text-[#7ac943]"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/auth/signin"
                                        className={`text-xs font-semibold ${
                                            pathname === "/auth/signin"
                                                ? "text-[#7ac943]"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>

                            <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                                <EllipsisVertical size={26} className="text-gray-800" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Backdrop */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[99] lg:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Side drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 min-w-[260px] bg-white z-[100] transition-transform duration-300 lg:hidden flex flex-col shadow-2xl ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Menu</span>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <X size={24} className="text-gray-800" />
                    </button>
                </div>

                <div className="flex flex-col px-6 overflow-y-auto flex-1">
                    {user && (
                        <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                            {user?.user_metadata?.avatar_url ? (
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt={user.user_metadata.full_name ?? "Avatar"}
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                />
                            ) : (
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7ac943] text-sm font-bold text-white shrink-0">
                                    {(
                                        user?.user_metadata?.full_name?.[0] ??
                                        user?.email?.[0] ??
                                        "U"
                                    ).toUpperCase()}
                                </span>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user?.user_metadata?.full_name ?? user?.email}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                    )}

                    {visibleLinks.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);
                        const dropdownLinks =
                            item.label === "PROJECTS"
                                ? PROJECTS_LINKS
                                : item.label === "FORMS"
                                ? FORMS_LINKS
                                : [];

                        if (item.hasDropdown) {
                            const isOpen = mobileExpanded === item.label;
                            return (
                                <div key={item.label} className="border-b border-gray-100">
                                    <button
                                        onClick={() => toggleMobile(item.label)}
                                        className={`w-full flex items-center justify-between py-5 font-semibold text-sm ${
                                            isActive ? "text-[#7ac943]" : "text-gray-800"
                                        }`}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 text-[#7ac943] ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="flex flex-col gap-1 pb-4 pl-2">
                                            {dropdownLinks.map(({ label, href }) => (
                                                <Link
                                                    key={label}
                                                    href={href}
                                                    onClick={() => setMenuOpen(false)}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#7ac943] rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ac943] flex-shrink-0" />
                                                    {label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`py-5 border-b border-gray-100 font-semibold text-sm ${
                                    isActive ? "text-[#7ac943]" : "text-gray-800"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {user && (
                        <Link
                            href="/settings"
                            onClick={() => setMenuOpen(false)}
                            className="py-5 border-b border-gray-100 font-semibold text-sm text-gray-800 hover:text-[#7ac943] transition-colors"
                        >
                            SETTINGS
                        </Link>
                    )}

                    <div className="mt-6 flex flex-col gap-3 pb-6">
                        <Link
                            href="mailto:support@datacollector.app"
                            className="flex items-center gap-2"
                        >
                            <Mail className="w-3.5 h-3.5 text-[#7ac943]" strokeWidth={1.5} />
                            <span className="text-xs text-gray-500">support@datacollector.app</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
                    {user ? (
                        <button
                            onClick={() => { handleSignOut(); setMenuOpen(false); }}
                            className="flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-sm font-bold tracking-wide uppercase px-6 py-4 rounded-md w-full"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/auth/signin"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-[#7ac943] transition-colors text-gray-800 text-sm font-bold tracking-wide uppercase px-6 py-3.5 rounded-md w-full"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 bg-[#7ac943] hover:bg-[#6ab535] transition-colors text-white text-sm font-bold tracking-wide uppercase px-6 py-4 rounded-md w-full"
                            >
                                Get Started Free
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}