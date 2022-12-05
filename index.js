
const divCards = document.querySelector(".cards");
const lista = document.querySelector("#lista");
const botonSeleccionar = document.querySelector("#seleccionar");

const mostrarCategorias = async () => {
  const categoriasFetch = await fetch("categorias.json");
  const categoriasJson = await categoriasFetch.json();
  console.log(categoriasJson);
  categoriasJson.forEach((cat) => {
    const option = document.createElement("option");
    option.innerText = `${cat}`;
    lista.append(option);
  });
};

const buscarTodosProductos = async () => {
  const productosFetch = await fetch("productos.json");
  const productosJson = await productosFetch.json();
  productosJson.forEach((prod) => {
    const {  id, nombre, precio,categoria } = prod;
    divCards.innerHTML += `
      <div id="${id}" class="card cardProducto">
      <div class="card-body bg-info">
      <h5 class="card-title">${nombre}</h5>
    <p class=" card-text">$${precio}</p>
    <button id="${id}" class=" bg-dark btn btn-primary">AGREGAR AL CARRITO</button>
    </div>
    </div>
    `;
  });
  
  
  
  
  productosJson.forEach((prod) => {
    const boton = document.getElementById(prod.id)
    boton.addEventListener("click", (e) => {
      console.log(e.target.id)
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const botonesAgregar = document.querySelectorAll(".btn-primary");

botonesAgregar.forEach((boton) => {
  boton.onclick = async () => {
    const productosFetch = await fetch("productos.json");
    const productosJson = await productosFetch.json();
    const producto = productosJson.find(
      (prod) => prod.id === parseInt(boton.id)
    );

    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    };
    const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id);
    if (indexCarrito === -1) {
      carrito.push(productoCarrito);
    } else {
      carrito[indexCarrito].cantidad += 0;
    }
    console.log(carrito);
  };
});
//  Finalizar la compra

const botonFinalizar = document.querySelector("#finalizar");
botonFinalizar.onclick = () => {
   const totalCompra = carrito.map((prod) => prod.precio * prod.cantidad).reduce((elem1, elem2) => elem1 + elem2,);
  localStorage.clear
  document.getElementById('lbl').innerHTML =  ` Escogiste ${prod.cantidad} productos y el total de la compra es de ${totalCompra} ` ;
  localStorage.clear
  
};

const saveLocal = () => {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
};
    })
  })
};
const buscarProductosPorCategoria = async () => {
  divCards.innerHTML = "";
const categoriaElegida = lista.value;
const productosFetch = await fetch("productos.json");
const productosJson = await productosFetch.json();
const productosFiltrados = productosJson.filter(prod=>prod.categoria===categoriaElegida)
productosFiltrados.forEach((prod) => {
  const { categoria, id, nombre, precio,} = prod;
  divCards.innerHTML += `
  <div id="${id}" class="card cardProducto">
  <div class="card-body bg-info">
  <h5 class="card-title">${nombre}</h5>
<p class=" card-text">$${precio}</p>
<button id="${id}" class=" bg-dark btn btn-primary">AGREGAR AL CARRITO</button>
</div>
</div>
  `;
});
};
buscarTodosProductos();
mostrarCategorias();

botonSeleccionar.onclick = buscarProductosPorCategoria;
