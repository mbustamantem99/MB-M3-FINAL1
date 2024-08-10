
// Clase Producto: representa un producto con nombre y precio
class Producto {
  // Constructor: inicializa el producto con nombre y precio
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase Carrito: representa un carrito de compras con productos y total
class Carrito {
  // Constructor: inicializa el carrito vacío
  constructor() {
    this.productos = [];
  }
  // Método agregarProducto: agrega un producto al carrito
  // Parámetros: producto (Producto) y cantidad (número)
  agregarProducto(producto, cantidad) {
    // Busca si el producto ya existe en el carrito
    const productoEnCarrito = this.productos.find(p => p.nombre === producto.nombre);
    if (productoEnCarrito) {
      // Si existe, aumenta la cantidad

      productoEnCarrito.cantidad += cantidad;
    } else {
      // Si no existe, lo agrega al carrito con la cantidad especificada

      this.productos.push({ ...producto, cantidad });
    }
  }

  // Método calcularTotal: calcula el total de la compra
  // Retorna: el total de la compra (número)
  calcularTotal() {
        // Suma el precio de cada producto multiplicado por su cantidad
    return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  // Método finalizarCompra: finaliza la compra y vacía el carrito
  finalizarCompra() {
    console.log('Compra finalizada');
    this.productos = [];
  }

    // Método mostrarDetalles: muestra los detalles de la compra
  mostrarDetalles() {
        // Obtiene el elemento detalles del DOM
    const detalles = document.getElementById('detalles');
    detalles.innerHTML = '';
        // Agrega un título al elemento detalles
    detalles.innerHTML += '<h2>Detalles de la compra:</h2>';
        // Recorre el arreglo de productos y agrega cada uno al elemento detalles
    this.productos.forEach(producto => {
      detalles.innerHTML += `<p>- ${producto.nombre} x ${producto.cantidad} = ${producto.precio * producto.cantidad}</p>`;
    });
  }

    // Método mostrarTotal: muestra el total de la compra
  mostrarTotal() {
        // Obtiene el elemento total del DOM

    const total = document.getElementById('total');
    if (total) {
            // Vacía el contenido del elemento total

      total.innerHTML = '';
      total.innerHTML += `<p>Total: ${this.calcularTotal()}</p>`;
    } 
  }
}

// Crea un objeto de la clase Carrito
const carrito = new Carrito();

// Arreglo de productos disponibles
const productosDisponibles = [
  new Producto('Arroz', 1500),
  new Producto('Fideos', 1200),
  new Producto('Carne Molida', 3190),
  new Producto('Pollo Asado', 7500),
  new Producto('Queso 1/4', 2500),
  new Producto('Pan de Molde', 2490),
];

// Evento para agregar un producto al carrito
document.getElementById('agregar').addEventListener('click', () => {
    // Muestra una lista de productos disponibles
  const listaProductos = productosDisponibles.map((producto, index) => `${index + 1}. ${producto.nombre} ($${producto.precio})`).join('\n');
    // Pide al usuario que seleccione un producto
  const seleccion = parseInt(prompt(`Seleccione un producto:\n\n${listaProductos}`));
    // Obtiene el producto seleccionado
  const producto = productosDisponibles[seleccion - 1];
  if (producto) {
        // Pide al usuario que ingrese la cantidad del producto
    const cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto.nombre} que desea agregar`));
        // Agrega el producto al carrito

    carrito.agregarProducto(producto, cantidad);
        // Muestra los detalles y el total de la compra
    carrito.mostrarDetalles();
    carrito.mostrarTotal();

        // Pide al usuario si desea agregar otro producto
    const respuesta = prompt('¿Desea agregar otro producto? (si/no)');
    if (respuesta.toLowerCase() !== 'si') {
      document.getElementById('agregar').disabled = true;
    }
  } else {
    alert('Seleccione un producto válido');
  }
});

// Evento para finalizar la compra
document.getElementById('finalizar').addEventListener('click', () => {
    // Muestra el total de la compra en un alert
  alert(`Total de la compra: ${carrito.calcularTotal()}`);
    // Finaliza la compra y vacía el carrito

  carrito.finalizarCompra();
    // Vacía los elementos detalles y total del DOM

  const detalles = document.getElementById('detalles');
  const total = document.getElementById('total');
  if (detalles) {
    detalles.innerHTML = '';
  }
  if (total) {
    total.innerHTML = '';
  }
    // Habilita el botón "Agregar" para que el usuario pueda agregar productos nuevamente
  document.getElementById('agregar').disabled = false;
});