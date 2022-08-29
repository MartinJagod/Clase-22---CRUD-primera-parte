const productsController = {
index:(req, res)=>{
    res.send("Listar todos los productos");
},

detail: (req, res) =>{
    const idProduct = req.params.id;
    res.send("Detalle del producto " + idProduct)
},
create: (req, res)=>{
    res.send("Formulario de creación");
},
store: (req, res)=>{
    res.send("Guardado de producto");
},
edit: (req, res)=>{
    const idProduct = req.params.id;
    res.send("Modificar producto " + idProduct);
},

update: (req, res)=>{
    res.send("Guardado el producto modificado");
},
destroy: (req, res)=>{
    const idProduct = req.params.id;

    res.send("Borrado del producto" + idProduct);
},


}

module.exports = productsController;
