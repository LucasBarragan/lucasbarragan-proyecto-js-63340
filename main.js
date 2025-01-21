class Producto {
  constructor(nombre, precio, color) {
    this.nombre = nombre;
    this.precio = precio;
    this.color = color;
  }
}

/* lista de productos */
let lista = [
  new Producto("remera", 15000, "azul"),
  new Producto("pantalon", 7000, "negro"),
  new Producto("medias", 3000, "blancas"),
];

/* guarda y carga los datos del local storage */
function guardarEnStorage() {
  localStorage.setItem("productos", JSON.stringify(lista));
}

function cargarDesdeStorage() {
  const productosGuardados = localStorage.getItem("productos");
  if (productosGuardados) {
    const productosParseados = JSON.parse(productosGuardados);
    lista = [];
    for (const prod of productosParseados) {
      lista.push(new Producto(prod.nombre, prod.precio, prod.color));
    }
  }
}

/* muestra los productos */
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  lista.forEach((producto, index) => {
    contenedor.innerHTML += `
      <div>
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Color: ${producto.color}</p>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;
  });
}

/* filtro */
function filtrarProducto() {
  const palabraClave = document.getElementById("busqueda").value.toLowerCase();
  const resultados = lista.filter(producto => producto.nombre.toLowerCase().includes(palabraClave));
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  if (resultados.length > 0) {
    resultados.forEach(producto => {
      contenedor.innerHTML += `
        <div>
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <p>Color: ${producto.color}</p>
        </div>
      `;
    });
  } else {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

/* agrega producto */
function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const color = document.getElementById("color").value;

  if (nombre && !isNaN(precio) && color) {
    lista.push(new Producto(nombre, precio, color));
    guardarEnStorage();
    mostrarProductos();
    document.getElementById("form-producto").reset();
  } else {
    alert("Por favor, complete todos los campos correctamente.");
  }
}

/* elimina producto */
function eliminarProducto(index) {
  lista.splice(index, 1);
  guardarEnStorage();
  mostrarProductos();
}

/* eventos */
cargarDesdeStorage();
mostrarProductos();
document.getElementById("btn-agregar").onclick = agregarProducto;
document.getElementById("btn-filtrar").onclick = filtrarProducto;
