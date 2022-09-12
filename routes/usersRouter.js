const { Console } = require('console');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require("express-validator");


var multerStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images/users')
    },
    filename: (req, file, cb) =>{
        cb(null, "avatar-" + Date.now() + path.extname(file.originalname))
    }
    })

var upload = multer({storage: multerStorage})


const usersController = require('../controllers/usersController');
const middlewareRutas = require ("../middlewares/ejemploRutas")

//Se deberán listar todos los productos presentes en la base de datos JSON 
//http://localhost:3000/products
router.get('/', middlewareRutas, usersController.index);

//Detalle de producto.
//http://localhost:3000/products/detail/3
router.get('/detail/:id', usersController.detail)

//Mostrará el formulario de creación para un producto
router.get('/register', usersController.register);
//Deberá recibir los datos del formulario de creación
router.post('/', upload.single("avatar"), [
    check('name').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('email').isEmail().withMessage('Debe un email valido'),
    check('password').isLength({min:3}).withMessage('Debe ingresar clave de mas de 3 caracteres'),
    check('pass_confirm').isLength({min:3}).withMessage('Debe ingresar clave de mas de 3 caracteres'),

]  , usersController.store);
router.get('/login', usersController.login);

//Botón MODIFICAR: modificará al producto
router.get('/edit/:id', usersController.edit);
//Deberá recibir los datos del formulario de edición
router.put('/:id', usersController.update);

//Botón BORRAR: eliminará al producto
router.delete('/:id', usersController.destroy);


module.exports = router;