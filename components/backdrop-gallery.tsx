import type { BackdropAsset } from "@/src/types";

export function BackdropGallery({ backdrops }: { backdrops: BackdropAsset[] }) {
  if (backdrops.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
        Background Images
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {backdrops.map((backdrop, i) => (
          <a
            key={i}
            href={backdrop.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:border-neutral-400 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backdrop.url}
              alt={backdrop.description || "Background image"}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.style.display =
                  "none";
              }}
            />
            {backdrop.description && (
              <span className="block px-3 py-1.5 text-xs text-neutral-500">
                {backdrop.description}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
