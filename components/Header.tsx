"use client";

import { useState } from "react";
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
import { useSession, signIn, signOut } from "next-auth/react";

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

function GoogleLogo() {
    return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

interface NavbarProps {
    activeProject?: string | null;
}

export default function Navbar({ activeProject = null }: NavbarProps) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [accountOpen, setAccountOpen] = useState(false);

    const toggleMobile = (label: string) =>
        setMobileExpanded((prev) => (prev === label ? null : label));

    const visibleLinks = NAV_LINKS.filter(
        (item) => !item.authOnly || session
    );

    return (
        <>
            {/* ── TOP BAR ── */}
            <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">

                    {/* Left — contact info */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="mailto:support@datacollector.app"
                            className="flex items-center gap-2 group"
                        >
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#7ac943] transition-colors flex-shrink-0">
                                <Mail className="w-3 h-3 text-[#7ac943]" strokeWidth={1.5} />
                            </span>
                            <span className="text-xs text-gray-600 group-hover:text-[#7ac943] transition-colors">
                                support@datacollector.app
                            </span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                                <Globe className="w-3 h-3 text-[#7ac943]" strokeWidth={1.5} />
                            </span>
                            <span className="text-xs text-gray-600">datacollector.app</span>
                        </div>

                        {/* Active project pill */}
                        {activeProject && (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-300">|</span>
                                <span className="text-xs text-[#7ac943] font-semibold">
                                    Project: {activeProject}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right — socials */}
                    <div className="flex items-center gap-2">
                        {SOCIALS.map(({ icon: Icon, label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                aria-label={label}
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#7ac943] hover:text-[#7ac943] transition-colors duration-200"
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
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* LOGO */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7ac943]">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                                    <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                    <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                    <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
                                </svg>
                            </span>
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-bold tracking-tight text-gray-900">Data Collector</span>
                                <span className="text-[10px] text-gray-400 tracking-wide">Data Collection</span>
                            </div>
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
                                            className={`flex items-center gap-1 text-sm font-semibold transition-colors ${isActive
                                                ? "text-[#7ac943]"
                                                : "text-gray-800 hover:text-[#7ac943]"
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

                                        {/* Active / hover underline */}
                                        <span
                                            className={`absolute left-0 -bottom-[21px] h-[2px] bg-[#7ac943] transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                                }`}
                                        />

                                        {/* DROPDOWN */}
                                        {item.hasDropdown && (
                                            <div className="absolute top-full left-0 mt-5 w-56 rounded-xl border border-gray-100 bg-white shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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

                        {/* DESKTOP — Auth */}
                        <div className="hidden lg:flex items-center gap-3">
                            {isLoading && (
                                <div className="h-9 w-28 rounded-md bg-gray-100 animate-pulse" />
                            )}

                            {/* Signed IN */}
                            {!isLoading && session && (
                                <div className="relative">
                                    <button
                                        onClick={() => setAccountOpen((p) => !p)}
                                        className="flex items-center gap-2 border border-gray-200 rounded-full pl-1 pr-3 py-1 hover:border-[#7ac943] transition-colors"
                                    >
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name ?? "Avatar"}
                                                width={28}
                                                height={28}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7ac943] text-xs font-bold text-white">
                                                {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                                            </span>
                                        )}
                                        <span className="text-xs font-semibold text-gray-800 max-w-[100px] truncate">
                                            {session.user?.name}
                                        </span>
                                        <ChevronDown
                                            size={13}
                                            className={`text-gray-400 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {accountOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl z-50 p-1">
                                            <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                                                <p className="text-xs font-semibold text-gray-900 truncate">{session.user?.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                                            </div>
                                            {[
                                                { label: "Dashboard", href: "/dashboard" },
                                                { label: "Projects", href: "/dashboard/projects" },
                                                { label: "Forms", href: "/dashboard/forms" },
                                                { label: "Submissions", href: "/dashboard/submissions" },
                                                { label: "Settings", href: "/settings" },
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
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Signed OUT */}
                            {!isLoading && !session && (
                                <>
                                    <button
                                        onClick={() => signIn("google")}
                                        className="text-sm font-semibold text-gray-700 hover:text-[#7ac943] transition-colors"
                                    >
                                        SIGN IN
                                    </button>
                                    <button
                                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                        className="inline-flex items-center gap-2 bg-[#7ac943] hover:bg-[#6ab535] transition-colors text-white text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded-md"
                                    >
                                        <GoogleLogo />
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>

                        {/* MOBILE — short links + hamburger */}
                        <div className="flex items-center gap-5 lg:hidden">

                            <Link
                                href="/"
                                className={`text-xs font-semibold ${pathname === "/" ? "text-[#7ac943]" : "text-gray-800"
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/dashboard/forms/new"
                                className={`text-xs font-semibold ${pathname === "/dashboard/forms/new" ? "text-[#7ac943]" : "text-gray-800"
                                    }`}
                            >
                                New Form
                            </Link>

                            <Link
                                href="/dashboard/forms"
                                className={`text-xs font-semibold ${pathname === "/dashboard/forms" ? "text-[#7ac943]" : "text-gray-800"
                                    }`}
                            >
                                My Forms
                            </Link>
                            {session && (
                                <>
                                    <Link
                                        href="/dashboard/projects"
                                        className={`text-xs font-semibold ${pathname.startsWith("/dashboard/projects")
                                            ? "text-[#7ac943]"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        href="/dashboard/forms"
                                        className={`text-xs font-semibold ${pathname.startsWith("/dashboard/forms")
                                            ? "text-[#7ac943]"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        Forms
                                    </Link>
                                </>
                            )}
                            <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                                <EllipsisVertical size={26} className="text-gray-800" />
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* ── MOBILE MENU OVERLAY ── */}
            {/* Backdrop */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[99] lg:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Side drawer — half width, pinned right */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 min-w-[260px] bg-white z-[100] transition-transform duration-300 lg:hidden flex flex-col shadow-2xl ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7ac943]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                                <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                                <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
                            </svg>
                        </span>
                        <span className="text-sm font-bold text-gray-900">Data Collector</span>
                    </Link>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <X size={28} className="text-gray-800" />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col px-6 overflow-y-auto flex-1">

                    {/* Signed-in user info */}
                    {session && (
                        <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                            {session.user?.image ? (
                                <Image src={session.user.image} alt={session.user.name ?? "Avatar"} width={36} height={36} className="rounded-full" />
                            ) : (
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7ac943] text-sm font-bold text-white shrink-0">
                                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                                </span>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                                <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
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
                                        className={`w-full flex items-center justify-between py-5 font-semibold text-sm ${isActive ? "text-[#7ac943]" : "text-gray-800"
                                            }`}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 text-[#7ac943] ${isOpen ? "rotate-180" : ""
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
                                className={`py-5 border-b border-gray-100 font-semibold text-sm ${isActive ? "text-[#7ac943]" : "text-gray-800"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Settings link when signed in */}
                    {session && (
                        <Link
                            href="/settings"
                            onClick={() => setMenuOpen(false)}
                            className="py-5 border-b border-gray-100 font-semibold text-sm text-gray-800 hover:text-[#7ac943] transition-colors"
                        >
                            SETTINGS
                        </Link>
                    )}

                    {/* Mobile contact info */}
                    <div className="mt-6 flex flex-col gap-3 pb-6">
                        <Link href="mailto:support@datacollector.app" className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-3.5 h-3.5 text-[#7ac943]" strokeWidth={1.5} />
                            </span>
                            <span className="text-xs text-gray-600">support@datacollector.app</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
                    {session ? (
                        <button
                            onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                            className="flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 transition-colors text-sm font-bold tracking-wide uppercase px-6 py-4 rounded-md w-full"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => signIn("google")}
                                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-[#7ac943] transition-colors text-gray-800 text-sm font-bold tracking-wide uppercase px-6 py-3.5 rounded-md w-full"
                            >
                                <GoogleLogo />
                                Sign In
                            </button>
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                className="flex items-center justify-center gap-2 bg-[#7ac943] hover:bg-[#6ab535] transition-colors text-white text-sm font-bold tracking-wide uppercase px-6 py-4 rounded-md w-full"
                            >
                                Get Started Free
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}