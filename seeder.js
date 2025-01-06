import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./Models/userSchema.js";
import bcrypt from "bcrypt";

dotenv.config();

// MongoDB bağlantısı için bir modül
mongoose.connection.on("connected", () =>
  console.log("DB connection established")
);

mongoose.connection.on("error", (err) => console.error("DB error:", err));

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error; // Bağlantı hatasını üst seviyeye ilet
  }
}

// Sahte kullanıcı verisi oluşturma fonksiyonu
const generateFakeUsers = async (index) => {
  const password = await bcrypt.hash("password123", 10);
  return {
    username: `user${index}`,
    email: `user${index}@example.com`,
    password,
    bio: index % 2 === 0 ? `Bio for user ${index}` : "", // Bazı kullanıcılar için bio eklenmiş
    address: {
      streetName: `Street ${index}`,
      streetNumber: index,
      city: `City ${index}`,
      zipCode: 10000 + index,
    },
    role: index <= 2 ? "admin" : "user", // İlk 2 kullanıcı admin olacak
  };
};

// Veri tohumlama fonksiyonu
const seedData = async () => {
  try {
    // Veritabanına bağlan
    await connect();

    // Eski verileri temizle
    await User.deleteMany();
    console.log("Existing data cleared.");

    // Yeni kullanıcı verisi oluştur
    const users = await Promise.all(
      Array.from({ length: 100 }, (_, index) => generateFakeUsers(index + 1))
    );

    // Veriyi ekle
    await User.insertMany(users);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    // Veritabanı bağlantısını kapat
    await mongoose.disconnect();
    console.log("DB connection closed");
  }
};

// Tohumlama işlemini başlat
seedData();
