/* =========================================================
   THE DISSIDENTS — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MENU HAMBURGER
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

        });


        /* Fermer le menu lorsqu'on clique sur un lien */

        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            });

        });


        /* Fermer le menu avec la touche Échap */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mainNav.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            }

        });

    }



    /* =====================================================
       NAVIGATION — LIEN ACTIF
       ===================================================== */

    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });



    /* =====================================================
       LIGHTBOX
       ===================================================== */

    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");
    const galleryLinks = document.querySelectorAll("[data-lightbox]");


    /*
     * On initialise la lightbox uniquement si elle existe
     * sur la page.
     */

    if (
        lightbox &&
        lightboxImage &&
        lightboxClose
    ) {


        /* -------------------------------------------------
           OUVRIR UNE PHOTO
           ------------------------------------------------- */

        galleryLinks.forEach((link) => {

            link.addEventListener("click", (event) => {

                event.preventDefault();

                const image = link.querySelector("img");

                if (!image) {
                    return;
                }

                lightboxImage.src = link.href;
                lightboxImage.alt = image.alt || "";

                lightbox.classList.add("is-open");

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow = "hidden";

            });

        });


        /* -------------------------------------------------
           FERMER LA LIGHTBOX
           ------------------------------------------------- */

        const closeLightbox = () => {

            lightbox.classList.remove("is-open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";

            lightboxImage.src = "";

        };


        /* Bouton X */

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


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

    }

});