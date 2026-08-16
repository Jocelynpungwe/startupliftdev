import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    businessInfo: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "approved", "rejected", "pending"],
      default: "new"
    },
    dealValue: { type: Number, default: 0, min: 0 },
    closedAt: { type: Date, default: null },
    salesPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

leadSchema.index({
  companyName: "text",
  email: "text",
  phone: "text",
  location: "text"
});

export default mongoose.model("Lead", leadSchema);
