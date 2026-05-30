"use client";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/notion";
import { format } from "date-fns";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = post.date ? format(new Date(post.date), "MMM dd, yyyy").toUpperCase() : "";
  return (
    <Link href={`/blogs/${post.slug}`} className="group block rounded-xl overflow-hidden border border-white/10 bg-[#0d1526] transition-colors duration-200 hover:border-cyan-400/40">
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {post.cover ? (
          <Image src={post.cover} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#111827]">
            <span className="font-mono text-xs text-slate-500">
              {post.category || "no cover"}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-slate-500">
            {date}
          </span>

          {post.category && (
            <>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                {post.category}
              </span>
            </>
          )}
        </div>

        <h3 className="font-display font-bold text-base mb-2 leading-snug text-white">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="font-mono text-xs leading-relaxed line-clamp-3 text-slate-400">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}