import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { TechnicianDocument } from "./technician.model"
import { CompanyDocument } from "./company.model"; 

const nanoid = customAlphabet( "abcdefghijklmnopqrstuvwxyz0123456789", 10 );

export interface LocationInput {
  user: UserDocument[ "_id" ];
  company: CompanyDocument[ "_id" ]; 
  technician: TechnicianDocument[ "_id" ];
  latitude?: string;
  longitude?: string;
  street: string;
  nb: string;
  city: string;
  zipcode: string;
  district?: string;
  country: string;
}

export interface LocationDocument extends LocationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new mongoose.Schema(
  {
    locationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `location_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" },
    street: { type: String, required: true },
    nb: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: false },
    country: { type: String, required: true },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const LocationModel = mongoose.model<LocationDocument>("Location", locationSchema);

export default LocationModel;
