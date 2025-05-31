// backend/models/Agent.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  grade: { type: String, required: true },
  unite: { type: String, required: true },
  specialites: { type: [String], default: [] },
  statut: { type: String, default: "Indispo" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // ✅ Lien utilisateur
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);
