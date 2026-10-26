import { useState, useEffect } from "react";
import { getOrder, getFoods } from "../services/api";
import OrdersView from "../component/admin/OrdersView";
import MenuManager from "../component/admin/MenuManager";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orderData, menuData] = await Promise.all([
          getOrder(),
          getFoods(),
          new Promise((resolve) => setTimeout(resolve, 500)), //for loading the page animation
        ]);
        setOrders(orderData);
        setMenuItems(menuData);
      } catch (err) {
        setError(err.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="page-container py-8 flex flex-col gap-6">
        <div className="skeleton h-10 w-48 rounded-md" />

        {/* Skeleton Tabs */}
        <div className="flex gap-4 border-b border-white/10 pb-4">
          <div className="skeleton h-10 w-32 rounded-full" />
          <div className="skeleton h-10 w-32 rounded-full" />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton h-24 w-full rounded-xl" />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container py-8">
        <div className="empty-state">
          <span className="text-4xl" aria-hidden="true">
            ⚠️
          </span>
          <h3 className="mt-4 text-lg font-bold text-white">System Error</h3>
          <p className="mt-2 text-sm text-neutral-400">{error}</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Refresh Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container py-8 flex flex-col gap-6">
      <h1 className="section-title text-3xl">Admin Portal</h1>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          className={`filter-pill ${activeTab === "orders" ? "filter-pill-active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Live Orders
        </button>
        <button
          className={`filter-pill ${activeTab === "menu" ? "filter-pill-active" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          Menu Items
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "orders" ? (
          <OrdersView orders={orders} setOrders={setOrders} />
        ) : (
          <MenuManager menuItems={menuItems} setMenuItems={setMenuItems} />
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
