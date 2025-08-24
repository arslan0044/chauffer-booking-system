import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const SliderSchema = new Schema({
    image: String,
    title: String,
    description: String,
})

const Slider = mongoose.models.Slider || model("Slider", SliderSchema)

export default Slider