const CategoryFilter = ({ activeCategory, onCategoryClick }) => {
  const arr = ["All", "Main Course", "Starters", "Beverages", "Desserts"];

  return (
    <div className="flex gap-3 overflow-x-auto py-2 my-4">
      {arr.map((category) => (
        <button
          key={category}
          onClick={() => {
            onCategoryClick(category);
            console.log(category);
          }}
          className={`filter-pill ${activeCategory === category && "filter-pill-active"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
