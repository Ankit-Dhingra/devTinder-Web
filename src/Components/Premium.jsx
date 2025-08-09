import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";

const stripePromise = loadStripe(
  "pk_test_51PCbc7SC6CcOj3XNbkp84Hw8QogWPqdhc63gWmk4NfyyFhk3S9YlvlRMwMPJ1x1o1YwaEl3tkaqN8LgKu8JHLQrr00Q8626JTn"
);

const Premium = () => {
  const userInfo = useSelector((store) => store.user);

  const handleCheckout = async (plan) => {
    try {
      const stripe = await stripePromise;

      // Call backend API to create checkout session
      const data = await axios.post(
        `${BASE_URL}/create-checkout-session`,
        { plan },
        {
          withCredentials: true,
        }
      );
      if (data.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };
  if (userInfo?.isPremium) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-4xl font-bold">🎉 You are a Premium Member!</h2>
        <p className="mt-4 text-lg">Enjoy all your premium features.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Upgrade to Premium
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch">
        {/* Silver Membership */}
        <div className="w-full lg:w-1/2 bg-base-300 rounded-2xl shadow-xl p-8 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-3xl font-bold mb-4 text-center">
            Silver Membership
          </h3>
          <ul className="space-y-3 text-lg font-medium mb-6">
            <li>✓ Chat with other People</li>
            <li>✓ 100 Requests per day</li>
            <li>✓ Verified Badge</li>
            <li>✓ Valid for 3 Months</li>
          </ul>
          <div className="text-center">
            <button
              onClick={() => handleCheckout("silver")}
              className="btn btn-neutral rounded-full px-6"
            >
              Choose Silver
            </button>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="w-full lg:w-1/2 bg-base-300 rounded-2xl shadow-xl p-8 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-3xl font-bold mb-4 text-center">
            Gold Membership
          </h3>
          <ul className="space-y-3 text-lg font-medium mb-6">
            <li>✓ Chat with other People</li>
            <li>✓ Unlimited Requests per day</li>
            <li>✓ Verified Badge</li>
            <li>✓ Valid for 6 Months</li>
          </ul>
          <div className="text-center">
            <button
              onClick={() => handleCheckout("gold")}
              className="btn btn-neutral rounded-full px-6"
            >
              Choose Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
