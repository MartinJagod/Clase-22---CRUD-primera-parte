const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products, toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find(oneProduct => oneProduct.id == id );
		res.render('detail', {
			product, toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log(req.file);
		console.log(req.body);
		// Do the magic
		let newProduct={
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image:req.file? req.file.filename : "default-image.png"
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let product = products.find(oneProduct => oneProduct.id == id );
		res.render('product-edit-form', {
			product, toThousand
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id
		let producToEdit = products.find(product => product.id == id)

		producToEdit ={
			id: producToEdit.id,
			...req.body,
			image: producToEdit.image
		};

		let newProducts = products.map(product=>{
			if (product.id == producToEdit.id){
				return product = {...producToEdit}
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect('/products/');


	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
	let id = req.params.id
	let finalProducts = products.filter(product=> product.id != id);
	fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
	res.redirect('/');
	}
};

module.exports = controller;