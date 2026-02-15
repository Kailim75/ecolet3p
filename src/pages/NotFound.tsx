import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <title>Page introuvable — ECOLE T3P</title>
        <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée. Retrouvez nos formations Taxi, VTC et VMDTR à Montrouge." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="py-24 lg:py-32">
        <div className="container-custom text-center">
          <p className="text-8xl font-black text-primary/20 mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Page introuvable
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée. Explorez nos formations ou retournez à l'accueil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="btn-cta-orange px-6 py-3 text-sm font-bold rounded-lg inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Retour à l'accueil
            </Link>
            <Link
              to="/formations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
            >
              <Search className="w-4 h-4" /> Voir nos formations
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
