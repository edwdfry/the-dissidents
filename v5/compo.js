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



// ========================================================
// TOUCHE ENTRÉE DANS LE MOT DE PASSE
// ========================================================

document
    .getElementById(
        "passwordInput"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                checkPassword();

            }

        }
    );