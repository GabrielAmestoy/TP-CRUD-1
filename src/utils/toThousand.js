module.exports = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //expresiones regulares
// replace() utilizado para remplazar caracteres dentro de una cadenas de caracteres 
//toString() convierte una variable number en string