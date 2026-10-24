const FoodCard = ({ food }) => {
  return (
    <div className="food-card flex flex-col">
      <img 
        src={food.imageUrl} 
        alt={food.name} 
        className="h-48 w-full object-cover" 
      />
      
      <div className="p-5 flex flex-col grow">
        <header className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white">{food.name}</h3>
          <span className="font-bold text-brand">&#8377;{food.price}</span>
        </header>
        
        <p className="text-sm text-neutral-400 mt-2 mb-3">{food.description}</p>
        
        <div className="mb-2">
          <span className="badge-brand p-1 rounded-md  ">{food.category}</span>
        </div>

        <div className="divider mt-auto pt-4">
          <button 
            type="button"
            disabled={!food.available}
            className={`w-full ${food.available ? 'btn-primary rounded-xl py-2 ' : 'btn border border-midnight-border bg-midnight-elevated text-neutral-500'}`}
          >
            {food.available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;