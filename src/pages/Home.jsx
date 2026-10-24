import { useEffect, useState, useMemo } from "react";
import { getRestaurant } from "../services/api";
import SearchBar from "../component/customer/SearchBar";
import RestaurantCard from "../component/customer/RestaurantCard";
import heroImage from "../assets/image/HeroImage.jpg";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurant();
        setRestaurants(data);
      } catch (err) {
        setError(err.message || "Something went wrong fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name?.toLowerCase().includes(query);

      return matchesSearch;
    });
  }, [restaurants, searchQuery]);

  return (
    <main className="page-container py-8 flex flex-col gap-10">
      <section className="panel grid grid-cols-1 md:grid-cols-2 gap-4 p-0 overflow-hidden">
        <div className="flex flex-col justify-center items-start gap-6 p-6 md:p-10 lg:p-[60px]">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Be the Quickest
            <br />
            <span className="text-brand">in your food</span>
            <br />
            delivery.
          </h1>

          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Our job is filling your tummy with delicious food, featuring quick
            and free delivery straight to your door.
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("restaurant-results")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary w-fit py-3 rounded-2xl font-bold mt-4 px-8"
          >
            Order Now
          </button>
        </div>

        <div className="min-h-[280px] md:min-h-[350px] p-4 hidden md:block">
          <img
            src={heroImage}
            alt="Delicious food ready for delivery"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="section-title text-xl">What are you craving?</h2>
          <p className="section-subtitle">
            Search your favorites or explore by cuisine.
          </p>
        </div>

        <div className="max-w-md w-full">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section id="restaurant-results" className="scroll-mt-10">
        {loading && (
          <div className="restaurant-grid">
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

        {!loading && !error && filteredRestaurants.length > 0 && (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}

        {!loading && !error && filteredRestaurants.length === 0 && (
          <div className="empty-state">
            <h3 className="text-lg font-bold text-white mb-2">
              No restaurants found
            </h3>
            <p className="text-sm text-neutral-400">
              Try another search or choose a different category.
            </p>
          </div>
        )}
      </section>
    </main>
    
  );
};

export default Home;
