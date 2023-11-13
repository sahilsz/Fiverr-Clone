import { useQuery } from "@tanstack/react-query";
import "./Orders.css";
import req from "../../utils/newRequest.js";

export default function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => req("/orders").then((res) => res.data),
  });

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
                    <img className="message" src="./img/message.png" alt="" />
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
