import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet( "abcdefghijklmnopqrstuvwxyz0123456789", 10 );

export interface LocationInput
{
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
