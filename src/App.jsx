import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/RestaurantMenu";
import CheckoutOrders from "./pages/CheckoutOrders";
import AdminDashboard from "./pages/AdminDashboard";
import NavBar from "./component/layout/Navbar";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/orders" element={<CheckoutOrders />} />
        <Route path="/admin/menu" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default App;
