import mongoose from "mongoose";

const patrolSchema = new mongoose.Schema({
  type: String,
  date: String,
  heure: String,
  unite: String,
  agents: [String],
}, { timestamps: true });

export default mongoose.model("Patrol", patrolSchema);
