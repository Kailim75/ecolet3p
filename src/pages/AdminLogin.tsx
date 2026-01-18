import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { user, isAdmin, isLoading, signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Email ou mot de passe incorrect");
        } else {
          setError(signInError.message);
        }
        return;
      }

      // Wait for auth state to update and check admin role
      // The useEffect will handle navigation
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message);
        return;
      }

      setResetSuccess(true);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest to-forest-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-elegant p-8 md:p-10">
          <AnimatePresence mode="wait">
            {showResetForm ? (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    {resetSuccess ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Mail className="w-8 h-8 text-forest" />
                    )}
                  </motion.div>
                  <h1 className="text-2xl font-bold text-forest mb-2">
                    {resetSuccess ? "Email envoyé !" : "Mot de passe oublié"}
                  </h1>
                  <p className="text-warm-gray-600">
                    {resetSuccess 
                      ? "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe."
                      : "Entrez votre email pour recevoir un lien de réinitialisation"
                    }
                  </p>
                </div>

                {!resetSuccess ? (
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <label htmlFor="reset-email" className="block text-sm font-medium text-warm-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="admin@exemple.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      className="w-full btn-primary h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer le lien"
                      )}
                    </Button>
                  </form>
                ) : null}

                <button
                  onClick={() => {
                    setShowResetForm(false);
                    setResetSuccess(false);
                    setError("");
                  }}
                  className="flex items-center gap-2 text-forest hover:underline font-medium mt-6 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <Lock className="w-8 h-8 text-forest" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-forest mb-2">Administration</h1>
                  <p className="text-warm-gray-600">Connectez-vous pour accéder au tableau de bord</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-warm-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-warm-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetForm(true);
                        setError("");
                      }}
                      className="text-sm text-forest hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full btn-primary h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6 space-y-2">
                  <p className="text-warm-gray-500 text-sm">
                    Pas encore de compte ?{" "}
                    <button
                      onClick={() => navigate("/admin-signup")}
                      className="text-forest hover:underline font-medium"
                    >
                      Créer un compte admin
                    </button>
                  </p>
                  <p className="text-warm-gray-400 text-xs">
                    Accès réservé aux administrateurs
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
