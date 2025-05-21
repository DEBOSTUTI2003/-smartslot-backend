import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  vendorId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  slot: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
