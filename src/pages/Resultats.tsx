import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  CheckCircle2, XCircle, Download, Loader2, Search, ShieldCheck, ArrowRight, Car, CalendarDays, Phone, AlertTriangle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import {
  frDateToIso, isoDateToFr, formatScore, type ExamSubject, type ExamResultStatus,
} from "@/lib/examResults";

interface PublicExamResult {
  session_label: string;
  civility: string | null;
  full_name: string;
  exam_type: string;
  department: string | null;
  exam_date: string | null;
  global_score: number | null;
  result: ExamResultStatus;
  subjects: ExamSubject[];
  comment: string | null;
  dossier_number: string;
  attestationUrl: string | null;
}

type LookupState =
  | { status: "idle" | "loading" }
  | { status: "found"; results: PublicExamResult[] }
  | { status: "not_found" | "rate_limited" | "error" | "invalid" };

/** Saisie guidée JJ/MM/AAAA */
const formatBirthInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join("/");
};

const ResultCard = ({ r }: { r: PublicExamResult }) => {
  const admis = r.result === "admis";
  return (
    <article className={`rounded-2xl border-2 bg-white shadow-sm overflow-hidden ${admis ? "border-green-500" : "border-red-300"}`}>
      <header className={`px-6 py-5 flex flex-wrap sm:flex-nowrap items-start gap-4 ${admis ? "bg-green-50" : "bg-red-50"}`}>
        {admis
          ? <CheckCircle2 className="w-10 h-10 text-green-600 shrink-0" aria-hidden />
          : <XCircle className="w-10 h-10 text-red-500 shrink-0" aria-hidden />}
        <div>
          <p className="text-sm text-muted-foreground">{r.exam_type} · Session {r.session_label}</p>
          <h2 className={`text-2xl font-bold ${admis ? "text-green-700" : "text-red-700"}`}>
            {admis ? "Admissible" : "Non admissible"}
          </h2>
          <p className="text-foreground mt-1">
            {r.civility} {r.full_name} — dossier n° {r.dossier_number}
          </p>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto sm:text-right shrink-0">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Note globale</p>
          <p className="text-3xl font-bold text-foreground">{formatScore(r.global_score)}<span className="text-base font-normal">/20</span></p>
        </div>
      </header>

      <div className="px-6 py-5 space-y-5">
        {admis ? (
          <p className="text-foreground">
            Félicitations ! Vous avez réussi les épreuves théoriques
            {r.exam_date ? ` du ${isoDateToFr(r.exam_date)}` : ""}. Vous êtes admissible à l'épreuve pratique ;
            la CMA vous enverra votre convocation.
          </p>
        ) : (
          <p className="text-foreground">
            Vous n'avez pas obtenu l'admissibilité cette fois-ci{r.comment ? ` (${r.comment.charAt(0).toLowerCase()}${r.comment.slice(1)})` : ""}.
            Ce n'est qu'une étape : nous vous accompagnons pour la prochaine session.
          </p>
        )}

        {r.subjects.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-2 pr-3 font-medium">Épreuve</th>
                  <th className="py-2 px-2 font-medium text-center">Coef.</th>
                  <th className="py-2 pl-2 font-medium text-right">Note</th>
                </tr>
              </thead>
              <tbody>
                {r.subjects.map((s) => {
                  const eliminated = s.score < s.eliminatory_below;
                  return (
                    <tr key={s.code} className={`border-b last:border-0 ${eliminated ? "bg-red-50" : ""}`}>
                      <td className="py-2 pr-3">
                        <span className="font-medium">{s.code}</span> – {s.label}
                        {eliminated && (
                          <span className="block text-xs text-red-600">
                            Note éliminatoire (inférieure à {s.eliminatory_below}/20)
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2 text-center">{s.coefficient}</td>
                      <td className={`py-2 pl-2 text-right font-semibold ${eliminated ? "text-red-600" : ""}`}>
                        {formatScore(s.score)}/20
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {admis ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {r.attestationUrl ? (
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href={r.attestationUrl} download>
                  <Download className="w-4 h-4 mr-2" /> Télécharger mon attestation (PDF)
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Votre attestation sera disponible prochainement sur cette page.
              </p>
            )}
            <Button asChild size="lg" variant="outline">
              <Link to="/services/location-vehicule-examen">
                <Car className="w-4 h-4 mr-2" /> Préparer l'épreuve pratique
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/calendrier-examens">
                <CalendarDays className="w-4 h-4 mr-2" /> Voir la prochaine session
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                Être rappelé pour me réinscrire <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            {r.attestationUrl && (
              <Button asChild size="lg" variant="ghost">
                <a href={r.attestationUrl} download>
                  <Download className="w-4 h-4 mr-2" /> Mon attestation (PDF)
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Resultats = () => {
  const [dossier, setDossier] = useState("");
  const [birth, setBirth] = useState("");
  const [state, setState] = useState<LookupState>({ status: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const birthDate = frDateToIso(birth);
    if (dossier.replace(/\D/g, "").length < 5 || !birthDate) {
      setState({ status: "invalid" });
      return;
    }
    setState({ status: "loading" });
    const { data, error } = await supabase.functions.invoke("exam-result-lookup", {
      body: { dossierNumber: dossier, birthDate },
    });
    if (error || !data?.status) {
      setState({ status: "error" });
      return;
    }
    setState(data.status === "found" ? { status: "found", results: data.results } : { status: data.status });
  };

  const messages: Partial<Record<LookupState["status"], string>> = {
    invalid: "Vérifiez votre numéro de dossier (8 chiffres) et votre date de naissance au format JJ/MM/AAAA.",
    not_found: "Aucun résultat ne correspond à ces informations. Vérifiez le numéro de dossier inscrit sur votre convocation et votre date de naissance. Les résultats sont mis en ligne dès leur réception de la CMA.",
    rate_limited: "Trop de tentatives. Réessayez dans une heure ou appelez-nous.",
    error: "Le service est momentanément indisponible. Réessayez dans quelques minutes.",
  };
  const message = messages[state.status];

  return (
    <Layout>
      <Helmet>
        <title>Mes résultats d'examen | ECOLE T3P</title>
        <meta name="description" content="Consultez votre résultat d'admissibilité à l'examen taxi, VTC ou VMDTR et téléchargez votre attestation." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section
        className="pt-[120px] pb-16 md:pt-[136px] lg:pt-[144px] min-h-[70vh]"
        style={{ background: "linear-gradient(135deg, #FFFAF5 0%, #F5F7FF 100%)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">Mes résultats d'examen</h1>
          <p className="text-center text-muted-foreground mt-3">
            Épreuves d'admissibilité taxi, VTC et VMDTR passées avec l'ECOLE T3P.
          </p>

          <form onSubmit={onSubmit} className="mt-8 bg-white rounded-2xl shadow-sm border p-6 grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="dossier">N° de dossier CMA</Label>
              <Input
                id="dossier"
                inputMode="numeric"
                autoComplete="off"
                placeholder="00012345"
                maxLength={10}
                value={dossier}
                onChange={(e) => setDossier(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth">Date de naissance</Label>
              <Input
                id="birth"
                inputMode="numeric"
                autoComplete="bday"
                placeholder="JJ/MM/AAAA"
                value={birth}
                onChange={(e) => setBirth(formatBirthInput(e.target.value))}
                required
              />
            </div>
            <Button type="submit" size="lg" disabled={state.status === "loading"}>
              {state.status === "loading"
                ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                : <Search className="w-4 h-4 mr-2" />}
              Voir mon résultat
            </Button>
            <p className="md:col-span-3 text-xs text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-green-600" aria-hidden />
              Le numéro de dossier figure en haut à droite de votre convocation CMA. Votre résultat n'est visible
              qu'avec votre numéro de dossier et votre date de naissance.
            </p>
          </form>

          <div className="mt-8 space-y-6" aria-live="polite">
            {message && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
                <p>{message}</p>
              </div>
            )}
            {state.status === "found" && state.results.map((r) => (
              <ResultCard key={`${r.session_label}-${r.exam_type}`} r={r} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Une question sur votre résultat ?{" "}
            <a href="tel:+33188750555" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              <Phone className="w-4 h-4" aria-hidden /> 01 88 75 05 55
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Resultats;
