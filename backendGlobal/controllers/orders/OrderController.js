const Order = require("../../models/orders/OrderSchema");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ orderDate: -1 })
      .lean();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const order = await Order.findOne({ orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (["Delivered", "Canceled", "Returned"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be canceled",
      });
    }
    order.status = "Canceled";
    order.orderStatus = {
      status: "Canceled",
      reason,
      date: new Date(),
    };
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order canceled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

// Return an order
exports.returnOrder = async (req, res) => {
  try {
    const { orderId, reason, refundMethod, bankDetails } = req.body;
    const order = await Order.findOne({ orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.status !== "Delivered" || order.orderStatus?.status === "Returned") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be returned",
      });
    }
    order.status = "Returned";
    order.orderStatus = {
      status: "Returned",
      reason,
      date: new Date(),
      refundMethod,
      bankDetails: refundMethod === "Bank" ? bankDetails : undefined,
    };
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order return requested successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to return order",
      error: error.message,
    });
  }
};

// Filter orders
exports.filterOrders = async (req, res) => {
  try {
    const { status, time, search } = req.query;
    let query = { userId: req.user.id };
    if (status && status !== "all") {
      query["$or"] = [
        { "orderStatus.status": status },
        { status: status, orderStatus: { $exists: false } },
      ];
    }
    if (time && time !== "anytime") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - parseInt(time));
      query.orderDate = { $gte: cutoff };
    }
    if (search) {
      query["$or"] = [
        { "items.productName": { $regex: search, $options: "i" } },
        { "items.description": { $regex: search, $options: "i" } },
        { orderId: { $regex: search, $options: "i" } },
      ];
    }
    const orders = await Order.find(query)
      .sort({ orderDate: -1 })
      .lean();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter orders",
      error: error.message,
    });
  }
};