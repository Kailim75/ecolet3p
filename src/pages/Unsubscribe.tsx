import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type UnsubscribeStatus = "loading" | "success" | "already" | "error" | "invalid";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<UnsubscribeStatus>("loading");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    const processUnsubscribe = async () => {
      if (!token) {
        setStatus("invalid");
        setMessage("Lien de désinscription invalide. Aucun token fourni.");
        return;
      }

      // Validate UUID format client-side
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(token)) {
        setStatus("invalid");
        setMessage("Lien de désinscription invalide.");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          "unsubscribe-newsletter",
          {
            body: { token },
          }
        );

        if (error) {
          console.error("Unsubscribe error:", error);
          setStatus("error");
          setMessage("Une erreur est survenue lors de la désinscription.");
          return;
        }

        if (data.success) {
          if (data.message.includes("déjà")) {
            setStatus("already");
          } else {
            setStatus("success");
          }
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error || "Une erreur est survenue.");
        }
      } catch (err) {
        console.error("Unsubscribe exception:", err);
        setStatus("error");
        setMessage("Une erreur est survenue lors de la désinscription.");
      }
    };

    processUnsubscribe();
  }, [token]);

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-16 h-16 text-forest animate-spin" />;
      case "success":
      case "already":
        return <CheckCircle className="w-16 h-16 text-forest" />;
      case "error":
      case "invalid":
        return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Traitement en cours...";
      case "success":
        return "Désinscription réussie";
      case "already":
        return "Déjà désinscrit(e)";
      case "error":
      case "invalid":
        return "Erreur";
    }
  };

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-elegant p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            {getIcon()}
          </motion.div>

          <h1 className="text-2xl font-bold text-forest mb-4">{getTitle()}</h1>
          
          <p className="text-warm-gray-600 mb-8">{message}</p>

          {status !== "loading" && (
            <div className="space-y-4">
              <Link to="/blog">
                <Button className="w-full btn-primary">
                  <Mail className="w-4 h-4 mr-2" />
                  Retourner au blog
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="w-full">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          )}

          {(status === "success" || status === "already") && (
            <p className="text-sm text-warm-gray-500 mt-6">
              Vous pouvez vous réinscrire à tout moment depuis notre blog.
            </p>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Unsubscribe;
