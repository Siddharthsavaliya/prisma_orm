const express = require('express');
const productController = require('../controller/product');
const router = express.Router();
router
    .get('/products', productController.getProducts)
    .get('/product/:id', productController.getProductById)
    .post('/product', productController.addProduct)
    .patch('/product/:id', productController.updateProductById)
    .delete('/product/:id', productController.deleteProductById)



exports.routes = router