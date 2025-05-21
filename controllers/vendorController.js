import Vendor from '../models/Vendor.js';

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorSlots = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ vendorId: req.params.vendorId });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ slots: vendor.slots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
