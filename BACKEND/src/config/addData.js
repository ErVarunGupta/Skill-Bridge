import User from "../models/UserModel.js";
import csv from "csvtojson";
import bcrypt from 'bcrypt'


const importUsers = async () => {
  try {
    const users = await csv().fromFile("C:/Users/HP/Desktop/Skill Bridge/BACKEND/src/data/user_dataset_25000.csv");

    // Ensure password hashing if needed
    // Example (bcrypt):
    for (let u of users) {
      u.password = await bcrypt.hash(u.password, 10);
    }

    await User.insertMany(users);

    console.log("All users imported successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

importUsers();