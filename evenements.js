/* ==========================================================
   ÉVÉNEMENTS — THE DISSIDENTS

   Ce fichier gère uniquement l'ouverture et la fermeture
   du panneau "Plus d'infos" qui apparaît sur les images.
========================================================== */


/* ==========================================================
   RÉCUPÉRATION DES CARTES
========================================================== */

const eventCards =
    document.querySelectorAll(".event-card");


/* ==========================================================
   POUR CHAQUE CARTE
========================================================== */

eventCards.forEach(function(card) {


    /* ------------------------------------------------------
       BOUTON "PLUS D'INFOS"
    ------------------------------------------------------- */

    const moreButton =
        card.querySelector(".event-more");


    /* ------------------------------------------------------
       BOUTON "FERMER"
    ------------------------------------------------------- */

    const closeButton =
        card.querySelector(".overlay-close");


    /* ------------------------------------------------------
       OUVERTURE DU PANNEAU
    ------------------------------------------------------- */

    moreButton.addEventListener("click", function() {

        /*
           On ferme d'abord les éventuels autres panneaux.
        */

        eventCards.forEach(function(otherCard) {

            if (otherCard !== card) {

                otherCard.classList.remove(
                    "show-overlay"
                );

            }

        });


        /*
           On ouvre celui de la carte sélectionnée.
        */

        card.classList.add(
            "show-overlay"
        );

    });


    /* ------------------------------------------------------
       FERMETURE DU PANNEAU
    ------------------------------------------------------- */

    closeButton.addEventListener("click", function() {

        card.classList.remove(
            "show-overlay"
        );

    });

});