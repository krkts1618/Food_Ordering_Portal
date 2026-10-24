const API_URL = "http://localhost:3000";

const getRestaurant = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  return response.json();
};

const getRestaurantById = async (id) => {
  const response = await fetch(`${API_URL}/restaurants/${id}`);
  return response.json();
};

const getFoods = async () => {
  const response = await fetch(`${API_URL}/foods`);
  return response.json();
};

const getFoodsById = async (id) => {
  const response = await fetch(`${API_URL}/foods/${id}`);
  return response.json();
};

const createItem = async (food) => {
  const response = await fetch(`${API_URL}/foods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  return response.json();
};

const updateItem = async (id, food) => {
  const response = await fetch(`${API_URL}/foods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  return response.json();
};

const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/foods/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const getOrder = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return response.json();
};

const createOrder = async (order) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return response.json();
};

const updateOrder = async (id, order) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return response.json();
};

export {
  getRestaurant,
  getRestaurantById,
  getFoods,
  getFoodsById,
  getOrder,
  createItem,
  createOrder,
  deleteItem,
  updateItem,
  updateOrder,
};
