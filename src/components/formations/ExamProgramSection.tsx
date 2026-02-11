import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, Clock, Award } from "lucide-react";

type Profession = "taxi" | "vtc" | "vmdtr";

interface ExamProgramSectionProps {
  profession: Profession;
}

const troncCommun = [
  { code: "A", label: "Réglementation T3P et prévention des discriminations et des violences sexuelles et sexistes", composition: "10 QCM + 5 QRC", duree: "0h45", eliminatoire: "6/20", coef: 3 },
  { code: "B", label: "Gestion", composition: "16 QCM + 2 QRC", duree: "0h45", eliminatoire: "6/20", coef: 2 },
  { code: "C", label: "Sécurité routière", composition: "20 QCM", duree: "0h30", eliminatoire: "6/20", coef: 3 },
  { code: "D", label: "Français", composition: "7 QCM + 3 QRC", duree: "0h30", eliminatoire: "6/20", coef: 2 },
  { code: "E", label: "Anglais", composition: "20 QCM", duree: "0h30", eliminatoire: "4/20", coef: 1 },
];

const epreuvesSpecifiques: Record<Profession, { label: string; items: typeof troncCommun }> = {
  taxi: {
    label: "Épreuves spécifiques Taxi",
    items: [
      { code: "F(T)", label: "Connaissance du territoire et réglementation locale", composition: "6 QCM + 2 QRC", duree: "0h20", eliminatoire: "6/20", coef: 3 },
      { code: "G(T)", label: "Réglementation nationale spécifique aux taxis", composition: "12 QCM + 4 QRC", duree: "0h30", eliminatoire: "6/20", coef: 3 },
    ],
  },
  vtc: {
    label: "Épreuves spécifiques VTC",
    items: [
      { code: "F(V)", label: "Développement commercial", composition: "12 QCM + 4 QRC", duree: "0h30", eliminatoire: "6/20", coef: 3 },
      { code: "G(V)", label: "Réglementation nationale spécifique de l'activité de VTC", composition: "6 QCM + 2 QRC", duree: "0h20", eliminatoire: "6/20", coef: 3 },
    ],
  },
  vmdtr: {
    label: "Épreuves spécifiques VMDTR",
    items: [
      { code: "F(M)", label: "Sécurité routière spécifique à l'usage et à la conduite de motocyclettes", composition: "12 QCM + 4 QRC", duree: "0h30", eliminatoire: "6/20", coef: 3 },
      { code: "G(M)", label: "Prise en charge du passager", composition: "6 QCM + 2 QRC", duree: "0h20", eliminatoire: "6/20", coef: 3 },
    ],
  },
};

const epreuvePratique: Record<Profession, { critere: string; points: string }[]> = {
  taxi: [
    { critere: "Préparation et réalisation du parcours", points: "2 pts" },
    { critere: "Sécurité et souplesse de la conduite, respect du code de la route", points: "10 pts" },
    { critere: "Qualité de la prise en charge et de la relation client ; capacité à apporter des informations touristiques", points: "5 pts" },
    { critere: "Facturation et utilisation des équipements spéciaux", points: "3 pts" },
  ],
  vtc: [
    { critere: "Préparation et réalisation du parcours", points: "3 pts" },
    { critere: "Sécurité et souplesse de la conduite, respect du code de la route", points: "10 pts" },
    { critere: "Qualité de la prise en charge et de la relation client ; capacité à apporter des informations touristiques", points: "5 pts" },
    { critere: "Facturation", points: "2 pts" },
  ],
  vmdtr: [
    { critere: "Préparation et réalisation du parcours", points: "3 pts" },
    { critere: "Sécurité et souplesse de la conduite, respect du code de la route", points: "10 pts" },
    { critere: "Qualité de la prise en charge et de la relation client ; capacité à apporter des informations touristiques", points: "5 pts" },
    { critere: "Facturation", points: "2 pts" },
  ],
};

