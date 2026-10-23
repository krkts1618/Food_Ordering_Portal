import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <div className="food-card p-5">
        <img
          src={restaurant.imageUrl}
          alt="restaurant.name"
          className="h-48 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-bold text-white"> {restaurant.name}</h3>
          <div className="flex items-center justify-between mt-3">
            <span className="badge-brand">{restaurant.category}</span>
            <span className="badge-brand">{restaurant.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
