const models = require("../models");
const {NotFound} = require('../utils/errors')

const Model = models.Order;

const getAllOrders = async () => {
  const orders = await Model.find().populate('user');
  return orders;
};

const getOrderById = async (id) => {
  const order = await Model.findById(id).populate('user');
  return order;
};

const saveOrder = async (order) => {
  const {title, image, price, status} = order;
  const orderObject = {title, image, price, status};
  const user = await models.User.findOne({email: order.email});
  const userId = user._id;
  const newOrder = await new Model({
    ...orderObject, user: userId
  });
  const item = await newOrder.save()
  await models.User.updateOne({
    email: order.email
  }, {
    $push: {
      orders: item._id
    }
  })
  return item._id;
};

const updateOrder = async (id) => {
  const item = await Model.findById(id);
  if (item) {
    item.status = item.status === "pending" ? "approved" : "pending";
    await item.save();
    return item._id;
  }
   throw new NotFound('Order not found by the id: ' + id);
};

const deleteOrderById = async (id) => {
    const item = await Model.findById(id);
    if(item) {
        await Model.deleteOne({_id: id})
    }
    throw new NotFound('Order not found by the id: ' + id);
};

module.exports = {
    getAllOrders,
    getOrderById,
    saveOrder,
    updateOrder,
    deleteOrderById
}
