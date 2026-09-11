```javascript
/* =========================================================
   NAVIGATION
   ========================================================= */

const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================================
   LIGHTBOX
   ========================================================= */

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

const galleryLinks = document.querySelectorAll("[data-lightbox]");


/* Ouvrir une photo */

galleryLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const image = link.querySelector("img");

        lightboxImage.src = link.href;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });

});


/* Fermer */

function closeLightbox() {

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    lightboxImage.src = "";

}


/* Bouton X */

lightboxClose.addEventListener("click", closeLightbox);


/* Cliquer sur le fond */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* Touche Échap */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLightbox();
    }

});
```
