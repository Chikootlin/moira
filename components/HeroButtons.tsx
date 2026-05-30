"use client";
import Link from "next/link";

export default function HeroButtons() {
  return (
    <>
      <div className="flex gap-3">
        <Link href="/projects" className="font-mono text-sm px-4 py-2 rounded border border-blue-400/30 bg-blue-400 text-black transition-all duration-200 hover:bg-blue-300 hover:scale-105 hover:shadow-md hover:shadow-blue-400/30">
          ls ~/projects
        </Link>

        <Link href="/blogs" className="font-mono text-sm px-4 py-2 rounded border border-white/10 bg-[#0d1526] text-white transition-all duration-200 hover:bg-[#1a2338] hover:scale-105 hover:shadow-md">
          ls ~/blogs
        </Link>
      </div>
    </>
  );
}