const fs = require('fs');
const path = require('path');
const { Z_FIXED } = require('zlib');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = require("../utils/toThousand");
const finalPrice = require("../utils/finalPrice");
const checkId = require("../utils/ckeckId");

// replace() utilizado para remplazar caracteres dentro de una cadenas de caracteres 
//toString() convierte una variable number en string

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{
			products,
			finalPrice,
			toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = parseInt(req.params.id, 10);
		if(checkId(id,products)){
			let producto = products.find(product => product.id === +req.params.id);
			res.render("detail",{
				producto,
				toThousand,
				finalPrice
			});
		}else{
			res.redirect("/");
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,description,price,discount,category} = req.body;
		let producto = {
			id: products[products.length - 1].id + 1,
			name,
			description,
			price: +price,
			discount: +discount,
			image: "default-image.png",
			category
		}
		products.push(producto); // guardo los datos en el donde estan todos los productos
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8") // guardo el nuevo producto en la db
		return res.redirect("/");
	},

	// Update - Form to edit
	edit: (req, res) => {
		producto = products.find(producto => producto.id === +req.params.id); //busca el producto con su id
		res.render("product-edit-form",{
			producto, // envio los datos del producto para mostrarlo en la pagina de product-edit-form
		});
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount,category,description} = req.body; // toma los datos
		products.forEach(producto => {
			if (producto.id === +req.params.id){
				producto.id === +req.params.id;
				producto.name = name;
				producto.price = +price;
				producto.discount = +discount;
				producto.category = category;
				producto.description = description;
			}
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/products/detail/"+req.params.id);
		// el map crea nuevo array y foreach no
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const eliminarProducto = products.find(producto => producto.id === +req.params.id);
		const posicion = products.indexOf(eliminarProducto);
		products.splice(posicion, 1);   // splice(2,1) el primer parametro indica la posicion y el segundo cantidad
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/");

		//                     OTRA FORMA DE ELIMINAR  MAS SIMPLE
		// products = products.filter((producto) => producto.id !== +req.params.id);
		// fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		// res.redirect("/");    
		
	}
};

module.exports = controller;