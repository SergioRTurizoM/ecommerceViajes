let completocontainer = document.querySelector("#tarjetastourscontent");
let listacomprada = document.querySelector('.card-items');
let pricetotal = document.querySelector('.price-total')
let pricetotal2 = document.querySelector('.count-service');


let compra = [];
let totalizado = 0;
let counterservice = 0;

listen();
function listen() {
  completocontainer.addEventListener("click", agregarServicio);
  listacomprada.addEventListener('click', deleteService);
}

function agregarServicio(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregarCarrito")) {
    const seleccionaServicio = e.target.parentElement;
    leertarjeta(seleccionaServicio);
  }
}

function deleteService(e) {
    if (e.target.classList.contains("delete-service")) {
        const deleteID = e.target.getAttribute('data-id');   
        compra.forEach(value => {
            if(value.id == deleteID){
                let pricereduce = value.price * value.cantidad;
                totalizado = +totalizado-+pricereduce;
            }
        })
        compra = compra.filter(service => service.id !== deleteID)

        counterservice--;
      }
      cargaModal();
    
}

function leertarjeta(servicio) {
  const informacionDelServicio = {
    image: servicio.parentElement.querySelector("div img").src,
    title: servicio.querySelector(".card-title").textContent,
    price: servicio.querySelector(".precio").textContent,
    id: servicio.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  totalizado = +totalizado + +informacionDelServicio.price;


  const existeID = compra.some(service => service.id === informacionDelServicio.id);
  if(existeID){
    const serviceCount = compra.map(service => {
        if(service.id === informacionDelServicio.id) {
            service.cantidad++;
            return service;
        } else {
            return service
        }
    });
    compra = [...serviceCount];
  } else {

      compra = [...compra, informacionDelServicio];
      counterservice++;
  }
  cargaModal();
  console.log(informacionDelServicio);
}

function cargaModal() {
    clearHtml();

  compra.forEach((servicio) => {
    const { image, title, price, id, cantidad } = servicio;

    const fila = document.createElement("div");
    fila.classList.add("item");
    fila.innerHTML = `
        <img src="${image}" alt="">
                    <div class="item-content">
                        <h5>${title}</h5>
                        <h5 class="cart-price">${price}</h5>
                        <h6>Amount: ${cantidad}</h6>
                    </div>
                    <span class="delete-service" data-id="${id}">X</span>
    
        `;

    listacomprada.appendChild(fila);

    pricetotal.innerHTML = totalizado;

    pricetotal2.innerHTML = counterservice;
  });
}

function clearHtml() {
    listacomprada.innerHTML = '';
}
