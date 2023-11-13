import { useQuery } from "@tanstack/react-query";
import "./GigCard.css";
import { Link } from "react-router-dom";
import req from "../../utils/newRequest";

export default function GigCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () => req(`/users/${item.userId}`).then((res) => res.data),
  });

  return (
    <Link to={`/gigs/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "Something Went Wrong!"
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="" />
              <span>{data?.username}</span>
            </div>
          )}
          <p>{item.title}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
