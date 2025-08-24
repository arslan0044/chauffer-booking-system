import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image URL is required"],
  },
  altText: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    enum: ['medium', 'large', 'full'],
    default: 'full',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Simple index for faster queries if your gallery grows
gallerySchema.index({ uploadedAt: -1 });

const Gallery = mongoose.models.image || mongoose.model('image', gallerySchema);
export default Gallery;