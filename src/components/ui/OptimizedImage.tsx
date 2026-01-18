import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  priority?: boolean;
  sizes?: string;
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

// Check if browser supports WebP
const supportsWebP = (() => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

// Generate WebP source path from original
const getWebPSource = (src: string): string | null => {
  // Only convert jpg, jpeg, png images
  const supportedExtensions = /\.(jpg|jpeg|png)$/i;
  if (!supportedExtensions.test(src)) return null;
  
  return src.replace(supportedExtensions, '.webp');
};

const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  priority = false,
  sizes = "100vw",
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [useWebP, setUseWebP] = useState(supportsWebP);
  const imgRef = useRef<HTMLDivElement>(null);

  const webPSrc = useMemo(() => getWebPSource(src), [src]);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Handle WebP loading error - fallback to original
  const handleWebPError = () => {
    setUseWebP(false);
  };

  const imageSrc = useWebP && webPSrc ? webPSrc : src;

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Blur placeholder */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-forest/10 to-gold/10 transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted" />
      )}

      {/* Picture element with WebP support */}
      {isInView && (
        <picture>
          {webPSrc && (
            <source
              srcSet={webPSrc}
              type="image/webp"
            />
          )}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={handleWebPError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
