import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}

export interface IOrder extends Document {
  userId: ObjectId | string;
  items: IOrderItem[];
  total: number;
  address: string;
}

const orderItemSchema = new Schema<IOrderItem>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
});

export const orderModel = mongoose.model<IOrder>("orders", orderSchema);
