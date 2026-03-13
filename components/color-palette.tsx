"use client";

import type { ColorAsset } from "@/src/types";
import { useState } from "react";

export function ColorPalette({ colors }: { colors: ColorAsset[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  if (colors.length === 0) return null;

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
        Colors
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => copy(color.hex)}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-xl shadow-sm border border-neutral-200 transition-transform group-hover:scale-110"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-xs font-mono text-neutral-600">
              {copied === color.hex ? "Copied!" : color.hex}
            </span>
            {color.usage && (
              <span className="text-[10px] text-neutral-400">{color.usage}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
