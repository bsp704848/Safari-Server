
import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, 
});

const HomeSectionSchema = new mongoose.Schema({
  sectionTitle: String,
  subtitle: String,
  cards: [CardSchema],
});

export default mongoose.model("HomeSection", HomeSectionSchema);
