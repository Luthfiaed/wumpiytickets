import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const OrderShow = ({ order, currentUser }) => {
  const [expTimeLeft, setExpTimeLeft] = useState(0);

  useEffect(() => {
    const calculateExpTimeLeft = () => {
      const expMs = new Date(order.expiresAt) - new Date();
      setExpTimeLeft(Math.round(expMs / 1000));
    };
    calculateExpTimeLeft(); // setInterval is gonna call this function with 1 second delay in the beginning, this manual call is to handle/offset that delay
    const timerId = setInterval(calculateExpTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (expTimeLeft < 0) {
    return <div>Order has expired.</div>;
  }

  return (
    <div>
      Time left to pay: {expTimeLeft}
      <StripeCheckout
        token={(token) => token}
        stripeKey="pk_test_51Ojxc7FCDjOCrQ0U2aK41SEz2zbYHwIjkTQNhF5521tSckyVfqQJQ6JCgPnCvD3QndzcjU91037t3xYdjdHjrrxj00gm7VKtcl"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
