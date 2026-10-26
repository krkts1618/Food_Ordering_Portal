import { updateOrder } from "../../services/api";

const OrdersView = ({ orders, setOrders }) => {
  const handleStatusChange = async (order, newStatus) => {
    try {
      const updatedData = { ...order, status: newStatus };
      const updatedOrder = await updateOrder(order.id, updatedData);

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? updatedOrder : o)),
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating order status.");
    }
  };

  if (orders.length === 0) {
    return <div className="empty-state">No live orders at the moment.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="panel flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5 border border-white/10 rounded-xl bg-midnight-card"
        >
          <div className="flex flex-col gap-1">
            <span className="text-neutral-400 text-sm">Order #{order.id}</span>
            <h3 className="text-lg font-bold text-white">
              {order.customerDetails?.name || "Guest"}
            </h3>
            <p className="text-sm text-neutral-400">
              {order.customerDetails?.address}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-brand">${order.total}</span>

            <select
              className="input bg-[#171717] text-white border-white/20 rounded px-3 py-2"
              value={order.status}
              onChange={(e) => handleStatusChange(order, e.target.value)}
            >
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersView;
