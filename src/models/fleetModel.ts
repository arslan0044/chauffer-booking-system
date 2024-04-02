import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "Please provide a Car model"],
    unique: true,
  },
  price: {
    type: String,
    required: [true, "Please provide a Car Price"],
  },
  type: {
    type: String,
    required: [true, "Please provide a Type "],
  },
  seats: {
    type: String,
    required: [true, "Please provide a Type "],
  },
  doors: {
    type: String,
    required: [true, "Please provide a Type "],
  },
  img: {
    type: String,
    required: [true, "Please provide a Type "],
  },
});
const Service =
  mongoose.models.services || mongoose.model("services", serviceSchema);
export default Service;
