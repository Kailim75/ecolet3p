import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  webpSrcSet?: string;
  srcSet?: string;
  onError?: () => void;
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  priority = false,
  sizes = "100vw",
  width,
  height,
  webpSrcSet,
  srcSet,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement>(null);

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
      { rootMargin: "200px", threshold: 0 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgElRef.current?.complete && imgElRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [isInView]);

  const handleLoad = useCallback(() => setIsLoaded(true), []);

  const imgElement = (
    <img
      ref={imgElRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
      fetchPriority={priority ? "high" : "auto"}
      onLoad={handleLoad}
      onError={onError}
      className={cn(
        "w-full h-full object-cover transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );

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

      {isInView && (
        webpSrcSet ? (
          <picture>
            <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
            {imgElement}
          </picture>
        ) : (
          imgElement
        )
      )}
    </div>
  );
};

export default OptimizedImage;
