const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.send('No hay index')
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
		let errors = validationResult(req);
		console.log(errors.mapped());
		if(!errors.isEmpty()){
		let oldData = req.body;
			return res.render('register', {errors: errors.mapped(), oldData})
		} else {
		let userToRegister = req.body;
		delete userToRegister.password_confirm;
		let newUser={
			...userToRegister,
			password: bcrypt.hashSync(userToRegister.password, 10),
			image: req.file? req.file.filename : "default-avatar.png"
		}
		users.push(newUser)
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/users/login/');
		
	}
	},
	login:(req,res)=>{
		res.render('login')
	},
	loginProcess: (req, res)=>{
		console.log("user" + req.body.password);

		const userToLogin = users.find(oneUser => oneUser.email === req.body.email);

		console.log("pass" + userToLogin.password)
		if(userToLogin){
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password)
			if(isPasswordCorrect){
				delete userToLogin.password;
				
				req.session.userLogged= userToLogin;
			
				if(req.body.recordame != undefined){
			
				res.cookie("recordame", req.session.userLogged.email, {maxAge: 100000})
				}
			return res.redirect('/');
			}
		}
		return res.redirect('/');

	},

	logout:(req, res)=>{
		req.session.userLogged = undefined;
		users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		res.redirect("/");
	},

	check:(req, res)=>{
		if ( req.session.userLogged){

			res.send("el ususario logeado es " + req.session.userLogged.name)
		} else {
			res.send("No estas logeado ")
		}
	},
	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let user = users.find(oneUsers => oneUsers.id == id );
		res.render('register', {
			user
		})
	},

	profile: (req, res)=>{

		res.render("profile", {user:req.session.userLogged})

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