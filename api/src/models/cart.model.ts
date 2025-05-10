import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./product.model";

export enum CartStatusEnum {
  Active = "active",
  Completed = "completed",
}

export interface ICartItem {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: CartStatusEnum;
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(CartStatusEnum),
    required: true,
    default: CartStatusEnum.Active,
  },
});

const cartModel = mongoose.model<ICart>("carts", cartSchema);

export default cartModel;
