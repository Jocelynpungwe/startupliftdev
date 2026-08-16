import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";

await connectDB();

const password = await bcrypt.hash("Admin123!", 12);

const admin = await User.findOneAndUpdate(
  { email: "admin@crm.local" },
  {
    firstName: "System",
    lastName: "Admin",
    email: "admin@crm.local",
    password,
    role: "admin",
    permissions: [
      "lead:create",
      "lead:read",
      "lead:update",
      "lead:delete",
      "dashboard:read"
    ]
  },
  { upsert: true, new: true }
);

console.log(`Admin ready: ${admin.email}`);
process.exit(0);
