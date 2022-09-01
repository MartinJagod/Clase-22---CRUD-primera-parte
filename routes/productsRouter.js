const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var multerStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) =>{
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
    })

var upload = multer({storage: multerStorage})


const productsController = require('../controllers/productsController');
const { route } = require('./mainRouter');

//Se deberán listar todos los productos presentes en la base de datos JSON 
//http://localhost:3000/products
router.get('/', productsController.index);

//Detalle de producto.
//http://localhost:3000/products/detail/3
router.get('/detail/:id', productsController.detail)

//Mostrará el formulario de creación para un producto
router.get('/create', productsController.create);
//Deberá recibir los datos del formulario de creación
router.post('/', upload.single('productImage') , productsController.store);

//Botón MODIFICAR: modificará al producto
router.get('/edit/:id', productsController.edit);
//Deberá recibir los datos del formulario de edición
router.put('/:id', productsController.update);

//Botón BORRAR: eliminará al producto
router.delete('/:id', productsController.destroy);


module.exports = router;