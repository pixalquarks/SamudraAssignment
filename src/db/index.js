import mongoose from "mongoose";
import config from "../config.js";

const db_url = config.db.url;
const db_name = config.db.name;

if (!db_url || !db_name) {
  console.log("DB_URL or DB_NAME not set");
  throw new Error("DB_URL or DB_NAME not set");
}

const userAddressSchema = new mongoose.Schema({
  username: String,
  address: String,
});

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/samudra", () => {
  console.log("Connected to database");
});

mongoose.Promise = Promise;

mongoose.UserAddress = UserAddress;

export default mongoose;
