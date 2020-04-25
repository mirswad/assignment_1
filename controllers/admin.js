
const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',  {
        pageTitle: 'ADD PRODUCT',
        path: '/add-product',
        productCSS: true,
        activeProduct: true,
        editing: false });
    };
    
    
    exports.postAddProduct = (req, res, next) => {
        console.log('in post add controller');
        const title = req.body.product;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const userId = req.user;
        
        const product = new Product(
            title,
            price, 
            description, 
            imageUrl, 
            null, 
            req.user._id);
        product.save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        });
        
    
    //products.push({ title: req.body.title});
    //res.sendFile(path.join(RouteDir, 'views', 'shop.html'));
    };

    


    exports.getEditProduct = (req, res, next) => {
        const editMode = req.query.edit;
        if(!editMode) 
        {
            return res.redirect('/');
        }

        const prodId = req.params.productId;
        Product.findById(prodId)
        //Product.findByPk(prodId)
        .then(product => {
            if(!product)
            {
                res.redirect('/');
            }
            console.log(product);
            res.render('admin/edit-product', {
                path: '/edit-product',
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product
            });
        }).catch(err => console.log(err));

     };

exports.postEditProduct = (req, res, next) => { 
    const prodId = req.body.productId;
    
    const updatedTitle = req.body.product;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
   
   

    const product = new Product(
        updatedTitle, 
        updatedPrice,
        updatedDescription, 
        updatedImageUrl,        
        prodId
         );
    product.save()
    .then(result => {
        console.log('Product Updated');
        res.redirect('/admin/products');

    })

    .catch(err => console.log(err));


}


exports.postDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(() => {
        console.log('in controller/delete prod');
            res.redirect('/admin/products');
    })
    .catch(err=> {
        console.log(err);
    });
    
}

    exports.getProducts = (req, res, next) => {

        //Product.findAll()
        Product.fetchAll()
        .then((products)=> {
            res.render('admin/products', 
            {prods: products,
             pageTitle: 'Admin Products',
             path: '/products',
             hasProducts: products.length > 0,
             activeShop: true
            });

        }).catch(err => console.log(err));


        
    };
    