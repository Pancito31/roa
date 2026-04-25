let imagenes = document.querySelectorAll(".slider img");
let indice = 0;

setInterval(function () {
    imagenes[indice].classList.remove("activo");
    indice = (indice + 1) % imagenes.length;
    imagenes[indice].classList.add("activo");
}, 3000);