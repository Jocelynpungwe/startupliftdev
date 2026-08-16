import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    profilePicture: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "manager", "salesperson"],
      default: "salesperson"
    },
    permissions: {
      type: [String],
      default: ["lead:create", "lead:read", "dashboard:read"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
