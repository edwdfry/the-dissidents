/* ==========================================================
   LES DISSIDENTS — SECTION MUSIQUE

   Gestion :
   - mot de passe SHA-256
   - affichage de la playlist
   - verrouillage de la playlist
   - validation avec la touche Entrée
========================================================== */


// ========================================================
// URL DU WORKER
// ========================================================

const AUDIO_WORKER =
    "https://the-dissidents-audio.ed-ferry.workers.dev";



// ========================================================
// CONNEXION
// ========================================================

async function checkPassword() {


    const input =
        document.getElementById(
            "passwordInput"
        );


    const error =
        document.getElementById(
            "passwordError"
        );


    const password =
        input.value;


    if (!password) {

        error.textContent =
            "Entrez le mot de passe.";

        return;

    }


    // Petit indicateur

    error.textContent =
        "Connexion...";


    try {


        // =================================================
        // DEMANDE DU TOKEN AU WORKER
        // =================================================

        const response =
            await fetch(

                `${AUDIO_WORKER}/login`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            password:
                                password

                        })

                }

            );


        // =================================================
        // MOT DE PASSE INCORRECT
        // =================================================

        if (!response.ok) {

            error.textContent =
                "Mot de passe incorrect.";

            input.value = "";

            input.focus();

            return;

        }


        // =================================================
        // RÉCUPÉRATION DU TOKEN
        // =================================================

        const data =
            await response.json();


        const token =
            data.token;


        if (!token) {

            throw new Error(
                "Token absent"
            );

        }


        // =================================================
        // CACHE LA FENÊTRE
        // =================================================

        document
            .getElementById(
                "passwordOverlay"
            )
            .style.display =
                "none";


        // =================================================
        // CONFIGURATION DES 7 LECTEURS
        // =================================================

        document
            .querySelectorAll(
                "audio[data-file]"
            )
            .forEach(
                audio => {


                    const filename =
                        audio.dataset.file;


                    // URL du vrai flux audio

                    const streamUrl =

                        `${AUDIO_WORKER}/stream/` +

                        encodeURIComponent(
                            filename
                        ) +

                        `?token=` +

                        encodeURIComponent(
                            token
                        );


                    audio.src =
                        streamUrl;


                }
            );


} catch (error) {


        console.error(error);


        document
            .getElementById(
                "passwordError"
            )
            .textContent =
                "Impossible de contacter le serveur.";


    }

}



/* ==========================================================
   VERROUILLER LA PLAYLIST
========================================================== */

function lockMusic() {

    const passwordOverlay =
        document.getElementById("passwordOverlay");

    const musicPlayer =
        document.getElementById("musicPlayer");


    /* Arrêter tous les lecteurs audio */

    const audioPlayers =
        document.querySelectorAll(
            "#musicPlayer audio"
        );


    audioPlayers.forEach(function(audio) {

        audio.pause();

        audio.currentTime = 0;

    });


    /* Masquer la playlist */

    if (musicPlayer) {

        musicPlayer.hidden = true;

        musicPlayer.style.display = "none";

    }


    /* Réafficher le formulaire */

    if (passwordOverlay) {

        passwordOverlay.style.display = "";

    }

}


/* ==========================================================
   VALIDATION AVEC LA TOUCHE ENTRÉE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const passwordInput =
            document.getElementById("passwordInput");


        if (passwordInput) {

            passwordInput.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        checkPassword();

                    }

                }
            );

        }

    }
);