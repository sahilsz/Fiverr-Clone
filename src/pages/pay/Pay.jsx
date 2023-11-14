import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./Pay.css";
import req from "../../utils/newRequest.js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";

const stripePromise = loadStripe(
  "pk_test_51GvS83DNryDtGPpsuCwcRhae21FWP23onQmZX3HUNfPxuHSa6BlYnDNNWDTeStClYAHDvzwRD9K05k9XfXqwtIk200Wc9MPQFY"
);

export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await req.post(`/orders/create-payment-intent/${id}`);

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
