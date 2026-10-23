const CategoryFilter = ({ activecategory, OnCategoryClick }) => {
  const arr = ["All", "Burgers", "Asian", "Pizza", "Desserts"];
  return (
    <div className=" flex gap-3 overflow-x-auto py-2 my-4">
      {arr.map((category) => (
        <button
          key={category}
          onClick={() => OnCategoryClick(category)}
          className={`filter-pill ${activecategory===category && "filter-pill-active"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
