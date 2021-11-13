const mongoose = require('mongoose');


const businessPackagesSchema = new mongoose.Schema({
    title: {type: 'string', required: true},
    description: {type: 'string', required: true},
    image: {type: 'string', required: true},
    price: {type: 'string', required: true}
});

const BusinessPackages = mongoose.model("BusinessPackages", businessPackagesSchema);


module.exports = BusinessPackages;

