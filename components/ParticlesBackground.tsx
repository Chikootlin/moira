"use client";
import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    opacityDelta: number;
}

export default function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        };

        const createParticle = (): Particle => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.3,
        opacity: Math.random(),
        opacityDelta: (Math.random() - 0.5) * 0.01,
        });

        const init = () => {
        resize();
        const count = Math.floor((canvas.width * canvas.height) / 6000);
        particles = Array.from({ length: Math.min(count, 180) }, createParticle);
        };

        const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            // Bubble effect near mouse
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const bubbleRadius = 250;

            let renderOpacity = p.opacity;
            let renderSize = p.size;

            if (dist < bubbleRadius) {
            const factor = dist / bubbleRadius;
            renderOpacity = p.opacity * factor;
            renderSize = p.size * factor;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(renderSize, 0.1), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${Math.max(renderOpacity, 0)})`;
            ctx.fill();

            // Move
            p.x += p.vx;
            p.y += p.vy;
            p.opacity += p.opacityDelta;

            // Fade boundary
            if (p.opacity <= 0 || p.opacity >= 1) p.opacityDelta *= -1;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        animId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        };

        const handleClick = (e: MouseEvent) => {
        // Repulse on click
        const cx = e.clientX;
        const cy = e.clientY;
        particles.forEach((p) => {
            const dx = p.x - cx;
            const dy = p.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 400) {
            const force = (400 - dist) / 400;
            p.vx += (dx / dist) * force * 3;
            p.vy += (dy / dist) * force * 3;
            // Dampen velocity over time
            setTimeout(() => {
                p.vx *= 0.3;
                p.vy *= 0.3;
            }, 400);
            }
        });
        };

        const handleMouseLeave = () => {
        mouseX = -1000;
        mouseY = -1000;
        };

        init();
        draw();

        window.addEventListener("resize", init);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", init);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("click", handleClick);
        window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        />
    );
}