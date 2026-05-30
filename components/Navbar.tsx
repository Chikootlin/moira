"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="w-full bg-[#090F23] border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-wide text-slate-400">
            ~/
            <span className="text-[#00C3FE]">Moira</span>
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className={`font-mono text-sm transition-colors duration-200 no-underline ${isActive ? "text-blue-300" : "text-slate-400 hover:text-slate-200"}`}>
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