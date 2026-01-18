import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Eye, EyeOff, Key, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Email invalide").max(255, "Email trop long"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").max(100, "Mot de passe trop long"),
  confirmPassword: z.string(),
  secretKey: z.string().min(1, "La clé secrète est requise").max(200, "Clé trop longue"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingSecret, setIsVerifyingSecret] = useState(false);
  const [secretVerified, setSecretVerified] = useState(false);
  
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const verifySecretKey = async () => {
    if (!secretKey.trim()) {
      setErrors({ secretKey: "La clé secrète est requise" });
      return;
    }

    setIsVerifyingSecret(true);
    setErrors({});

    try {
      const { data, error } = await supabase.functions.invoke("verify-admin-secret", {
        body: { secret: secretKey },
      });

      if (error) throw error;

      if (data.valid) {
        setSecretVerified(true);
        toast.success("Clé secrète validée !");
      } else {
        setErrors({ secretKey: "Clé secrète invalide" });
        toast.error("Clé secrète invalide");
      }
    } catch (error) {
      console.error("Error verifying secret:", error);
      setErrors({ secretKey: "Erreur lors de la vérification" });
      toast.error("Erreur lors de la vérification de la clé");
    } finally {
      setIsVerifyingSecret(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      signupSchema.parse({ email, password, confirmPassword, secretKey });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    if (!secretVerified) {
      setErrors({ secretKey: "Veuillez d'abord vérifier la clé secrète" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Add admin role to the user
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({ user_id: authData.user.id, role: "admin" as const });

        if (roleError) {
          console.error("Error adding admin role:", roleError);
          toast.error("Compte créé mais erreur lors de l'attribution du rôle admin");
        } else {
          toast.success("Compte administrateur créé avec succès !");
          navigate("/admin-login");
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes("already registered")) {
        setErrors({ email: "Cet email est déjà utilisé" });
      } else {
        toast.error(error.message || "Erreur lors de la création du compte");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Créer un compte Admin</h1>
            <p className="text-muted-foreground text-center mt-2">
              Une clé secrète est requise pour créer un compte administrateur
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Secret Key Section */}
            <div className="space-y-2">
              <Label htmlFor="secretKey" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Clé secrète d'administration
              </Label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="secretKey"
                    type={showSecretKey ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => {
                      setSecretKey(e.target.value);
                      setSecretVerified(false);
                    }}
                    placeholder="Entrez la clé secrète"
                    className={`pr-10 ${errors.secretKey ? "border-destructive" : ""} ${secretVerified ? "border-green-500" : ""}`}
                    disabled={secretVerified}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button
                  type="button"
                  onClick={verifySecretKey}
                  disabled={isVerifyingSecret || secretVerified}
                  variant={secretVerified ? "outline" : "secondary"}
                  className="shrink-0"
                >
                  {isVerifyingSecret ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : secretVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    "Vérifier"
                  )}
                </Button>
              </div>
              {errors.secretKey && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.secretKey}
                </p>
              )}
              {secretVerified && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Clé secrète validée
                </p>
              )}
            </div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: secretVerified ? 1 : 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={errors.email ? "border-destructive" : ""}
                disabled={!secretVerified}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: secretVerified ? 1 : 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                  disabled={!secretVerified}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: secretVerified ? 1 : 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  disabled={!secretVerified}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </motion.div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !secretVerified}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  Création en cours...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Créer le compte administrateur
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <button
                onClick={() => navigate("/admin-login")}
                className="text-primary hover:underline font-medium"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;
