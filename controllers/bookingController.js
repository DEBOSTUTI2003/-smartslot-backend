import Booking from '../models/Booking.js';
import Vendor from '../models/Vendor.js';
import nodemailer from 'nodemailer';

export const bookSlot = async (req, res) => {
  const { vendorId, name, email, slot } = req.body;

  try {
    const vendor = await Vendor.findOne({ vendorId });
    if (!vendor || !vendor.slots.includes(slot)) {
      return res.status(400).json({ message: "Invalid slot or vendor" });
    }

    const booking = new Booking({ vendorId, name, email, slot });
    await booking.save();

    vendor.slots = vendor.slots.filter(s => s !== slot);
    await vendor.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Booking Confirmed for ${slot}`,
      html: `<h3>Hello ${name},</h3><p>Your slot <b>${slot}</b> with <b>${vendor.name}</b> is confirmed.</p>`
    });

    res.json({ message: "Booking successful", booking });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
