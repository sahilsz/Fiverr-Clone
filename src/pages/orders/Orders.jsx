import { useQuery } from "@tanstack/react-query";
import "./Orders.css";
import req from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => req("/orders").then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await req(`/c/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await req.post("/c", {
          to: currentUser.isSeller ? buyerId : sellerId,
        });

        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>

                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
