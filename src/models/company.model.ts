import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import {LocationDocument} from  './location.model'
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CompanyInput {
  location: LocationDocument[ "_id" ];
  name: string;
  description?: string;
  taxNb: string;
  url: string;
  image?: string;
}

export interface CompanyDocument extends CompanyInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
      default: () => `company_${nanoid()}`,
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    name: { type: String, required: true },
    description: { type: String, required: false },
    taxNb: { type: String, required: true },
    url: { type: String, required: true },
    image: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model<CompanyDocument>("Company", companySchema);

export default CompanyModel;
