import cartModel, { CartStatusEnum } from "../models/cart.model";
import productModel from "../models/product.model";

interface postCartParams {
  userId: string;
}

const postCart = async ({ userId }: postCartParams) => {
  const cart = await cartModel.create({ userId, totalAmout: 0 });
  await cart.save();
  return cart;
};

interface fetchCartParams {
  userId: string;
}

export const fetchCart = async ({ userId }: fetchCartParams) => {
  let cart = await cartModel.findOne({
    userId: userId,
    status: CartStatusEnum.Active,
  });

  if (!cart) {
    cart = await postCart({ userId });
  }

  return { data: cart, statusCode: 200 };
};

interface postItemToCartParams {
  userId: string;
  productId: any;
  quantity: number;
}

export const postItemToCart = async ({
  userId,
  productId,
  quantity,
}: postItemToCartParams) => {
  const cart = await fetchCart({ userId });

  const existsItemInCart = cart.data.items.find(
    (item) => item.product.toString() === productId
  );

  if (existsItemInCart) {
    return {
      data: "Item already exists in cart",
      statusCode: 400,
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: "Product not found",
      statusCode: 400,
    };
  }

  if (product.stock < quantity) {
    return {
      data: "Product out of stock",
      statusCode: 400,
    };
  }

  cart.data.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.data.totalAmout += product.price * quantity;
  const updatedCart = await cart.data.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};

interface putItemToCartParams {
  userId: string;
  productId: any;
  quantity: number;
}

export const putItemInCart = async ({
  productId,
  userId,
  quantity,
}: putItemToCartParams) => {
  const cart = await fetchCart({ userId });

  const existsItemInCart = cart.data.items.find(
    (item) => item.product.toString() === productId
  );

  if (!existsItemInCart) {
    return {
      data: "Item not found in cart",
      statusCode: 400,
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: "Product not found",
      statusCode: 400,
    };
  }

  if (product.stock < quantity) {
    return {
      data: "Product out of stock",
      statusCode: 400,
    };
  }

  const otherCartItems = cart.data.items.filter(
    (item) => item.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, item) => {
    sum += item.unitPrice * item.quantity;
    return sum;
  }, 0);

  existsItemInCart.quantity = quantity;
  total += existsItemInCart.unitPrice * existsItemInCart.quantity;

  cart.data.totalAmout = total;
  
  const updatedCart = await cart.data.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};
