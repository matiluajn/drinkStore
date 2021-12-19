let producto = [{
        id: 1,
        nombre: "Fernet",
        precio: 950,
        imagen: "./img/fernet.jpg",
    },
    {
        id: 2,
        nombre: "Heineken",
        precio: 750,
        imagen: "./img/heineken.jpeg",
    },
    {
        id: 3,
        nombre: "Quilmes",
        precio: 900,
        imagen: "./img/quilmes.jpg",
    },
    {
        id: 4,
        nombre: "Sky",
        precio: 450,
        imagen: "./img/sky.jpg",
    },
    {
        id: 5,
        nombre: "Six Pack",
        precio: 500,
        imagen: "./img/sixpack.jpg",
    },
    {
        id: 6,
        nombre: "Whisky",
        precio: 4500,
        imagen: "./img/whisky.jpg",
    },
    {
        id: 7,
        nombre: "Coca",
        precio: 500,
        imagen: "./img/coca.jpg",
    },
    {
        id: 8,
        nombre: "Sprite",
        precio: 550,
        imagen: "./img/sprite.jpg",
    },
];
const contenedor = document.getElementById("containerMain")

producto.forEach((producto, indice) => {
    card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3", "container");
    card.innerHTML = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a href="#cart" class="btn btn-primary" onClick="comprar(${indice})">Comprar</a>
    </div>
     `;

    contenedor.appendChild(card);
});

let cart = [];

function comprar(indiceProducto) {
    //contenedor.parentNode.removeChild(contenedor);

    const filtro = cart.findIndex((elemento) => {
        return elemento.id === producto[indiceProducto].id;
    });
    if (filtro === -1) {
        const productoCart = producto[indiceProducto];
        productoCart.cantidad = 1;
        cart.push(productoCart);
        actualizarCart()

    } else {
        cart[filtro].cantidad += 1;
        actualizarCart()
    }
    console.log(cart)

};

const openCart = document.getElementById("cart");

function actualizarCart() {
    let total = 0;
    openCart.className = "cart";
    openCart.innerHTML = "";

    if (cart.length > 0) {
        cart.forEach((producto, indice) => {
            total = total + producto.precio * producto.cantidad;
            const createCart = document.createElement("div");
            createCart.className = "producto-carrito";
            createCart.innerHTML = `
            <img class="car-img" src="${producto.imagen}"/>
            <div class="product-details">
              ${producto.nombre}
            </div>
            <div class="product-details" > Cantidad: ${producto.cantidad}</div>
            <div class="product-details"> Precio: $ ${producto.precio}</div>
            <div class="product-details"> Subtotal: $ ${
              producto.precio * producto.cantidad
            }</div>
            <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
            `;
            openCart.appendChild(createCart);
        });
        // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-carrito";
        totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
        <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
        openCart.appendChild(totalContainer);
    } else {
        openCart.classList.remove("cart")
    }


};
const removeProduct = (indice) => {
    cart.splice(indice, 1);
    actualizarCart();
};

const finalizarCompra = () => {
    const total = document.getElementsByClassName("total")[0].innerHTML;
    openCart.innerHTML = "";
    const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> Genial estas a punto de finalizar la compra, EL   ${total} </p></div>
  <div class="datos-cliente">
  <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
  <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> FORMULARIO </button>
  </div>`;
    openCart.innerHTML = compraFinalizada;
};

const dibujarFormu = () => {
    openCart.innerHTML = "";
    const formulario = `
    <h2> DATOS PARA EL ENVÍO </h2>
    <div class="contact__secction-container">
     <div class="row">
       <div class="contact__secction__item">
         <label>Nombre</label>
         <input type="text" id="nombre" placeholder="Nombre"  />
       </div>
       <div class="contact__secction__item">
         <label>E-mail</label>
         <input type="text" id="mail" placeholder="E-mail" />
       </div>
       <div class="contact__secction__item">
         <label>Telefono</label>
         <input type="text" id="telefono" placeholder="Telefono"  />
       </div>
       <div class="contact__secction__item">
         <label>Domicilio</label>
         <input type="text" id="domicilio" placeholder="Domicilio" />
       </div>
       <div class="contact-button">
         <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
       </div>
     </div>
   </div>`;
    openCart.innerHTML = formulario;
};

const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("nombre").value;
    const domicilioCliente = document.getElementById("domicilio").value;
    debugger;
    openCart.innerHTML = "";
    let mensaje = `<div class="mensaje-final"> Muchas Gracias ${nombreCliente} por tu compra! en el transcurso de 1hs recibiras tu pedido en ${domicilioCliente} </div>`;
    openCart.innerHTML = mensaje;
};