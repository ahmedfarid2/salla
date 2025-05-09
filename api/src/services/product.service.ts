import productModel from "../models/product.model";

export const fetchProducts = async () => {
  const data = await productModel.find();
  return { data, statuscode: 200 };
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Apple iPhone 14",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
        price: 12300,
        stock: 50,
      },
      {
        title: "Samsung Galaxy S22",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
        price: 5000,
        stock: 75,
      },
      {
        title: "Apple Watch 7",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
        price: 40000,
        stock: 60,
      },
    ];

    const existingProducts = await fetchProducts();

    if (existingProducts.data.length === 0)
      await productModel.insertMany(products);
  } catch (err) {
    console.log("Error seeding products", err);
  }
};
