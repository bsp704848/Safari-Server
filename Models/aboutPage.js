import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const SuccessStorySchema = new mongoose.Schema({
  name: String,
  quote: String,
  photo: String,
});

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  photo: String,
});

const AboutPageSchema = new mongoose.Schema(
  {
    pageTitle: String,
    subtitle: String,
    description: String,
    whySafari: [CardSchema],
    successStories: [SuccessStorySchema],
    team: [TeamMemberSchema],
  },

);

export default mongoose.model("AboutPage", AboutPageSchema);
