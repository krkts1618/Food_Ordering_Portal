import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group block h-full">
      <article className="food-card h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50">
        <div className="relative overflow-hidden">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <span className="badge-brand absolute left-3 top-3 py-1 px-2 rounded-xl">
            {restaurant.category}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-brand">
            {restaurant.name}
          </h3>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-sm text-neutral-400">Customer rating</span>

            <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-sm font-semibold text-white">
              <span className="text-amber-400">★</span>
              {restaurant.rating ?? "New"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-neutral-400">Explore menu</span>
            <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RestaurantCard;
