
const express = require('express');
const path = require('path');
const app = express();

const body_parser = require('body-parser');
const PNFController = require('./controllers/error');

const User = require('./models/user');

const mongoConnect = require('./util/databases').mongoConnect;

//const expressHbr = require('express-handlebars');

//app.engine('hbs', expressHbr({ layoutsDir:'views/layouts/', extname:'hbs', defaultLayout:'main-layout'}));
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use((req, res, next) => {
 User.findById('5e956a9c8a1df43870dca832')
 .then(user => {
     req.user = new User(user.name, user.email, user.cart, user._id);
    next();
 })
 .catch(err => console.log(err));
 
});


app.use(body_parser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(PNFController.pnf);

//Associations
mongoConnect(() => {          
        app.listen(3000); 
   });



