const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}], 
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    reviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Review'}]
});

const User = mongoose.model("User", userSchema);

User.createNew = async (user) => {
        user._id = new mongoose.Types.ObjectId();
        const model = new User(user);
        return model;
};

module.exports = User;