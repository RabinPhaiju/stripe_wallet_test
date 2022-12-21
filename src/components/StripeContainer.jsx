import React, { useState, useEffect,useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm'
import { UserContext } from "./context/UserState";

const PUBLIC_KEY = "pk_test_51MDhoQIKJewBHLefe8nebP2JtKbtehRlRBVxHHD6PJtYqpHrdcDpBVU9e1hbqsuRX9SjqlrXUXCz0O1mXcBChoEy00XeIN4DHR"
const stripePromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
  const { user} = useContext(UserContext);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if(user?.price>0){
      fetchPaymentIntent()
    }
  }, []);

  const fetchPaymentIntent = ()=>{
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ email:user.email,amount:user.price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }

  const options = {
    clientSecret
  };

  return (
    <div>
    <span>Intented Amout: {user?.price}</span>
      {clientSecret ? (
      <Elements options={options} stripe = {stripePromise}>
          <PaymentForm clientSecret={clientSecret} user={user}/>
      </Elements>
      ):
      <div>
      <p>Add item to <a href="/" className="pe-auto">cart</a> </p>
      </div>
      }
    </div>
  )
}

export default StripeContainer