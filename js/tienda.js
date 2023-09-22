// Variables globales
const carritoIcono = document.getElementById('carrito-icono');
const carritoMenu = document.getElementById('carrito-menu');
const carritoProductos = document.getElementById('carrito-productos');
const carritoTotal = document.getElementById('carrito-total');
let productosAgregados = [];

// Evento click en el icono del carrito
carritoIcono.addEventListener('click', toggleCarritoMenu);

// Esta función se utiliza para mostrar u ocultar el menú lateral del carrito cuando se hace clic en el icono del carrito.
function toggleCarritoMenu() {
  mostrarTotal();
  carritoMenu.classList.toggle('active');
}

// aumentarContador: Esta función incrementa el contador de un producto en el carrito y luego actualiza el contenido del carrito.
function aumentarContador(producto) {
  producto.contador++;
  actualizarCarrito();
  mostrarTotal(); 
}

// disminuirContador: Esta función disminuye el contador de un producto en el carrito (si es mayor que 1) y luego actualiza el contenido del carrito.
function disminuirContador(producto) {
  if (producto.contador > 1) {
    producto.contador--;
    actualizarCarrito();
    mostrarTotal(); 
  }
}
// eliminarProducto: Esta función elimina un producto del carrito y luego actualiza el contenido del carrito.
function eliminarProducto(producto) {
  const index = productosAgregados.indexOf(producto);
  if (index !== -1) {
    productosAgregados.splice(index, 1);
    actualizarCarrito();
    mostrarTotal()
  }
}

// mostrarTotal: Esta función calcula el total de la compra sumando el precio de todos los productos en el carrito y luego muestra el total en el elemento correspondiente.
function mostrarTotal() {
  // Calcular el total
  const total = productosAgregados.reduce((acc, producto) => {
    return acc + producto.precio * producto.contador;
  }, 0);

  // Mostrar el total en el elemento
  carritoTotal.textContent = `Total: $${total}`;
}

// addToCart: Esta función agrega un producto al carrito. Si el producto ya existe en el carrito, -
//incrementa su contador; de lo contrario, crea un nuevo objeto de producto y lo agrega al array productosAgregados.
function addToCart(nombre, descripcion, precio, imagen) {
  const productoExistente = productosAgregados.find(p => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.contador++;
  } else {
    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio, //`$${precio}`
      imagen: imagen,
      contador: 1
    };
    productosAgregados.push(producto);
  }

  actualizarCarrito();
  mostrarTotal();
  carritoMenu.classList.add('active');
}

/**
 * actualizarCarrito: Esta función actualiza el contenido del carrito en el menú lateral. 
 * Crea elementos HTML para cada producto en el array productosAgregados y los agrega al elemento carritoProductos.
  Además, asigna eventos a los botones para aumentar, disminuir y eliminar productos.
 */
function actualizarCarrito() {

  // Limpiar la lista de productos
  carritoProductos.innerHTML = '';

  // Recorrer los productos agregados y crear elementos HTML
  productosAgregados.forEach(producto => {
    const item = document.createElement('li');
    const imagen = document.createElement('img');
    const precio = document.createElement('span');
    const descripcion = document.createElement('span');
    const contador = document.createElement('div');
    const botonMas = document.createElement('button');
    const botonMenos = document.createElement('button');
    const botonEliminar = document.createElement('button');

    imagen.src = producto.imagen;
    precio.textContent = '$'+ producto.precio;
    descripcion.textContent = producto.descripcion;

    botonMas.textContent = '+';
    botonMas.addEventListener('click', () => aumentarContador(producto));
    botonMenos.textContent = '-';
    botonMenos.addEventListener('click', () => disminuirContador(producto));
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarProducto(producto));

    const cantidadProducto = document.createElement('span');
    cantidadProducto.id = `contador-${producto.nombre}`;
    cantidadProducto.textContent = producto.contador;
    
   //Agrega los elementos creados al elemento carritoProductos mediante el método appendChild().
    contador.appendChild(botonMas);
    contador.appendChild(cantidadProducto);
    contador.appendChild(botonMenos);

    item.appendChild(imagen);
    item.appendChild(precio);
    item.appendChild(descripcion);
    item.appendChild(contador);
    item.appendChild(botonEliminar);

    carritoProductos.appendChild(item);
  });
}
