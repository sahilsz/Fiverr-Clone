import { Link, useParams } from "react-router-dom";
import "./Message.css";
import req from "../../utils/newRequest.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Message() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => req(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => req.post("/messages", message),
    onSuccess: queryClient.invalidateQueries(["messages"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });

    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            MESSAGE &gt;
          </Link>
          JOHN DOE &gt;
        </span>

        {isLoading ? (
          "loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form onSubmit={handleSubmit} className="write">
          <textarea
            name=""
            placeholder="write a mesage"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
