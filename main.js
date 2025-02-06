class Producto {
  constructor(nombre, precio, color) {
    this.nombre = nombre;
    this.precio = precio;
    this.color = color;
  }
}

/* lista de productos (inicia vacia y se actualiza desde la API) */
let lista = [];

/* función para guardar la lista en el local storage */
function guardarEnStorage() {
  localStorage.setItem("productos", JSON.stringify(lista));
}

/* función para cargar la lista desde el local storage */
function cargarDesdeStorage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const productosGuardados = localStorage.getItem("productos");
      if (productosGuardados) {
        const productosParseados = JSON.parse(productosGuardados);
        lista = [];
        for (const prod of productosParseados) {
          lista.push(new Producto(prod.nombre, prod.precio, prod.color));
        }
      }
      resolve();
    }, 1500);
  });
}

/* cargar productos desde la API (JSONPlaceholder) */
function cargarDesdeAPI() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
      const nombresFijos = ["remera", "pantalon", "medias", "gorra", "bufanda"];
      const preciosFijos = [15000, 7000, 3000, 5000, 6000];
      const coloresFijos = ["azul", "negro", "blancas", "rojo", "verde"];
      
      lista = data.slice(0, 5).map((post, index) => {
        return new Producto(nombresFijos[index], preciosFijos[index], coloresFijos[index]);
      });
      guardarEnStorage(); 
    })
    .catch(error => {
      console.error("Error al cargar desde JSONPlaceholder:", error);
    });
}

/* muestra los productos en el DOM */
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "<p>Cargando productos...</p>";
  
  setTimeout(() => {
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
  }, 1000);
}

/* filtro de productos */
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

/* agrega producto usando POST a la API */
function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const color = document.getElementById("color").value;

  if (nombre && !isNaN(precio) && color) {
    const nuevoProducto = new Producto(nombre, precio, color);
    
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoProducto)
    })
      .then(response => response.json())
      .then(data => {
        lista.push(nuevoProducto);
        guardarEnStorage();
        mostrarProductos();
        document.getElementById("form-producto").reset();
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: `El producto "${nombre}" fue agregado correctamente.`,
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(error => console.error("Error al agregar producto:", error));
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, complete todos los campos correctamente."
    });
  }
}

/* elimina producto usando DELETE a la API */
function eliminarProducto(index) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este producto será eliminado.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("https://jsonplaceholder.typicode.com/posts/" + index, {
        method: "DELETE"
      })
        .then(response => {
          lista.splice(index, 1);
          guardarEnStorage();
          mostrarProductos();
          Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto ha sido eliminado correctamente.",
            timer: 2000,
            showConfirmButton: false
          });
        })
        .catch(error => console.error("Error al eliminar producto:", error));
    }
  });
}


/*eventos + primero cargamos la lista desde JSONPlaceholder y luego desde localStorage (si hay datos guardados)*/
cargarDesdeAPI().then(() => {
  cargarDesdeStorage().then(() => {
    mostrarProductos();
  });
});
document.getElementById("btn-agregar").onclick = agregarProducto;
document.getElementById("btn-filtrar").onclick = filtrarProducto;
