
const express = require('express');
const path = require('path');
const app = express();

const body_parser = require('body-parser');
const PNFController = require('./controllers/error');

const User = require('./models/user');

const mongoose = require('mongoose');
//const expressHbr = require('express-handlebars');

//app.engine('hbs', expressHbr({ layoutsDir:'views/layouts/', extname:'hbs', defaultLayout:'main-layout'}));
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use((req, res, next) => {
 User.findById('5ea6a2ad53084a2ec8060054')
 .then(user => {
     req.user = user;
    next();
 })
 .catch(err => console.log(err));
 
});


app.use(body_parser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(PNFController.pnf);

mongoose.connect('mongodb+srv://admin:admin@cluster0-sm6lw.mongodb.net/shop')
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Mirswad',
                email: 'mirsadkm@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
    console.log('connected with mongo db');  
   
}).catch(err => {
    console.log(err);
});

