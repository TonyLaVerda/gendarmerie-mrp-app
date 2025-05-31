import mongoose from "mongoose";

const interventionSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    type: { type: String, required: true },
    unite: { type: String, required: true },
    date: { type: String, required: true },
    heure: { type: String, required: true },
    agents: [{ type: String }], // ou ObjectId si tu veux référencer des agents
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Intervention", interventionSchema);
