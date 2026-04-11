import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredStrategy = "visible" | "idle";

interface DeferredRenderProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  strategy?: DeferredStrategy;
  timeoutMs?: number;
}

const DeferredRender = ({
  children,
  fallback = null,
  className,
  rootMargin = "320px 0px",
  strategy = "visible",
  timeoutMs = 1200,
}: DeferredRenderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isReady) return;

    if (strategy === "idle") {
      const timer = window.setTimeout(() => setIsReady(true), timeoutMs);
      return () => window.clearTimeout(timer);
    }

    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setIsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isReady, rootMargin, strategy, timeoutMs]);

  return (
    <div ref={containerRef} className={className}>
      {isReady ? children : fallback}
    </div>
  );
};

export default DeferredRender;
