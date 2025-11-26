import mongoose from "mongoose";

const dailyHistorySchema = new mongoose.Schema({
  // Reference to the user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  
  // Date for this history entry (stored as date only, no time)
  // This represents the date in the user's timezone
  date: {
    type: Date,
    required: true,
    index: true
  },
  
  // Maintain calories for that day
  maintainCalories: {
    type: Number,
    required: true
  },

  // Daily calories consumed for that day
  dailyCalories: {
    type: Number,
    required: true,
    default: 0
  },

  // Timestamp when this record was created
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Compound index to ensure one record per user per date
  // This prevents duplicate entries if scheduler runs multiple times
});

// Compound index: one history record per user per date
dailyHistorySchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyHistory", dailyHistorySchema);