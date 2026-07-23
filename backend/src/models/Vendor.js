import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    storeName: String,
    sales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Pending', 'Suspended'], default: 'Active' },
    joinDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },
  { timestamps: true }
);

export const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
