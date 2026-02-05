import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
 import { ExternalLink, FileText, CreditCard, Printer, Car, Bike, Download } from "lucide-react";

const templates = [
  {
     title: "Formation Continue (Générique)",
     description: "Flyer A5 recto-verso regroupant toutes les formations continues (VTC 170€, Taxi/VMDTR 239€)",
    path: "/templates/flyer-formation-continue.html",
    icon: FileText,
    category: "Flyer Continue"
  },
  {
     title: "Formation Continue TAXI",
     description: "Flyer A5 recto-verso pour la formation continue Taxi - 239€",
     path: "/templates/flyer-continue-taxi.html",
     icon: Car,
     category: "Flyer Continue"
   },
   {
     title: "Formation Continue VTC",
     description: "Flyer A5 recto-verso pour la formation continue VTC - 170€",
     path: "/templates/flyer-continue-vtc.html",
     icon: Car,
     category: "Flyer Continue"
   },
   {
     title: "Formation Continue VMDTR",
     description: "Flyer A5 recto-verso pour la formation continue Moto-Taxi - 239€",
     path: "/templates/flyer-continue-vmdtr.html",
     icon: Bike,
     category: "Flyer Continue"
   },
   {
    title: "Flyer Formation Initiale",
    description: "Flyer A5 pour les formations initiales Taxi/VTC",
    path: "/templates/flyer-formation-initiale.html",
    icon: FileText,
    category: "Flyer"
  },
  {
    title: "Flyer Récupération de Points",
    description: "Flyer A5 pour les stages de récupération de points",
    path: "/templates/flyer-recuperation-points.html",
    icon: FileText,
    category: "Flyer"
  },
  {
    title: "Flyer VMDTR",
    description: "Flyer A5 pour la formation taxi moto (VMDTR)",
    path: "/templates/flyer-vmdtr.html",
    icon: FileText,
    category: "Flyer"
  },
  {
    title: "Carte de Visite",
    description: "Carte de visite professionnelle ECOLE T3P",
    path: "/templates/carte-visite-ecole-t3p.html",
    icon: CreditCard,
    category: "Document"
  },
  {
    title: "Contrat de Formation",
    description: "Modèle de contrat de formation professionnelle",
    path: "/templates/contrat-ecole-t3p.html",
    icon: FileText,
    category: "Document"
  },
  {
    title: "Attestation de Formation",
    description: "Attestation de suivi de formation",
    path: "/templates/attestation-ecole-t3p.html",
    icon: FileText,
    category: "Document"
  },
  {
    title: "Flyer Général (simple)",
    description: "Flyer A5 recto simple - version basique",
    path: "/templates/flyer-ecole-t3p.html",
    icon: FileText,
    category: "Flyer"
  },
  {
    title: "Flyer Générique (Recto-Verso)",
    description: "Flyer A5 recto-verso complet avec toutes les formations et tarifs",
    path: "/templates/flyer-generique-ecole-t3p.html",
    icon: FileText,
    category: "Flyer Générique"
  }
];

