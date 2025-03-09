import cartModel, { CartStatusEnum, ICartItem } from "../models/cart.model";
import { IOrderItem, orderModel } from "../models/order.model";
import productModel from "../models/product.model";

interface PostCartParams {
  userId: string;
}

const postCart = async ({ userId }: PostCartParams) => {
  const cart = await cartModel.create({ userId, totalAmout: 0 });
  await cart.save();
  return cart;
};

interface FetchCartParams {
  userId: string;
}

export const fetchCart = async ({ userId }: FetchCartParams) => {
  let cart = await cartModel.findOne({
    userId: userId,
    status: CartStatusEnum.Active,
  });

  if (!cart) {
    cart = await postCart({ userId });
  }

  return { data: cart, statusCode: 200 };
};

interface PostItemToCartParams {
  userId: string;
  productId: any;
  quantity: number;
}

export const postItemToCart = async ({
  userId,
  productId,
  quantity,
}: PostItemToCartParams) => {
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

interface PutItemToCartParams {
  userId: string;
  productId: any;
  quantity: number;
}

export const putItemInCart = async ({
  productId,
  userId,
  quantity,
}: PutItemToCartParams) => {
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

  let total = calculateTotalCartItems({ cartItems: otherCartItems });

  existsItemInCart.quantity = quantity;
  total += existsItemInCart.unitPrice * existsItemInCart.quantity;

  cart.data.totalAmout = total;

  const updatedCart = await cart.data.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};

interface DeleteItemToCartParams {
  userId: string;
  productId: any;
}

export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemToCartParams) => {
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

  const otherCartItems = cart.data.items.filter(
    (item) => item.product.toString() !== productId
  );

  const total = calculateTotalCartItems({ cartItems: otherCartItems });

  cart.data.items = otherCartItems;
  cart.data.totalAmout = total;

  const updatedCart = await cart.data.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };
};

const calculateTotalCartItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  let total = cartItems.reduce((sum, item) => {
    sum += item.unitPrice * item.quantity;
    return sum;
  }, 0);

  return total;
};

interface ClearCartParams {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCartParams) => {
  const cart = await fetchCart({ userId });
  cart.data.items = [];
  cart.data.totalAmout = 0;

  const updatedCart = await cart.data.save();
  return {
    data: updatedCart,
    statusCode: 200,
  };
};

interface CheckoutParams {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: CheckoutParams) => {
  if (!address) {
    return {
      data: "Address is required",
      statusCode: 400,
    };
  }

  const cart = await fetchCart({ userId });
  const orderItems: IOrderItem[] = [];

  for (const item of cart.data.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return {
        data: "Product not found",
        statusCode: 400,
      };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      productPrice: item.unitPrice,
      productQuantity: item.quantity,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    items: orderItems,
    userId: userId,
    total: cart.data.totalAmout,
    address: address,
  });

  await order.save();
  cart.data.status = CartStatusEnum.Completed;
  await cart.data.save();

  return {
    data: order,
    statusCode: 200,
  };
};
