/*
============================================================

Navigation transparente.

Au scroll,
le menu devient plus sombre.

============================================================
*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.style.background="rgba(9,9,9,.92)";
        navbar.style.backdropFilter="blur(8px)";

    }

    else{

        navbar.style.background="transparent";
        navbar.style.backdropFilter="none";

    }

});