const Templates = () => {
   const flyers = templates.filter(t => t.category === "Flyer" || t.category === "Flyer Continue");
   const continueFlyers = templates.filter(t => t.category === "Flyer Continue");
   const otherFlyers = templates.filter(t => t.category === "Flyer");
   const genericFlyers = templates.filter(t => t.category === "Flyer Générique");
  const documents = templates.filter(t => t.category === "Document");

  return (
    <Layout>
      <Helmet>
        <title>Templates Marketing | ECOLE T3P</title>
        <meta name="description" content="Accédez aux templates marketing ECOLE T3P : flyers, cartes de visite, contrats et attestations." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-cream py-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-forest mb-4">
              Templates Marketing
            </h1>
            <p className="text-forest/70 text-lg max-w-2xl mx-auto">
              Accédez à tous les supports de communication ECOLE T3P prêts à imprimer
            </p>
          </div>

          {/* Print All Button */}
          <div className="flex justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-forest font-bold gap-2"
            >
              <a href="/templates/print-all.html" target="_blank" rel="noopener noreferrer">
                <Printer className="w-5 h-5" />
                 Imprimer tous les flyers
              </a>
            </Button>
          </div>

           {/* Formation Continue Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-forest mb-6 flex items-center gap-2">
               <Car className="w-6 h-6 text-gold" />
               Flyers Formation Continue (Recto-Verso)
            </h2>
             <p className="text-forest/60 text-sm mb-4">3 flyers distincts par métier, format A5 recto-verso prêts à l'impression PDF haute qualité.</p>
             
             {/* Export PDF Button */}
             <div className="mb-6">
               <Button
                 asChild
                 size="lg"
                className="bg-gold hover:bg-gold/90 text-forest font-bold gap-2 shadow-lg"
               >
                 <a href="/templates/print-formation-continue.html" target="_blank" rel="noopener noreferrer">
                   <Download className="w-5 h-5" />
                   Exporter les 3 flyers en PDF
                 </a>
               </Button>
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {continueFlyers.map((template) => (
                <Card key={template.path} className="bg-white border-forest/10 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                     <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4">
                       <template.icon className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-bold text-forest mb-2">{template.title}</h3>
                    <p className="text-forest/60 text-sm mb-4">{template.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-forest/20 hover:bg-forest hover:text-cream"
                    >
                      <a href={template.path} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Ouvrir
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
           </section>

           {/* Flyer Générique Section */}
           <section className="mb-16">
             <h2 className="text-2xl font-bold text-forest mb-6 flex items-center gap-2">
               <FileText className="w-6 h-6 text-gold" />
               Flyer Générique (Recto-Verso)
             </h2>
             <p className="text-forest/60 text-sm mb-4">Flyer complet présentant toutes les formations et tarifs ECOLE T3P.</p>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {genericFlyers.map((template) => (
                 <Card key={template.path} className="bg-white border-forest/10 hover:shadow-lg transition-shadow border-2 border-gold/30">
                   <CardContent className="p-6">
                     <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                       <template.icon className="w-6 h-6 text-gold" />
                     </div>
                     <h3 className="font-bold text-forest mb-2">{template.title}</h3>
                     <p className="text-forest/60 text-sm mb-4">{template.description}</p>
                     <Button
                       asChild
                       size="sm"
                       className="w-full bg-gold hover:bg-gold/90 text-forest font-bold"
                     >
                       <a href={template.path} target="_blank" rel="noopener noreferrer" className="gap-2">
                         <ExternalLink className="w-4 h-4" />
                         Ouvrir le flyer
                       </a>
                     </Button>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </section>

           {/* Other Flyers Section */}
           <section className="mb-16">
             <h2 className="text-2xl font-bold text-forest mb-6 flex items-center gap-2">
               <FileText className="w-6 h-6 text-gold" />
               Autres Flyers Promotionnels
             </h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {otherFlyers.map((template) => (
                 <Card key={template.path} className="bg-white border-forest/10 hover:shadow-lg transition-shadow">
                   <CardContent className="p-6">
                     <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                       <template.icon className="w-6 h-6 text-gold" />
                     </div>
                     <h3 className="font-bold text-forest mb-2">{template.title}</h3>
                     <p className="text-forest/60 text-sm mb-4">{template.description}</p>
                     <Button
                       asChild
                       variant="outline"
                       size="sm"
                       className="w-full border-forest/20 hover:bg-forest hover:text-cream"
                     >
                       <a href={template.path} target="_blank" rel="noopener noreferrer" className="gap-2">
                         <ExternalLink className="w-4 h-4" />
                         Ouvrir
                       </a>
                     </Button>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </section>
 
          {/* Documents Section */}
          <section>
            <h2 className="text-2xl font-bold text-forest mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-gold" />
              Documents Administratifs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((template) => (
                <Card key={template.path} className="bg-white border-forest/10 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4">
                      <template.icon className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-bold text-forest mb-2">{template.title}</h3>
                    <p className="text-forest/60 text-sm mb-4">{template.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-forest/20 hover:bg-forest hover:text-cream"
                    >
                      <a href={template.path} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Ouvrir
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Info */}
          <div className="mt-12 p-6 bg-forest/5 rounded-xl text-center">
            <p className="text-forest/70 text-sm">
              💡 <strong>Conseil :</strong> Pour une impression professionnelle, utilisez du papier 170g/m² en mode CMJN.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
