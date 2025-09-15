const cron = require("node-cron");
const Order = require("../models/orders/OrderSchema");

const statusStages = ["Order Placed", "Processing", "Shipped", "Delivered"];

module.exports = () => {
  // Schedule cron job to run every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
    try {
      const orders = await Order.find({ status: { $nin: ["Delivered", "Canceled", "Returned"] } });
      for (const order of orders) {
        const statusIndex = statusStages.indexOf(order.status);
        if (statusIndex < statusStages.length - 1) {
          order.status = statusStages[statusIndex + 1];
          await order.save();
          console.log(`Updated order ${order.orderId} to status: ${order.status}`);
        }
      }
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });
  console.log("Cron job scheduled for order status updates");
};