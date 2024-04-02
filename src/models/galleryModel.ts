import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  img: {
    type: String,
    required: [true, "Please provide a Image "],
  },
});
const Gallery =
  mongoose.models.imgs || mongoose.model("imgs", gallerySchema);
export default Gallery;
