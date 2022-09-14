const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const mainRouter = require ("./routes/mainRouter");
const productsRouter = require ("./routes/productsRouter");
const usersRouter = require ("./routes/usersRouter");
const recordameMiddleware = require ("./middlewares/recordameMiddleware");
const userLoggedMD = require ("./middlewares/userLoggedMiddleware");

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(session({
    secret: "Secreto!!",
    resave: false,
    saveUninitialized: true,
}))
app.use(cookieParser());
app.use(recordameMiddleware);
app.use(userLoggedMD);

app.set("view engine", "ejs");

app.use(methodOverride('_method'));

app.use((req, res, next)=> {
    console.log("Pasaste por el middleware de aplicación");
    next();
})

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


app.use((req, res)=>{
    res.status(404).render('not-found');
})

app.listen(3000, ()=>{console.log("Servidor corriendo en puerto 3000")});


