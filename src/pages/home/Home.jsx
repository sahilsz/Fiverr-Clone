import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Slide from "../../components/Slide/Slide";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import { cards } from "../../data";

export default function Home() {
  return (
    <div>
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5} className="w-100">
        {cards.map((card) => (
          <CategoryCard key={card.id} item={card} />
        ))}
      </Slide>
    </div>
  );
}
