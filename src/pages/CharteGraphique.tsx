import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Download, Palette, Type, Layout, FileText, 
  CheckCircle, XCircle, Copy, Check, ExternalLink, Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const CharteGraphique = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    toast.success(`${label} copié !`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = {
    primary: [
      { name: "Forest", hex: "#1B4D3E", hsl: "158° 54% 20%", usage: "Titres, header, footer" },
      { name: "Forest Light", hex: "#2A6B54", hsl: "159° 44% 29%", usage: "Hover states" },
      { name: "Forest Dark", hex: "#143D31", hsl: "163° 51% 16%", usage: "Pressed states" },
    ],
    secondary: [
      { name: "Cream", hex: "#F5EBD7", hsl: "40° 52% 90%", usage: "Background principal" },
      { name: "Cream Light", hex: "#FBF7EF", hsl: "40° 50% 96%", usage: "Cards, zones claires" },
      { name: "Cream Dark", hex: "#E8DCC4", hsl: "40° 44% 84%", usage: "Séparateurs" },
    ],
    accent: [
      { name: "Gold", hex: "#D4A853", hsl: "40° 60% 58%", usage: "Boutons CTA, badges" },
      { name: "Gold Light", hex: "#E4BE73", hsl: "40° 65% 67%", usage: "Hover states" },
      { name: "Gold Dark", hex: "#C49843", hsl: "40° 55% 52%", usage: "Pressed states" },
    ],
  };

  const typography = [
    { element: "Display 1", font: "Plus Jakarta Sans", size: "72px", weight: "900", sample: "Campus T3P" },
    { element: "H1", font: "Plus Jakarta Sans", size: "40px", weight: "800", sample: "Formation VTC" },
    { element: "H2", font: "Plus Jakarta Sans", size: "32px", weight: "700", sample: "Nos avantages" },
    { element: "H3", font: "Plus Jakarta Sans", size: "24px", weight: "700", sample: "Prérequis" },
    { element: "Body", font: "Inter", size: "16px", weight: "400", sample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { element: "Button", font: "Inter", size: "14px", weight: "700", sample: "PRENDRE RENDEZ-VOUS" },
  ];

  const downloadMarkdown = () => {
    const link = document.createElement('a');
    link.href = '/charte-graphique-campus-t3p.md';
    link.download = 'charte-graphique-campus-t3p.md';
    link.click();
    toast.success("Téléchargement lancé !");
  };

  return (
    <>
      <Helmet>
        <title>Charte Graphique - Campus T3P</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-forest text-cream py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-cream mb-4">
                Charte Graphique
              </h1>
              <p className="text-cream/80 text-lg max-w-2xl mx-auto">
                Guide complet de l'identité visuelle Campus T3P
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={downloadMarkdown}
                  className="btn-accent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le document complet
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="bg-cream/10 border-cream/30 text-cream hover:bg-cream/20"
                >
                  <Link to="/logo-export">
                    <Image className="w-4 h-4 mr-2" />
                    Télécharger le logo (PDF)
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="container-custom py-12">
          <Tabs defaultValue="colors" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
              <TabsTrigger value="colors" className="data-[state=active]:bg-forest data-[state=active]:text-cream bg-white border">
                <Palette className="w-4 h-4 mr-2" />
                Couleurs
              </TabsTrigger>
              <TabsTrigger value="typography" className="data-[state=active]:bg-forest data-[state=active]:text-cream bg-white border">
                <Type className="w-4 h-4 mr-2" />
                Typographie
              </TabsTrigger>
              <TabsTrigger value="components" className="data-[state=active]:bg-forest data-[state=active]:text-cream bg-white border">
                <Layout className="w-4 h-4 mr-2" />
                Composants
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-forest data-[state=active]:text-cream bg-white border">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-8">
              {Object.entries(colors).map(([category, colorList]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize text-forest">
                      {category === "primary" ? "🌲 Couleurs Primaires (Forest)" : 
                       category === "secondary" ? "🥐 Couleurs Secondaires (Cream)" :
                       "✨ Couleurs d'Accent (Gold)"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {colorList.map((color) => (
                        <div key={color.name} className="space-y-3">
                          <div 
                            className="h-24 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => copyToClipboard(color.hex, color.name)}
                          />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-forest">{color.name}</span>
                              <button 
                                onClick={() => copyToClipboard(color.hex, color.name)}
                                className="text-sm text-muted-foreground hover:text-forest flex items-center gap-1"
                              >
                                {copiedColor === color.name ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {color.hex}
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground">HSL: {color.hsl}</p>
                            <p className="text-sm text-warm-gray-600">{color.usage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Gradients */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">🎨 Gradients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="h-20 rounded-xl mb-2" style={{ background: "linear-gradient(135deg, #1B4D3E 0%, #2A5F4D 100%)" }} />
                      <p className="text-sm font-medium">Gradient Primaire</p>
                      <code className="text-xs text-muted-foreground">linear-gradient(135deg, #1B4D3E, #2A5F4D)</code>
                    </div>
                    <div>
                      <div className="h-20 rounded-xl mb-2" style={{ background: "linear-gradient(135deg, #D4A853 0%, #E4BE73 100%)" }} />
                      <p className="text-sm font-medium">Gradient Accent</p>
                      <code className="text-xs text-muted-foreground">linear-gradient(135deg, #D4A853, #E4BE73)</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography">
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Hiérarchie Typographique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {typography.map((item, index) => (
                    <div key={index} className="border-b border-border/50 pb-4 last:border-0">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <span className="bg-forest/10 text-forest px-3 py-1 rounded-full text-sm font-medium">
                          {item.element}
                        </span>
                        <span className="text-sm text-muted-foreground">{item.font}</span>
                        <span className="text-sm text-muted-foreground">{item.size}</span>
                        <span className="text-sm text-muted-foreground">Weight: {item.weight}</span>
                      </div>
                      <p 
                        style={{ 
                          fontFamily: item.font === "Plus Jakarta Sans" ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif",
                          fontSize: item.element === "Display 1" ? "48px" : item.size,
                          fontWeight: parseInt(item.weight),
                          color: "#1B4D3E"
                        }}
                      >
                        {item.sample}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="components" className="space-y-8">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Boutons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <button className="btn-primary">Bouton Primaire</button>
                    <button className="btn-secondary">Bouton Secondaire</button>
                    <button className="btn-accent">Bouton Accent</button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Classes CSS :</p>
                    <code className="text-xs">.btn-primary | .btn-secondary | .btn-accent</code>
                  </div>
                </CardContent>
              </Card>

              {/* Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="card-livementor">
                      <h4 className="font-bold text-forest mb-2">Card Standard</h4>
                      <p className="text-warm-gray-600 text-sm">Avec effet hover et bordure supérieure gradient</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-warm border">
                      <h4 className="font-bold text-forest mb-2">Card Simple</h4>
                      <p className="text-warm-gray-600 text-sm">Sans effet hover</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <span className="badge-livementor">Badge Standard</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Succès</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Erreur</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Info</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Flyer Template */}
                <Card className="overflow-hidden">
                  <div className="bg-forest p-6 text-center">
                    <div className="bg-cream rounded-lg p-4 mx-auto max-w-[200px] shadow-lg">
                      <div className="text-forest font-display font-bold text-sm mb-2">Campus T3P</div>
                      <div className="w-full h-16 bg-gradient-to-r from-forest to-forest-light rounded mb-2" />
                      <div className="text-xs text-forest font-medium mb-1">Formation VTC</div>
                      <div className="h-2 bg-gold/50 rounded w-3/4 mx-auto mb-1" />
                      <div className="h-2 bg-muted rounded w-1/2 mx-auto" />
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-forest">📄 Flyer A5/A4</h3>
                        <p className="text-warm-gray-600 text-sm">Présentation des formations</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-shrink-0"
                        onClick={() => window.open('/templates/flyer-campus-t3p.html', '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ouvrir
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Attestation Template */}
                <Card className="overflow-hidden">
                  <div className="bg-cream-dark p-6 text-center">
                    <div className="bg-white rounded-lg p-4 mx-auto max-w-[200px] shadow-lg border">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-cream text-xs font-bold">T3P</div>
                        <div className="text-right">
                          <div className="h-1.5 bg-forest rounded w-12 mb-1" />
                          <div className="h-1 bg-muted rounded w-8" />
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-forest font-bold text-xs">ATTESTATION</div>
                        <div className="text-[10px] text-muted-foreground">de Formation</div>
                      </div>
                      <div className="space-y-1 mb-3">
                        <div className="h-1.5 bg-muted rounded w-full" />
                        <div className="h-1.5 bg-muted rounded w-4/5" />
                        <div className="h-1.5 bg-muted rounded w-3/4" />
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="h-6 w-12 border-2 border-gold rounded" />
                        <div className="text-[8px] text-muted-foreground">Signature</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-forest">🎓 Attestation de Formation</h3>
                        <p className="text-warm-gray-600 text-sm">Document officiel certifié</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-shrink-0"
                        onClick={() => window.open('/templates/attestation-campus-t3p.html', '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ouvrir
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contrat Template */}
                <Card className="overflow-hidden">
                  <div className="bg-forest-light p-6 text-center">
                    <div className="bg-white rounded-lg p-4 mx-auto max-w-[200px] shadow-lg">
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-cream text-xs font-bold">T3P</div>
                      </div>
                      <div className="text-forest font-bold text-xs mb-2">CONTRAT DE FORMATION</div>
                      <div className="text-left space-y-2 text-[8px]">
                        <div className="border-b pb-1">
                          <span className="text-muted-foreground">Article 1</span>
                          <div className="h-1 bg-muted rounded w-full mt-1" />
                        </div>
                        <div className="border-b pb-1">
                          <span className="text-muted-foreground">Article 2</span>
                          <div className="h-1 bg-muted rounded w-3/4 mt-1" />
                        </div>
                        <div>
                          <span className="text-muted-foreground">Article 3</span>
                          <div className="h-1 bg-muted rounded w-5/6 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-forest">📝 Contrat de Formation</h3>
                        <p className="text-warm-gray-600 text-sm">Accord stagiaire/organisme</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-shrink-0"
                        onClick={() => window.open('/templates/contrat-campus-t3p.html', '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ouvrir
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Card Template */}
                <Card className="overflow-hidden">
                  <div className="bg-cream p-6 text-center">
                    <div className="bg-forest rounded-lg p-3 mx-auto shadow-lg" style={{ width: '170px', height: '100px' }}>
                      <div className="flex h-full items-center gap-2">
                        <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-forest text-xs font-bold flex-shrink-0">T3P</div>
                        <div className="text-left flex-1">
                          <div className="text-cream font-bold text-[10px]">Campus T3P</div>
                          <div className="text-cream/70 text-[7px] mb-2">Centre de Formation VTC & Taxi</div>
                          <div className="space-y-0.5 text-[6px] text-cream/60">
                            <div>📍 Montrouge</div>
                            <div>📞 01 XX XX XX XX</div>
                            <div>🌐 t3pcampus.fr</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-forest">💳 Carte de Visite</h3>
                        <p className="text-warm-gray-600 text-sm">Format 85×55mm</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-shrink-0"
                        onClick={() => window.open('/templates/carte-visite-campus-t3p.html', '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Ouvrir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-forest text-cream">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-2">Document complet</h3>
                      <p className="text-cream/80">Téléchargez la charte graphique complète avec tous les templates détaillés</p>
                    </div>
                    <Button onClick={downloadMarkdown} variant="outline" className="bg-gold text-forest border-0 hover:bg-gold-light">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Do's and Don'ts */}
          <section className="mt-12">
            <h2 className="section-title text-2xl mb-6">Règles d'utilisation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    À faire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>✓ Utiliser les couleurs exactes de la palette</li>
                    <li>✓ Respecter la hiérarchie typographique</li>
                    <li>✓ Maintenir des contrastes accessibles (WCAG AA)</li>
                    <li>✓ Utiliser les coins arrondis de manière cohérente</li>
                    <li>✓ Appliquer les ombres douces pour la profondeur</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    À ne pas faire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>✗ Déformer le logo</li>
                    <li>✗ Utiliser d'autres couleurs primaires</li>
                    <li>✗ Mélanger avec d'autres familles de polices</li>
                    <li>✗ Appliquer des effets trop prononcés</li>
                    <li>✗ Réduire les espaces au-delà du minimum</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-forest text-cream py-8 mt-12">
          <div className="container-custom text-center">
            <p className="text-cream/70 text-sm">
              Campus T3P — Charte Graphique v1.0 — Janvier 2026
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CharteGraphique;
