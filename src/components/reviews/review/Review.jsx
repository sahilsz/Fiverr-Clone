import { useQuery } from "@tanstack/react-query";
import req from "../../../utils/newRequest";

export default function Review({ review }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () => req(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <>
      <div className="review">
        <div className="item">
          {isLoading ? (
            "loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img
                className="pp"
                src={data?.img || "/img/noavatar.jpg"}
                alt=""
              />
              <div className="info">
                <span>{data?.username}</span>
                <div className="country">
                  {/* <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt=""
                /> */}
                  <span>{data?.country}</span>
                </div>
              </div>
            </div>
          )}
          <div className="stars">
            {Array(review.star)
              .fill()
              .map((_, i) => (
                <img src="/img/star.png" key={i} alt="" />
              ))}
            <span>{review.star}</span>
          </div>
          <p>{review.desc}</p>
          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
