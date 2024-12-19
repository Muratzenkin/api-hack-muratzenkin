import mongoose from "mongoose";

mongoose.connection.on("connected", () =>
  console.log("DB connection establisched")
);

mongoose.connection.on("error", (err) => console.log("DB error", err));

export async function connect() {
  await mongoose.connect(process.env.MONGO_DB_URI);
}