const professionColors: Record<Profession, { header: string; accent: string; badge: string }> = {
  taxi: { header: "bg-amber-600", accent: "text-amber-600", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  vtc: { header: "bg-emerald-700", accent: "text-emerald-700", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  vmdtr: { header: "bg-orange-600", accent: "text-orange-600", badge: "bg-orange-50 text-orange-700 border-orange-200" },
};

const ExamProgramSection = ({ profession }: ExamProgramSectionProps) => {
  const specifiques = epreuvesSpecifiques[profession];
  const pratique = epreuvePratique[profession];
  const colors = professionColors[profession];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">
            <FileText className="h-4 w-4 mr-2" />
            Examen officiel CMA
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Composition de l'examen T3P
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            L'examen comporte <strong>7 épreuves écrites d'admissibilité</strong> (tronc commun + spécifiques) 
            puis une <strong>épreuve pratique d'admission</strong>. Les épreuves sont composées de QCM et QRC.
          </p>
        </motion.div>

        {/* Tronc commun */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-foreground rounded-full" />
            Tronc commun — 5 épreuves
          </h3>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/80 border-b">
                    <th className="text-left px-4 py-3 font-semibold">Épreuve</th>
                    <th className="text-center px-3 py-3 font-semibold">Composition</th>
                    <th className="text-center px-3 py-3 font-semibold">Durée</th>
                    <th className="text-center px-3 py-3 font-semibold">Note éliminatoire</th>
                    <th className="text-center px-3 py-3 font-semibold">Coef.</th>
                  </tr>
                </thead>
                <tbody>
                  {troncCommun.map((ep, i) => (
                    <tr key={ep.code} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-4 py-3">
                        <span className="font-bold mr-2">{ep.code} —</span>
                        {ep.label}
                      </td>
                      <td className="text-center px-3 py-3 whitespace-nowrap">{ep.composition}</td>
                      <td className="text-center px-3 py-3 font-medium">{ep.duree}</td>
                      <td className="text-center px-3 py-3">
                        <span className="text-destructive font-semibold">&lt; {ep.eliminatoire}</span>
                      </td>
                      <td className="text-center px-3 py-3 font-bold">{ep.coef}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Épreuves spécifiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className={`w-2 h-6 rounded-full ${colors.header}`} />
            {specifiques.label}
          </h3>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`${colors.header} text-white`}>
                    <th className="text-left px-4 py-3 font-semibold">Épreuve</th>
                    <th className="text-center px-3 py-3 font-semibold">Composition</th>
                    <th className="text-center px-3 py-3 font-semibold">Durée</th>
                    <th className="text-center px-3 py-3 font-semibold">Note éliminatoire</th>
                    <th className="text-center px-3 py-3 font-semibold">Coef.</th>
                  </tr>
                </thead>
                <tbody>
                  {specifiques.items.map((ep, i) => (
                    <tr key={ep.code} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-4 py-3">
                        <span className="font-bold mr-2">{ep.code} —</span>
                        {ep.label}
                      </td>
                      <td className="text-center px-3 py-3 whitespace-nowrap">{ep.composition}</td>
                      <td className="text-center px-3 py-3 font-medium">{ep.duree}</td>
                      <td className="text-center px-3 py-3">
                        <span className="text-destructive font-semibold">&lt; {ep.eliminatoire}</span>
                      </td>
                      <td className="text-center px-3 py-3 font-bold">{ep.coef}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Conditions d'admissibilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800 mb-1">Conditions d'admissibilité aux épreuves écrites</p>
                <p className="text-amber-700">
                  Le candidat est déclaré admissible s'il obtient une <strong>moyenne ≥ 10/20</strong> sur 
                  l'ensemble des 7 épreuves pondérées de leurs coefficients respectifs, <strong>sans note éliminatoire</strong>. 
                  La moyenne est arrondie au centième.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Épreuve pratique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className={`h-5 w-5 ${colors.accent}`} />
            Épreuve pratique d'admission — {profession.toUpperCase()}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Mise en situation professionnelle de <strong>45 minutes maximum</strong> (dont minimum 20 min de conduite). 
            Le candidat doit réaliser une prestation de transport adaptée à la profession. 
            Évaluation sur <strong>20 points</strong>.
          </p>

          <Card className="overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`${colors.header} text-white`}>
                    <th className="text-left px-4 py-3 font-semibold">Critère d'évaluation</th>
                    <th className="text-center px-4 py-3 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {pratique.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-4 py-3">{item.critere}</td>
                      <td className="text-center px-4 py-3 font-bold">{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-5 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-green-800 mb-1">Conditions d'admission à l'épreuve pratique</p>
                <p className="text-green-700">
                  Le candidat est déclaré admis s'il obtient une <strong>note ≥ 12/20</strong>. 
                  En cas d'échec, il peut se représenter encore <strong>deux fois</strong> dans 
                  un délai d'un an à compter de la publication des notes d'admissibilité.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ExamProgramSection;
