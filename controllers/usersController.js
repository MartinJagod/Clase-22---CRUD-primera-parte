const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			users
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let user = users.find(oneUser => oneUser.id == id );
		res.render('detail', {
			user
		})
	},

	// Create - Form to create
	register: (req, res) => {
		res.render('register')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		//let errors = validationResult(req);
		//console.log(errors.mapped());
		//if(!errors.isEmpty()){
		//	let oldData = req.body;
		//	return res.render('register', {errors: errors.mapped(), oldData})
		//} else {

			let newUser={
				...req.body,
				image:req.file? req.file.filename : "default-image.png"
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/users/login/');
	//}
	},
	login:(req,res)=>{
		res.render('login')
	},
	
	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let user = users.find(oneUsers => oneUsers.id == id );
		res.render('register', {
			user
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let user = users.find(oneUsers => oneUsers.id == id );

		userToEdit ={
			id: producToEdit.id,
			...req.body,
			image: producToEdit.image
		};

		let newUsers = users.map(user=>{
			if (user.id == userToEdit.id){
				return user = {...userToEdit}
			}
			return user;
		})

		fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
		users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		res.redirect('/users/');


	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
	let id = req.params.id
	let finalUsers = users.filter(user=> user.id != id);
	fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
	res.redirect('/');
	}
};

module.exports = controller;