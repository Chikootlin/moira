"use client";
import projects from "@/data/projects.json";
import { format } from "date-fns";
import { GitBranch, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10 animate-fade-in-up">
          <p className="font-mono text-sm mb-3 text-cyan-400">
            &gt; ls ~/projects
          </p>

          <h1 className="font-display font-bold text-5xl mb-3 text-white">
            Things I Build On Purpose
          </h1>

          <p className="font-mono text-sm text-slate-400">
            A mix of side quests, work things, or a request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-stagger">
          {projects.map((project) => {const date = project.date ? format(new Date(project.date), "MMM dd, yyyy").toUpperCase() : "";
            return (
              <div key={project.id} className="group rounded-xl border border-white/10 bg-[#0d1526] overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
                {/* Cover */}
                <div className="relative aspect-video overflow-hidden bg-[#111827]">
                  {project.cover ? (
                    <Image src={project.cover} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-xs text-slate-500">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-slate-500">
                      {date}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base mb-2 text-white">
                    {project.title}
                  </h3>

                  <p className="font-mono text-xs leading-relaxed mb-4 flex-1 text-slate-400 text-justify">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded border border-white/10 bg-[#0b1220] text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 ml-2 shrink-0">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                          <GitBranch size={16} />
                        </a>
                      )}

                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}