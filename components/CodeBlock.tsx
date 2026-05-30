"use client";
import { useState } from "react";

interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="my-6 rounded-xl overflow-hidden border border-[#1e2d4d]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#162040] border-b border-[#1e2d4d]">
          <span className="font-mono text-xs text-[#6b7fa3]">
            {language || "code"}
          </span>
          <button onClick={handleCopy} className={`font-mono text-xs px-2 py-0.5 rounded transition-colors duration-200 bg-transparent border-none cursor-pointer ${copied ? "text-[#4dc9e6]" : "text-[#6b7fa3] hover:text-[#e2e8f0]"}`}>
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>

        {/* Code body */}
        <pre className="m-0 p-4 bg-[#111c33] overflow-x-auto leading-7">
          <code className="font-mono text-[0.82rem] text-[#e2e8f0] bg-transparent whitespace-pre block">
            {code}
          </code>
        </pre>
      </div>
    </>
  );
}