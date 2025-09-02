import NewArrivals from "./components/NewArrivals";

export const metadata = {
  title: "Sklep z torebkami damskimi i męskimi | Ivashko",
  description:
    "Kup eleganckie torebki online. Szeroki wybór torebek damskich i męskich z dostawą na terenie całej Polski.",
  openGraph: {
    title: "Sklep z torebkami Ivashko",
    description:
      "Sklep internetowy z eleganckimi torebkami damskimi i męskimi. Darmowa dostawa w całej Polsce.",
    url: "https://ivashko.pl",
    siteName: "Ivashko",
    locale: "pl_PL",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <h1>Ivashko – sklep z torebkami online</h1>
      <p>
        Oferujemy szeroki wybór eleganckich torebek damskich i męskich. Sprawdź
        nasze nowości i wybierz model idealny dla siebie.
      </p>
      <NewArrivals />
    </div>
  );
}
