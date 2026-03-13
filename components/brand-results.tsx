import type { BrandExtractionResult } from "@/lib/types";
import { ColorPalette } from "./color-palette";
import { LogoDisplay } from "./logo-display";
import { BackdropGallery } from "./backdrop-gallery";

export function BrandResults({ data }: { data: BrandExtractionResult }) {
  return (
    <div className="space-y-8">
      {data.brandName && (
        <h2 className="text-2xl font-semibold text-neutral-900">
          {data.brandName}
        </h2>
      )}
      <LogoDisplay logos={data.logos} />
      <ColorPalette colors={data.colors} />
      <BackdropGallery backdrops={data.backdrops} />
    </div>
  );
}
