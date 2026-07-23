import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: String,
  hex: String
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    tagline: String,
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    originalPrice: Number,
    category: {
      type: String,
      required: true,
      index: true
    },
    rating: {
      type: Number,
      default: 5.0
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    images: [{
      type: String
    }],
    colors: [colorSchema],
    sizes: [String],
    description: String,
    features: [String],
    stock: {
      type: Number,
      default: 10,
      min: 0
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

productSchema.pre('save', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
