const express = require('express');
const {NotFound} = require('../utils/errors')
const {getAllBusinessPackages, getBusinessPackageById, saveBusinessPackage, updateBusinessPackage, deleteBusinessPackageById} = require('../services/businessPackagesService')


const router = express.Router();

const getHandler = async (req, res, next) => {
     try {
        const businessPackages = await getAllBusinessPackages();
        res.status(200).send(businessPackages);
    } catch (error) {
        return next(error, req, res);
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const businessPackage = await getBusinessPackageById(id);
        if (businessPackage) {
            res.status(200).send(businessPackage);
        }
        else {
            throw new NotFound('The package not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await saveBusinessPackage(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await updateBusinessPackage(id);
        res.status(200).send(result);
    } catch (error) {
        next(error, req, res);
    }
}
const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteBusinessPackageById(id);
        res.status(200).send("Product deleted");
    } catch (error) {
        return next(error, req, res);
    }
}


router.get('/', getHandler);
router.get('/:id', getByIdHandler);
router.post('/', postHandler);
router.put('/:id', putHandler);
router.delete('/:id', deleteHandler);

module.exports = router;