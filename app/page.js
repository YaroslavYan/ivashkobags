import MainPageCategory from "./components/MainPageCategory";
import NewArrivals from "./components/NewArrivals";
import PhotoCard from "./components/PhotoCard";

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
      <NewArrivals />
      <MainPageCategory />
      <PhotoCard />
    </div>
  );
}
