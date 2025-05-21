import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  vendorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slots: [String]  // e.g., ["10:00 AM", "11:00 AM"]
});

export default mongoose.model("Vendor", vendorSchema);
