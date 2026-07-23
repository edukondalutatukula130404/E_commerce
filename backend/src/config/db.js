import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async () => {
  try {
    // Configure public DNS servers (Google 8.8.8.8 / Cloudflare 1.1.1.1) to resolve MongoDB SRV records reliably on Windows
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (e) {
      console.warn('DNS server override skipped:', e.message);
    }

    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/switches_ecommerce';
    console.log(`⏳ [MongoDB] Connecting to database cluster...`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`⚡ [MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB Atlas] Connection Error: ${error.message}`);
  }
};
