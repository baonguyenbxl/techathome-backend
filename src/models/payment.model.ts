import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { JobDocument} from  "./job.model"
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);


export interface PaymentInput {
  user: UserDocument[ "_id" ];
  job: JobDocument[ "id" ];
  amount: number;
  state: string;
  mode?: string;
  details?: string;
  tax?: number;
}

export interface PaymentDocument extends PaymentInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      default: () => `payment_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    amount: { type: String, required: true },
    state: { type: String, required: true },
    mode: { type: Number, required: false },
    details: { type: String, required: false },
    details: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model<PaymentDocument>("Payment", paymentSchema);

export default PaymentModel;
