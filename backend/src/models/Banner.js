import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    tag: String,
    image: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Scheduled', 'Draft'], default: 'Active' },
    link: String
  },
  { timestamps: true }
);

export const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
