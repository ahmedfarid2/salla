import productModel from "../models/product.model";

export const fetchProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Apple iPhone 14 Pro Max 128GB - Space Black",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
      price: 1099,
      stock: 50,
    },
    {
      title: "Samsung Galaxy S22 128GB (Unlocked)",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
      price: 799,
      stock: 75,
    },
    {
      title: "Sony WH-1000XM4 Noise-Canceling Wireless Headphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
      price: 348,
      stock: 120,
    },
    {
      title: "Dell XPS 13 9310 2-in-1 Laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYMqUoRyfdXPNanGztwZ144UcxK_WCnZpYQ&s",
      price: 1499,
      stock: 30,
    },
    {
      title: "Apple Watch Series 7 (GPS + Cellular) 45mm",
      image:
        "https://www.bestbuy.com/site/apple-watch-series-7-gps-cellular-45mm-graphite-stainless-steel-case-with-abyss-blue-sport-band-graphite-at-t/6339804.p",
      price: 749,
      stock: 60,
    },
  ];

  const existingProducts = await fetchProducts();

  if (existingProducts.length === 0) await productModel.insertMany(products);
};
