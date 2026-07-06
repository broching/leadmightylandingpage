import React from "react";

// A full-bleed background band. Sections alternate between two textures — a
// brighter engineering crosshatch and a calmer dot lattice — so scrolling reads
// as moving across two alternating sheets rather than one flat surface.
export type BandVariant = "grid" | "dots";

export function Band({
  variant,
  children,
  className = "",
  id,
}: {
  variant: BandVariant;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`lm-band lm-band--${variant} ${className}`}>
      {children}
    </div>
  );
}
