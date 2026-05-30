"use client";
import { useEffect, useRef } from "react";

const skills = [
  // Web
  { label: "HTML", icon: "/icons/html.svg", angle: 0, r: 80, size: 24 },
  { label: "CSS", icon: "/icons/css.svg", angle: 60, r: 80, size: 24 },
  { label: "JavaScript", icon: "/icons/js.svg", angle: 120, r: 80, size: 24 },
  { label: "TypeScript", icon: "/icons/typescript.svg", angle: 180, r: 80, size: 24 },
  { label: "Next.js", icon: "/icons/nextjs.svg", angle: 240, r: 80, size: 24 },

  // Backend or Offsec
  { label: "PHP", icon: "/icons/php.svg", angle: 40, r: 120, size: 24 },
  { label: "Python", icon: "/icons/python.svg", angle: 140, r: 120, size: 24 },
  { label: "MySQL", icon: "/icons/mysql.svg", angle: 240, r: 120, size: 24 },
  { label: "Ghidra", icon: "/icons/ghidra.svg", angle: 340, r: 120, size: 24 },

  // Low Level Lang or Security
  { label: "C", icon: "/icons/c.svg", angle: 20, r: 160, size: 24 },
  { label: "C++", icon: "/icons/cpp.svg", angle: 200, r: 160, size: 24 },
  { label: "C#", icon: "/icons/csharp.svg", angle: 500, r: 160, size: 24 },
  { label: "Wireshark", icon: "/icons/wireshark.svg", angle: 600, r: 160, size: 24 },
];

export default function SkillsOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    let tick = 0;

    const images = skills.map((skill) => {
      const img = new Image();
      img.src = skill.icon;
      return img;
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      [80, 120, 160].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(30,45,77,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#4dc9e6";
      ctx.fill();

      skills.forEach((skill, i) => {
        let speed = 0.001;
        if (skill.r === 80) speed = 0.002;
        else if (skill.r === 120) speed = 0.0015;
        else speed = 0.001;

        const dir = i % 2 === 0 ? 1 : -1;

        const rad =
          ((skill.angle + tick * speed * dir * 180) / 180) * Math.PI;

        const x = cx + Math.cos(rad) * skill.r;
        const y = cy + Math.sin(rad) * skill.r;

        const img = images[i];

        if (img.complete && img.naturalWidth != 0) {
          ctx.shadowColor = "#4dc9e6";
          ctx.shadowBlur = 12;

          ctx.drawImage(
            img,
            x - skill.size / 2,
            y - skill.size / 2,
            skill.size,
            skill.size
          );

          ctx.shadowBlur = 0;
        }
      });

      tick += 0.5;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1526] overflow-hidden">
      <div className="px-5 pt-4 pb-2">
        <p className="font-mono text-xs text-slate-400">
          PERSONAL &nbsp;-&nbsp; SKILLS
        </p>
      </div>
      <canvas ref={canvasRef} width={560} height={320} className="w-full"/>
    </div>
  );
}