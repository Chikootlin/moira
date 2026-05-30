"use client";
import achievements from "@/data/achievements.json";

export default function AchievementsPage() {
  return (
    <>
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in-up">
        <p className="font-mono text-sm mb-3 text-[#00C3FE]">
          &gt; tree ~/achievements
        </p>
        <h1 className="font-display font-bold text-5xl mb-3 text-white">
          Unlockables &amp; Side Quests
        </h1>
        <p className="font-mono text-sm text-slate-400">
          A small trophy shelf of moments I&apos;m proud of.
        </p>
      </div>

      <div className="relative animate-stagger pl-10">
        <svg className="absolute left-0 top-0 h-full overflow-visible pointer-events-none" width="16" style={{ left: "0px" }}>
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        <div className="space-y-6">
          {[...achievements].sort((a, b) => b.id - a.id).map((item) => (
            <div key={item.id} className="relative flex items-center">
              <div className="absolute w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#0d1526] flex items-center justify-center z-10 -left-10">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"/>
              </div>

              <div className="w-full group rounded-xl border border-white/10 bg-[#0d1526] p-6 transition-colors duration-200 hover:border-cyan-400/40">
                <p className="font-mono text-xs mb-2 text-slate-400">
                  {item.date.replace("-", " - ")}
                </p>
                <h3 className="font-display font-bold text-xl mb-2 text-white">
                  {item.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}