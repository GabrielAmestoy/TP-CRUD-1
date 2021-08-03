const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = require("../utils/toThousand");
const finalPrice = require("../utils/finalPrice")

// replace() utilizado para remplazar caracteres dentro de una cadenas de caracteres 
//toString() convierte una variable number en string

const controller = {
	index: (req, res) => {
		return res.render("index",{
			visitadas: products.filter(product => product.category === "visited"),
			ofertas: products.filter(product => product.category === "in-sale"),
			toThousand,
			finalPrice

			})
	},
	search: (req, res) => {
		if(req.query.keywords.trim() != ""){
			let resultados = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
		// includes(): Indica si la cadena de caracteres esta incluida  detro de cada producto(cadena de carateres)
		// toLowerCase(): Convierte toda la cadena en minusculas para evitar que el usuario escriba todo en mayus
		// trim(): Elimina los espacios
			return res.render("results",{
				resultados,
				toThousand,
				finalPrice,
				busqueda: req.query.keywords.trim(),
			})
		}else{
			res.redirect("/");
		}
		
	},
}


module.exports = controller;
