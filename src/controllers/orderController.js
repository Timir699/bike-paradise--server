const express = require('express');
const {NotFound} = require('../utils/errors')
const {getAllOrders, getOrderById, saveOrder, updateOrder, deleteOrderById} = require('../services/orderService')


const router = express.Router();


const getHandler = async (req, res, next) => {
     try {
        const orders = await getAllOrders();
        res.status(200).send(orders);
    } catch (error) {
        return next(error, req, res);
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await getOrderById(id);
        if (order) {
            res.status(200).send(order);
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
        const id = await saveOrder(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};
const putHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await updateOrder(id);
        res.status(200).send(result);
    } catch (error) {
        return next(error, req, res);
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteOrderById(id);
        res.status(200).send("Order deleted");
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