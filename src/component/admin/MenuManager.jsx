import { useState } from "react";
import { createItem, updateItem, deleteItem } from "../../services/api";

const MenuManager = ({ menuItems, setMenuItems }) => {
  const initialFormState = {
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
    restaurantId: "1",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      restaurantId: item.restaurantId || "1",
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await deleteItem(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Failed to delete item."+err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price: parseFloat(formData.price) };

      if (editingId) {
        const updated = await updateItem(editingId, payload);
        setMenuItems((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item)),
        );
      } else {
        const created = await createItem(payload);
        setMenuItems((prev) => [...prev, created]);
      }

      setFormData(initialFormState);
      setEditingId(null);
    } catch (err) {
      alert("Failed to save menu item."+err);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="panel p-6 border border-white/10 rounded-xl bg-midnight-card">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? "Edit Menu Item" : "Add New Item"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="input"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="input"
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            className="input"
            name="category"
            placeholder="Category (e.g. Burgers)"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <input
            className="input"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="input md:col-span-2"
            name="description"
            placeholder="Description"
            rows="2"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <div className="md:col-span-2 flex gap-3 mt-2">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Item" : "Add Item"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData(initialFormState);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="food-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="food-card flex flex-col p-4 border border-white/10 rounded-xl bg-[#171717]"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-white">{item.name}</h3>
            <p className="text-brand font-bold mb-4">${item.price}</p>

            <div className="flex gap-2 mt-auto">
              <button
                className="btn btn-secondary flex-1 py-2 text-sm"
                onClick={() => handleEditClick(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger flex-1 py-2 text-sm bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;
