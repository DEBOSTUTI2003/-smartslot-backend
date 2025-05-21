import express from 'express';
import { getVendors, getVendorSlots } from '../controllers/vendorController.js';

const router = express.Router();

router.get('/', getVendors);
router.get('/:vendorId/slots', getVendorSlots);

export default router;
