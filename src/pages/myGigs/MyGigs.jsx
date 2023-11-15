import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import "./MyGigs.css";
import req from "../../utils/newRequest.js";

export default function MyGigs() {
  const currentUser = localStorage.getItem("currentUser");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      req(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => req.delete(`/gig/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["myGigs"]),
  });

  function handleDelete(gigId) {
    mutation.mutate(id);
  }

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading..."
      ) : error ? (
        `Something went wrong!!, ${error}`
      ) : (
        <div className="container">
          <div className="title">
            <h2>Gigs</h2>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt={gig.title} />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
