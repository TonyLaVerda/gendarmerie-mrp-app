import mongoose from "mongoose";

const patrolSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    date: { type: String, required: true },
    heure: { type: String, required: true },
    unite: { type: String, required: true },
    agents: [{ type: String }], // Peut être ObjectId vers "Agent" si besoin
  },
  { timestamps: true }
);

export default mongoose.model("Patrol", patrolSchema);
