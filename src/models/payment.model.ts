import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PaymentInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface PaymentDocument extends PaymentInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model<PaymentDocument>("Payment", paymentSchema);

export default PaymentModel;
