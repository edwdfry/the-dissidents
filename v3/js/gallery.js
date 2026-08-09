/* ==========================================================
   LES DISSIDENTS — GALERIE

   Fonctionnalités :
   - ouverture des photos en grand
   - navigation précédente / suivante
   - fermeture
   - touche Échap
   - flèches gauche / droite
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ==================================================
           ÉLÉMENTS
        =================================================== */

        const items =
            document.querySelectorAll(
                ".gallery-item"
            );

        const lightbox =
            document.getElementById(
                "galleryLightbox"
            );

        const lightboxImage =
            document.getElementById(
                "galleryLightboxImage"
            );

        const lightboxNumber =
            document.getElementById(
                "galleryLightboxNumber"
            );

        const closeButton =
            document.getElementById(
                "galleryClose"
            );

        const previousButton =
            document.getElementById(
                "galleryPrevious"
            );

        const nextButton =
            document.getElementById(
                "galleryNext"
            );


        /* ==================================================
           VARIABLES
        =================================================== */

        let currentIndex = 0;


        /* ==================================================
           OUVRIR UNE PHOTO
        =================================================== */

        function openGallery(index) {

            if (!items[index]) {

                return;

            }


            currentIndex = index;


            const image =
                items[index].querySelector("img");


            if (!image) {

                return;

            }


            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;


            lightboxNumber.textContent =
                String(index + 1).padStart(2, "0");


            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }


        /* ==================================================
           FERMER
        =================================================== */

        function closeGallery() {

            lightbox.classList.remove(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        /* ==================================================
           PHOTO SUIVANTE
        =================================================== */

        function nextImage() {

            currentIndex++;

            if (
                currentIndex >= items.length
            ) {

                currentIndex = 0;

            }

            openGallery(currentIndex);

        }


        /* ==================================================
           PHOTO PRÉCÉDENTE
        =================================================== */

        function previousImage() {

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex =
                    items.length - 1;

            }

            openGallery(currentIndex);

        }


        /* ==================================================
           CLIC SUR LES PHOTOS
        =================================================== */

        items.forEach(
            function(item, index) {

                item.addEventListener(
                    "click",
                    function() {

                        openGallery(index);

                    }
                );

            }
        );


        /* ==================================================
           BOUTONS
        =================================================== */

        closeButton.addEventListener(
            "click",
            closeGallery
        );


        nextButton.addEventListener(
            "click",
            nextImage
        );


        previousButton.addEventListener(
            "click",
            previousImage
        );


        /* ==================================================
           CLIC SUR LE FOND
        =================================================== */

        lightbox.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === lightbox
                ) {

                    closeGallery();

                }

            }
        );


        /* ==================================================
           CLAVIER
        =================================================== */

        document.addEventListener(
            "keydown",
            function(event) {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (event.key === "Escape") {

                    closeGallery();

                }


                if (event.key === "ArrowRight") {

                    nextImage();

                }


                if (event.key === "ArrowLeft") {

                    previousImage();

                }

            }
        );

    }
);