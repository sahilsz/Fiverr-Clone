import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ item }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="categoryCard">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
}
