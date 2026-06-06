import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import BlogCard from "@/components/BlogCard";
import SkillsOrbit from "@/components/SkillsOrbit";
import HeroButtons from "@/components/HeroButtons";
import { ArrowRight } from "lucide-react";

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Hero */}
        <section className="animate-fade-in-up">
          <p className="font-mono text-sm mb-4 text-[#00C3FE]">
            &gt; whoami --verbose
          </p>
          <h1 className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl mb-4 leading-none text-slate-200">
            Moira
          </h1>
          <p className="font-sans text-sm mb-6 text-slate-500">
            No idea what I&apos;m doing, but it looks intentional.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="font-mono text-xs px-4 py-1.5 rounded-full border text-blue-400 border-blue-400/20 bg-blue-400/10 transition-all duration-300 hover:bg-blue-400/20 hover:scale-105 hover:shadow-md hover:shadow-blue-400/20 cursor-default">
              Web Developer
            </span>
            <span className="font-mono text-xs px-4 py-1.5 rounded-full border text-purple-400 border-purple-400/20 bg-purple-400/10 transition-all duration-300 hover:bg-purple-400/20 hover:scale-105 hover:shadow-md hover:shadow-purple-400/20 cursor-default">
              CTF Player
            </span>
          </div>
          <HeroButtons />
        </section>

        {/* Skills */}
        <section>
          <SkillsOrbit />
        </section>

        {/* Latest blogs */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono text-sm mb-2 text-[#00C3FE]">
                &gt; ./blogs --latest
              </p>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-slate-200">
                Half Baked Thoughts
              </h2>
            </div>
            <Link href="/blogs" className="font-mono text-xs flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors duration-200 shrink-0 ml-4">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-stagger">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}