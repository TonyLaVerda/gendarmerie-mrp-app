import mongoose from "mongoose";

const interventionSchema = new mongoose.Schema({
  titre: String,
  type: String,
  unite: String,
  date: String,
  heure: String,
  agents: [String],
  description: String,
}, { timestamps: true });

export default mongoose.model("Intervention", interventionSchema);
