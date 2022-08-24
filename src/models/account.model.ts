import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface AccountInput {
  user: UserDocument["_id"];
  balance: number;
  outcome: number;
  income: number;
}

export interface AccountDocument extends AccountInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
      unique: true,
      default: () => `account_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number, required: true },
    outcome: { type: Number, required: true },
    income: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);

export default AccountModel;
