
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
  button: String,
  images: [String],
});

const ServicePageSchema = new mongoose.Schema({
  services: [ServiceSchema],
  features: [FeatureSchema],
});

export default mongoose.model("ServicePage", ServicePageSchema);
