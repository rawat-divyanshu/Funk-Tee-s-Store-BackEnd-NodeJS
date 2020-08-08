const Order = require("../models/order");
const Cart = require("../models/cart");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO SUCH ORDER FOUND",
        });
      }
      req.order = order;
      next();
    });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id fullName")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "NO ORDERS FOUND",
        });
      }
      res.json(orders);
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "ERROR IN PLACING ORDER",
      });
    }
    res.json(order);
  });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Error in Updating Order Status",
        });
      }
      res.json(order);
    }
  );
};
