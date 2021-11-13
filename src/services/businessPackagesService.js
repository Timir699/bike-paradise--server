const models = require("../models");

const Model = models.BusinessPackages;

const getAllBusinessPackages = async () => {
    const businessPackages = await Model.find();
    return businessPackages
}

const getBusinessPackageById = async (id) => {
    const businessPackage = Model.findById(id);
    return businessPackage
}

const saveBusinessPackage = async (businessPackage) => {
    const item = await Model.create(businessPackage);
    return item.id
}

const updateBusinessPackage = async (id, businessPackage) => {
    const item = await Model.findById(id);
    if(item) {
        item.title = businessPackage.title || item.title;
        item.price = businessPackage.price || item.price;
        item.image = businessPackage.image || item.image;
        item.description = businessPackage.description || item.description;
        return item._id
    }
   throw new NotFound('Product not found by the id: ' + id);

}

const deleteBusinessPackageById = async (id) => {
    const item = await Model.findById(id);
    if(item) {
        await Model.deleteOne({_id: id})
    }
    throw new NotFound('Product not found by the id: ' + id);
};


module.exports = {
    getAllBusinessPackages,
    getBusinessPackageById,
    saveBusinessPackage,
    updateBusinessPackage,
    deleteBusinessPackageById
}
