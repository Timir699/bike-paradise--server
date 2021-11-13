const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    status: {type: String, required: true, default: 'pending'},
    // email : {type: String, required: true},
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
});

const Order = mongoose.model("Order", orderSchema);


module.exports = Order;