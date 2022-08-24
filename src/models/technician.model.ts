import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TechnicianInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface TechnicianDocument extends TechnicianInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const technicianSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `technician_${nanoid()}`,
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

const TechnicianModel = mongoose.model<TechnicianDocument>("Technician", technicianSchema);

export default TechnicianModel;
