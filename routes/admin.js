
const express = require('express');
const path = require('path');
 const RouteDir =require('../util/path');

const router = express.Router();


const adminController = require('../controllers/admin'); 
// All admin routes start
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);
// All admin routes end

// exports.routes = router;
// exports.products = products;
 module.exports = router;
// module.exports = products;

