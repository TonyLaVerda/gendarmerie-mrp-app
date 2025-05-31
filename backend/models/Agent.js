import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  grade: { type: String, required: true },
  unite: { type: String, required: true },
  specialites: { type: [String], default: [] },
  statut: { type: String, default: "Indispo" },
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);
