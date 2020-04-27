const express = require('express');
const path = require('path');
const admindata = require('./admin');

const router = express.Router();
const shopController = require('../controllers/shop');
//All shop controller start
 router.get('/', shopController.getIndex);
 router.get('/products', shopController.getProducts);

 router.get('/products/:productId', shopController.getProduct);

//  router.get('/cart', shopController.getCart);
//  router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// router.post('/cart', shopController.postCart);
// //
// router.get('/orders', shopController.getOrder);
// router.post('/create-order', shopController.postOrder);

// All shop controllers end
// router.get('/checkout', shopController.getCheckout);



module.exports = router;


