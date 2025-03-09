import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  stock: number;
  price: number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
});

const productModel = mongoose.model<IProduct>("products", productSchema);

export default productModel;
