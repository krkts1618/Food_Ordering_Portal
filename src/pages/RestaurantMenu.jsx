import { useParams } from "react-router-dom";
import { getRestaurantById, getFoods } from "../services/api.js";
import { useEffect, useState, useMemo } from "react";
import FoodCard from "../component/customer/FoodCard.jsx";
import CategoryFilter from "../component/customer/CategoryFilter.jsx";
import SearchBar from "../component/customer/SearchBar.jsx";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setmenuItems] = useState([]);
  const [category, setcategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await getRestaurantById(id);
        setRestaurant(res);
        const foodsData = await getFoods();
        const foodItems = foodsData.filter(
          (item) => String(item.restaurantId) === String(id),
        );
        setmenuItems(foodItems);
      } catch (e) {
        seterror(e.message || "Something went wrong.");
      } finally {
        setloading(false);
      }
    }
    fetchdata();
  }, [id]);
  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      // Add defensive optional chaining (?) and toLowerCase()
      const matchesCategory =
        category === "All" ||
        item.category?.toLowerCase() === category.toLowerCase();

      return matchesCategory;
    });
  }, [menuItems, category]);

  return (
    <div className="page-container py-8 flex flex-col gap-10">
      {loading && (
        <div className="food-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="food-card h-[280px] flex flex-col">
              <div className="skeleton h-40 w-full" />
              <div className="p-4 flex flex-col gap-3 mt-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="empty-state text-red-400 border-red-500/30">
          {error}
        </div>
      )}

      {!loading && !error && restaurant && (
        <>
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-midnight-card flex flex-col md:flex-row">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="h-56 w-full object-cover md:w-1/3 md:h-auto"
            />
            <div className="flex flex-col justify-center p-6 md:p-8 gap-4 flex-grow">
              <h1 className="section-title text-3xl md:text-4xl">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="badge-brand">{restaurant.category}</span>
                <span className="badge-brand">⭐ {restaurant.rating}</span>
              </div>
              <p className="section-subtitle max-w-2xl">
                {restaurant.description}
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="section-title">Menu</h2>
            <div className="w-full max-w-md">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target ? e.target.value : e)}
              />
            </div>
            <CategoryFilter
              activeCategory={category}
              onCategoryClick={setcategory}
            />
          </section>

          <section>
            {filteredMenu.length > 0 ? (
              <div className="food-grid">
                {filteredMenu.map((item) => (
                  <FoodCard key={item.id} food={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="text-4xl" aria-hidden="true">
                  🍽️
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">
                  No menu items found
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default RestaurantMenu;
