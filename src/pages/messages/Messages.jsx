import "./Messages.css";
import req from "../../utils/newRequest.js";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export default function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => req("/c").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => req.put(`/c/${id}`),
    onSuccess: queryClient.invalidateQueries(["conversations"]),
  });

  const handleClick = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.map((c) => (
              <tbody key={c.id}>
                <tr
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>{c.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer && (
                        <button onClick={() => handleClick(c.id)}>
                          Mark as Read
                        </button>
                      ))}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
