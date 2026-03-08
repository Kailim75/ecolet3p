import React, { useState, createContext, useContext, ReactNode, lazy, Suspense } from "react";

// Lazy-load the heavy modal (contains framer-motion, zod, supabase, etc.)
const LazyQuoteRequestModal = lazy(() => import("./QuoteRequestModal"));

interface QuoteModalContextType {
  openQuoteModal: (preselectedFormation?: string) => void;
  closeQuoteModal: () => void;
  isOpen: boolean;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  return context;
};

export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [preselectedFormation, setPreselectedFormation] = useState("");

  const openQuoteModal = (formation?: string) => {
    setPreselectedFormation(formation || "");
    setHasOpened(true);
    setIsOpen(true);
  };
  const closeQuoteModal = () => {
    setIsOpen(false);
    setPreselectedFormation("");
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal, isOpen }}>
      {children}
      {hasOpened && (
        <Suspense fallback={null}>
          <LazyQuoteRequestModal
            isOpen={isOpen}
            onClose={closeQuoteModal}
            preselectedFormation={preselectedFormation}
          />
        </Suspense>
      )}
    </QuoteModalContext.Provider>
  );
};
