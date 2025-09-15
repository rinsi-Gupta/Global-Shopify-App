const express = require("express");
const router = express.Router();
const {
  getOrders,
  cancelOrder,
  returnOrder,
  filterOrders,
} = require("../../controllers/orders/OrderController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/orders", authMiddleware, getOrders);
router.post("/cancel", authMiddleware, cancelOrder);
router.post("/return", authMiddleware, returnOrder);
router.get("/filter", authMiddleware, filterOrders);

module.exports = router;