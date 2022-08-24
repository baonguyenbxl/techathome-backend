import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { LocationDocument } from "./location.model";
import { CompanyDocument } from "./company.model";
import { JobDocument} from "../job.model";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TechnicianInput {
  user: UserDocument[ "_id" ];
  company?: CompanyDocument[ "_id" ];
  location?: LocationDocument[ "_id" ];
  lastJob?: JobDocument[ "_id" ];
  rateHour?: number;
  description?: string;
  picture?: string;
}

export interface TechnicianDocument extends TechnicianInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const technicianSchema = new mongoose.Schema(
  {
    locationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `technician_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: false },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: false },
    lastJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: false },
    rateHour: { type: Number, required: false },
    description: { type: String, required: false },
    picture: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

const TechnicianModel = mongoose.model<TechnicianDocument>("Technician", technicianSchema);

export default TechnicianModel;
