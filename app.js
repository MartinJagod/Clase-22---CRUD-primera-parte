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

app.use('/', mainRouter);
app.use('/products', productsRouter);

app.listen(3000, ()=>{console.log("Servidor corriendo en puerto 3000")});

