import { useIsMobile } from "@/hooks/use-mobile";

const formats = [
  {
    name: "Journée",
    duration: "1 semaine",
    hours: "9h30 – 16h30",
    ideal: "En reconversion, disponible",
    price: "990€",
  },
  {
    name: "Soir",
    duration: "2 semaines",
    hours: "18h – 21h30",
    ideal: "Salarié, temps partiel",
    price: "990€",
  },
  {
    name: "E-learning",
    duration: "Illimité jusqu'à l'examen",
    hours: "24h/24, 7j/7",
    ideal: "Autonome, flexible",
    price: "990€",
  },
];

const FormatsTable = () => {
  const isMobile = useIsMobile();

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">3 formats, un seul tarif : 990€</h2>
        </div>

        {isMobile ? (
          /* Mobile: stacked cards */
          <div className="flex flex-col gap-4">
            {formats.map((f) => (
              <div key={f.name} className="card-t3p p-5">
                <h3 className="text-lg font-bold text-primary mb-3">{f.name}</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-semibold text-foreground">Durée</dt>
                    <dd className="text-muted-foreground text-right">{f.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold text-foreground">Horaires</dt>
                    <dd className="text-muted-foreground text-right">{f.hours}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold text-foreground">Idéal pour</dt>
                    <dd className="text-muted-foreground text-right max-w-[55%]">{f.ideal}</dd>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <dt className="font-semibold text-foreground">Prix</dt>
                    <dd className="text-lg font-bold text-accent">{f.price}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: table */
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-4 text-left font-semibold" />
                  <th className="px-4 py-4 text-center font-semibold">Journée</th>
                  <th className="px-4 py-4 text-center font-semibold">Soir</th>
                  <th className="px-4 py-4 text-center font-semibold">E-learning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-4 font-semibold text-foreground">Durée</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">1 semaine</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">2 semaines</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">Illimité jusqu'à l'examen</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-4 font-semibold text-foreground">Horaires</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">9h30 – 16h30</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">18h – 21h30</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">24h/24, 7j/7</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-4 font-semibold text-foreground">Idéal pour</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">En reconversion, disponible</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">Salarié, temps partiel</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">Autonome, flexible</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold text-foreground">Prix</td>
                  <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
                  <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
                  <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            Paiement en 4x sans frais avec Alma — soit <span className="font-bold text-accent">247,50€/mois</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsTable;
