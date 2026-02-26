import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EcoleT3PMonogram from "@/components/logo/EcoleT3PMonogram";

interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const PageLoader = ({ isLoading, onLoadingComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if (progress >= 100 && onLoadingComplete) {
      const timeout = setTimeout(onLoadingComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          {/* Background decorative elements */}
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Animated Logo */}
          <div className="relative mb-8">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-forest/20"
              style={{ width: 140, height: 140 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Spinning ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-gold"
              style={{ width: 140, height: 140 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* ECOLE T3P Icon */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: 140, height: 140 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    "drop-shadow(0 0 0 rgba(212, 168, 83, 0))",
                    "drop-shadow(0 0 15px rgba(212, 168, 83, 0.4))",
                    "drop-shadow(0 0 0 rgba(212, 168, 83, 0))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <EcoleT3PMonogram className="w-24 h-24" variant="color" />
              </motion.div>
            </motion.div>
          </div>

          {/* Brand name with staggered animation */}
          <motion.div
            className="flex items-center gap-1 mb-8"
            initial="hidden"
            animate="visible"
          >
            {"ECOLE T3P".split("").map((letter, index) => (
              <motion.span
                key={index}
                className={`text-3xl md:text-4xl font-black ${
                  letter === " " ? "w-3" : index < 5 ? "text-forest" : "text-gold"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.08,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading bar */}
          <div className="w-64 h-1.5 bg-forest/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-forest via-gold to-forest rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-4 text-warm-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Chargement en cours...
            </motion.span>
          </motion.p>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold/30"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
