import mongoose, { Schema, model } from "mongoose";

const addressSchema = new mongoose.Schema({
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  address: addressSchema,
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

// toJSON-Methode: Die Felder password und __v werden in der JSON-Ausgabe weggelassen. Dies ist wichtig, um Kennwörter beim Export von Benutzerdaten zu schützen.
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const User = model("User", userSchema);
