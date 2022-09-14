const { Console } = require('console');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


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


//Mostrará el formulario de creación para un producto
router.get('/register', guestMiddleware, usersController.register);

//Deberá recibir los datos del formulario de creación
router.post('/register', upload.single("avatar"), [
    check('name').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('email').isEmail().withMessage('Debe un email valido'),
    check('password').isLength({min:3}).withMessage('Debe ingresar clave de mas de 3 caracteres'),

]  , usersController.store);

router.get('/login', guestMiddleware, usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/logout', usersController.logout);

//Botón MODIFICAR: modificará al producto
router.get('/profile', authMiddleware, usersController.profile);
//Deberá recibir los datos del formulario de edición

router.put('/:id', usersController.update);

//Botón BORRAR: eliminará al producto
router.delete('/:id', usersController.destroy);


module.exports = router;