import type { CSSProperties } from "react";

type ResponsiveImageProps = {
  src: string;
  fallbackSrc: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
  style?: CSSProperties;
};

export function ResponsiveImage({
  src,
  fallbackSrc,
  width,
  height,
  alt,
  className,
  sizes,
  fill = false,
  priority = false,
  loading,
  style,
}: ResponsiveImageProps) {
  const imageStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style ?? {};
  const maximumOptimizedWidth = Math.min(1920, Math.max(256, width));
  const responsiveWidths = [96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1600, 1920]
    .filter((candidate) => candidate <= maximumOptimizedWidth);
  const optimizedSrcSet = responsiveWidths
    .map((candidate) => `/_next/image?url=${encodeURIComponent(src)}&w=${candidate}&q=82 ${candidate}w`)
    .join(", ");

  return (
    <picture>
      <source srcSet={optimizedSrcSet} type="image/webp" sizes={sizes} />
      <img
        src={fallbackSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}
        sizes={sizes}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={imageStyle}
      />
    </picture>
  );
}
