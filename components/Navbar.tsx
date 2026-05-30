"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <>
      <nav ref={navRef} className="w-full bg-[#090F23] border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-wide text-slate-400">
            ~/
            <span className="text-[#00C3FE]">Moira</span>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className={`font-mono text-sm transition-colors duration-200 no-underline ${isActive ? "text-blue-300" : "text-slate-400 hover:text-slate-200"}`}>
                  {label}
                </Link>
              );
            })}
          </div>

          <button className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle menu" aria-expanded={isOpen}>
            <span className={`block h-px w-5 bg-slate-400 transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-1.75" : ""}`}/>
            <span className={`block h-px w-5 bg-slate-400 transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`}/>
            <span className={`block h-px w-5 bg-slate-400 transition-all duration-300 origin-center ${isOpen ? "-rotate-45 translate-y-1.75" : ""}`}/>
          </button>
        </div>

        <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col px-6 pb-4 gap-1 border-t border-white/[0.07]">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} onClick={() => setIsOpen(false)} className={`font-mono text-sm py-2.5 transition-colors duration-200 no-underline border-b border-white/4 last:border-0 ${isActive ? "text-blue-300" : "text-slate-400 hover:text-slate-200"}`}>
                  {isActive && <span className="text-[#00C3FE] mr-2">&gt;</span>}
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}