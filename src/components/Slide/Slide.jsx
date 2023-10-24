import "./Slide.css";
import Slider from "infinite-react-carousel";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function Slide({ children, slidesToShow, arrowsScroll }) {
  return (
    <div className="slide">
      <div className="container">
        <Slider dots slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
}
