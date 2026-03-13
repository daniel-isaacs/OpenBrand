import type { LogoAsset } from "@/lib/types";

export function LogoDisplay({ logos }: { logos: LogoAsset[] }) {
  if (logos.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
        Logos
      </h3>
      <div className="flex flex-wrap gap-4">
        {logos.map((logo, i) => (
          <a
            key={i}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl border border-neutral-200 bg-[repeating-conic-gradient(#f3f4f6_0%_25%,#fff_0%_50%)] bg-[length:16px_16px] hover:border-neutral-400 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.url}
              alt={logo.alt || "Logo"}
              className="max-h-20 max-w-48 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {logo.type && (
              <span className="block mt-2 text-[10px] text-neutral-400 text-center">
                {logo.type}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
