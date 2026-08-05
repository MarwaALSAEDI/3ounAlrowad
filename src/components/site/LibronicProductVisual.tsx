type LibronicProductVisualProps = {
  alt: string;
  category: string;
  format?: "square" | "portrait" | "landscape";
  height: number;
  image: string;
  model: string;
  width: number;
};

export function LibronicProductVisual({
  alt,
  category,
  format,
  height,
  image,
  model,
  width,
}: LibronicProductVisualProps) {
  return (
    <div className="relative isolate mx-3 mt-3 aspect-[4/5] overflow-hidden rounded-[1.45rem] border border-dark-garnet-900/15 bg-dark-garnet-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(175,0,0,0.38),transparent_36%),linear-gradient(145deg,#370000_0%,#120000_58%,#250000_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,171,171,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,171,171,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div className="absolute inset-2 overflow-hidden rounded-[1.1rem] bg-dark-garnet-200">
        <img
          src={image}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025] ${
            format === "landscape" ? "p-4" : "p-5"
          }`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-garnet-100/10 via-transparent to-dark-garnet-100/80"
        />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
        <span className="rounded-full border border-soft-blush-900/20 bg-dark-garnet-100/80 px-3 py-1.5 text-[10px] font-black text-soft-blush-900 shadow-soft backdrop-blur-md">
          {category}
        </span>
        <span
          aria-label="ليبرونك"
          className="font-display text-[11px] font-black tracking-[0.16em] text-[#d8b56a] [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]"
        >
          LIBRONIC
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <span
          dir="ltr"
          className="max-w-[62%] truncate rounded-full border border-soft-blush-900/15 bg-dark-garnet-100/85 px-3 py-1.5 text-[10px] font-black tracking-wide text-soft-blush-900 shadow-soft backdrop-blur-md"
        >
          {model}
        </span>
        <span className="relative h-7 w-16 shrink-0" aria-hidden="true">
          <svg
            viewBox="0 0 72 28"
            className="h-full w-full overflow-visible fill-none stroke-bright-fern-700"
          >
            <path
              d="M5 8c18-5 38-5 60 1-19-1-38 2-53 8 15-2 30-1 44 4"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
