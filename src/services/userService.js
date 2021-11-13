const models = require("../models");

const Model = models.User;

const saveUser = async (user) => {
    const item = await Model.findOne({email: user.email});
    if(!item) {
        const model = await Model.createNew(user);
        const savedItem = await model.save();
        return savedItem._id;
    }
    return item.id;
};

const getAllUser = () => {
    return Model.find()
}

const getById = async (id) => {
    return await Model.findById(id).populate('orders').populate('reviews');
};

module.exports = { saveUser, getById, getAllUser };