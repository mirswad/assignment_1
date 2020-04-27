const Product = require('../models/product');

// const Cart = require('../models/cart');
// const Order = require('../models/order');

// const products = [];



exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
        res.render('shop/product-list', { 
            prods: products,
            pageTitle: 'Products',
            path: '/products',
            //hasProducts: products.length > 0,
            activeShop: true
           });
    
       }).catch(err => {
           console.log(err);
       });
  
   
    
   
};

// Extracting single Product
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {      
      
        res.render('shop/product-detail',{
            product: product, 
            pageTitle: product.title,
            path: '/products'});

    })
    .catch(err => console.log(err));

     
    
};


exports.getIndex = (req, res, next) => {

   Product.find()
   .then(products => {
    res.render('shop/index', { 
        prods: products,
        pageTitle: 'Shops',
        path: '/',
        //hasProducts: products.length > 0,
        activeShop: true
       });

   }).catch(err => {
       console.log(err);
   });
    
    
};

exports.getCart = (req, res, next) => { 
    console.log('control1');
    req.user.getCart().then(products => {           
            res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Cart',
                        products: products
                        //total: cart.totalPrice
                    });
            })
    .catch(err =>
        console.log(err));
    };

      

exports.postCart = (req, res, next) => {
    productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
    
  
};

exports.postCartDeleteProduct = (req, res, next) => {
    prodId= req.body.productId;
    req.user.deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));

};

  
exports.postOrder = (req, res, next) => {
    prodId = req.body.productId;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));

   
}

exports.getOrder = (req, res, next) => {
    req.user
    .getOrder()
    .then(order => {
        res.render('shop/orders' , 
    {
        path: '/orders',
        pageTitle: 'Orders',
        orders: order
    });
    
    })
    .catch(err => {
        console.log(err);
    })

    
};


exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};
    
