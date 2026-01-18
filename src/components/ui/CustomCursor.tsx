import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        target.classList.contains("card-livementor") ||
        target.classList.contains("btn-primary") ||
        target.classList.contains("btn-secondary");

      if (isInteractive) {
        setIsHovering(true);
        
        // Set custom text based on element type
        if (target.closest(".btn-primary") || target.classList.contains("btn-primary")) {
          setCursorText("→");
        } else if (target.closest(".card-livementor") || target.classList.contains("card-livementor")) {
          setCursorText("Voir");
        } else if (target.tagName === "A" || target.closest("a")) {
          setCursorText("");
        } else {
          setCursorText("");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseout", handleMouseOut);
    
    // Add listeners to interactive elements
    document.querySelectorAll("button, a, [role='button'], .cursor-pointer, .card-livementor, .btn-primary, .btn-secondary").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("button, a, [role='button'], .cursor-pointer, .card-livementor, .btn-primary, .btn-secondary").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter as EventListener);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleMouseOut);
      observer.disconnect();
      
      document.querySelectorAll("button, a, [role='button'], .cursor-pointer, .card-livementor, .btn-primary, .btn-secondary").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Inner dot */}
          <motion.div
            className="absolute rounded-full bg-gold"
            animate={{
              width: isHovering ? 50 : 8,
              height: isHovering ? 50 : 8,
              x: isHovering ? -25 : -4,
              y: isHovering ? -25 : -4,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
          
          {/* Text label */}
          {cursorText && (
            <motion.span
              className="absolute text-forest font-bold text-xs uppercase"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: -25,
                y: -25,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ 
                width: 50, 
                height: 50, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="rounded-full border-2 border-forest/50"
          animate={{
            width: isHovering ? 60 : 32,
            height: isHovering ? 60 : 32,
            x: isHovering ? -30 : -16,
            y: isHovering ? -30 : -16,
            opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
            borderColor: isHovering ? "rgba(212, 168, 83, 0.8)" : "rgba(27, 77, 62, 0.5)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
