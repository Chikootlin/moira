"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/notion";

const CATEGORIES = ["All", "Writeups", "Reviews", "Notes", "Misc"];

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const filtered = active === "All" ? posts : posts.filter((p) => p.category?.toLowerCase() === active.toLowerCase());
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10 animate-fade-in-up">
          <p className="font-mono text-sm mb-3 text-[#00C3FE]">
            &gt; ls ~/blogs
          </p>
          <h1 className="font-display font-bold text-5xl mb-3 text-white">
            Half Baked Thoughts
          </h1>
          <p className="font-mono text-sm mb-6 text-slate-400">
            Just stuff that i like to post whatever is it.
          </p>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button key={cat} onClick={() => setActive(cat)} className={`font-mono text-xs px-3 py-1 rounded-full border transition-all duration-200 ${isActive ? "bg-cyan-400 text-black border-cyan-400" : "text-slate-400 border-white/10 hover:border-cyan-400/40 hover:text-cyan-400"}`}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#0d1526] h-64 animate-pulse"/>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-stagger">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}

            {filtered.length === 0 && (
              <p className="font-mono text-sm col-span-2 text-slate-400">
                No posts found in this category.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}