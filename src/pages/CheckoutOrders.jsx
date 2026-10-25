import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CheckoutOrders = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();


  const { subtotal, tax, delivery, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const del = 4.99;
    const tx = sub * 0.08;
    return {
      subtotal: sub.toFixed(2),
      tax: tx.toFixed(2),
      delivery: del.toFixed(2),
      total: (sub + del + tx).toFixed(2),
    };
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="page-container py-12 flex justify-center">
        <div className="empty-state w-full max-w-md">
          <p className="text-lg font-bold text-white mb-4">
            Your cart is empty.
          </p>
          <Link to="/">
            <button className="btn-primary rounded-xl px-3 py-1">Go to Menu</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="page-container py-8">
      <h1 className="section-title mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div className="panel flex items-center gap-4" key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-brand">${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="btn-icon bg-midnight-elevated"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="text-white font-medium">{item.quantity}</span>
                <button
                  className="btn-icon bg-midnight-elevated"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn-danger ml-4 px-3 py-1 rounded-xl"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

       
        <div className="lg:col-span-1">
          <div className="panel sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm text-neutral-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${delivery}</span>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-brand">${total}</span>
              </div>
            </div>

            <button className="btn-primary w-full py-2 rounded-2xl ">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutOrders;
