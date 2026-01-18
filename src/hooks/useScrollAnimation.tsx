import { useInView, type Easing } from "framer-motion";
import { useRef } from "react";

// Custom easing as tuple for TypeScript compatibility
const smoothEase: Easing = [0.22, 1, 0.36, 1];

export const useScrollAnimation = (threshold = 0.1, once = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-50px",
    amount: threshold 
  });

  return { ref, isInView };
};

export const fadeUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase
    }
  }
};

export const fadeInVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export const scaleUpVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase
    }
  }
};

export const slideInLeftVariants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase
    }
  }
};

export const slideInRightVariants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase
    }
  }
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase
    }
  }
};

export const cardHoverVariants = {
  rest: { 
    y: 0,
    boxShadow: "0 2px 15px rgba(27, 77, 62, 0.05)"
  },
  hover: { 
    y: -8,
    boxShadow: "0 20px 40px rgba(27, 77, 62, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
};

export default useScrollAnimation;
