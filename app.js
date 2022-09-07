const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');

const mainRouter = require ("./routes/mainRouter");
const productsRouter = require ("./routes/productsRouter");
app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.set("view engine", "ejs");

app.use(methodOverride('_method'));

app.use((req, res, next)=> {
    console.log("Pasaste por el middleware de aplicación");
    next();
})

app.use('/', mainRouter);
app.use('/products', productsRouter);

app.use((req, res)=>{
    res.status(404).render('not-found');
})

app.listen(3000, ()=>{console.log("Servidor corriendo en puerto 3000")});


