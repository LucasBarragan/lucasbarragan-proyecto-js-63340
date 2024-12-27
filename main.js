const Producto = function(nombre, precio, color){
  this.nombre = nombre
  this.precio = precio
  this.color = color
}

let producto1 = new Producto("remera", 15000, "azul")
let producto2 = new Producto("pantalon", 7000, "negro")
let producto3 = new Producto("medias", 3000, "blancas")
let producto4 = new Producto("boxer", 15000, "gris")
let producto5 = new Producto("gorra", 15000, "verde")

let lista = [producto1, producto2, producto3, producto4, producto5,]

function filtrarProducto(){
  let palabraClave = prompt("Ingresa tu producto")
  let resultado = lista.filter( (x)=>x.nombre.toUppercase().includes(palabraClave))
  
  if(resultado.length > 0){
    console.table(resultado)
  }else{
    alert("No se encontro el resultado")
  }
}

function agregarProducto(){

  let nombre = prompt("Que producto buscas? (remera-pantalon-medias-boxer-gorra)")
  let precio = prompt("Ingresa el monto del producto")
  let color = prompt("Ingresar el color del producto")

if(isNaN(precio) || color == "" || nombre ==""){
  alert("Verifique que los valores ingresados sean correctos")
  return
}

let producto = new Producto(nombre, color, precio)
lista.push(producto)
console.log(lista)
}
