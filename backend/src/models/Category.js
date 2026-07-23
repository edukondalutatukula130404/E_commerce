import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    itemCount: { type: Number, default: 0 },
    icon: { type: String, default: 'Cpu' },
    status: { type: String, enum: ['Active', 'Draft'], default: 'Active' }
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
