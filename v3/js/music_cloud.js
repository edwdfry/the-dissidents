
/* ==========================================================
   LES DISSIDENTS — SECTION MUSIQUE

   Gestion :
   - connexion via Cloudflare Worker
   - token d'accès audio
   - affichage de la playlist
   - verrouillage de la playlist
   - validation avec la touche Entrée
========================================================== */


/* ==========================================================
   CONFIGURATION CLOUDFLARE
========================================================== */

const AUDIO_WORKER =
    "https://the-dissidents-v3.ed-ferry.workers.dev";


/* ==========================================================
   TOKEN DE SESSION
========================================================== */

let audioToken = null;


/* ==========================================================
   OUVRIR LA SECTION MUSIQUE
========================================================== */

async function checkPassword() {

    const passwordInput =
        document.getElementById("passwordInput");

    const passwordError =
        document.getElementById("passwordError");

    const passwordOverlay =
        document.getElementById("passwordOverlay");

    const musicPlayer =
        document.getElementById("musicPlayer");


    /* ======================================================
       VÉRIFICATION DES ÉLÉMENTS HTML
    ====================================================== */

    if (
        !passwordInput ||
        !passwordOverlay ||
        !musicPlayer
    ) {

        console.error(
            "Un élément de la section musique est introuvable."
        );

        return;

    }


    /* ======================================================
       MOT DE PASSE SAISI
    ====================================================== */

    const password =
        passwordInput.value;


    if (!password) {

        if (passwordError) {

            passwordError.textContent =
                "Entrez le mot de passe.";

        }

        return;

    }


    /* Message temporaire */

    if (passwordError) {

        passwordError.textContent =
            "Connexion...";

    }


    try {


        /* ==================================================
           ENVOI DU MOT DE PASSE AU WORKER
        ================================================== */

        const response =
            await fetch(
                `${AUDIO_WORKER}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        password: password
                    })
                }
            );


        /* ==================================================
           MOT DE PASSE INCORRECT
        ================================================== */

        if (!response.ok) {

            if (passwordError) {

                passwordError.textContent =
                    "Mot de passe incorrect.";

            }

            passwordInput.value = "";

            passwordInput.focus();

            return;

        }


        /* ==================================================
           RÉCUPÉRATION DU TOKEN
        ================================================== */

        const data =
            await response.json();


        if (!data.token) {

            throw new Error(
                "Le Worker n'a pas retourné de token."
            );

        }


        audioToken =
            data.token;


        /* ==================================================
           CONFIGURATION DES LECTEURS AUDIO
        ================================================== */

        const audioPlayers =
            document.querySelectorAll(
                "#musicPlayer audio[data-file]"
            );


        audioPlayers.forEach(
            function(audio) {

                const filename =
                    audio.dataset.file;


                if (!filename) {

                    console.error(
                        "Fichier audio absent dans data-file.",
                        audio
                    );

                    return;

                }


                /* ==========================================
                   URL DU STREAM CLOUDFLARE
                ========================================== */

                const streamUrl =

                    `${AUDIO_WORKER}/stream/` +

                    encodeURIComponent(
                        filename
                    ) +

                    `?token=` +

                    encodeURIComponent(
                        audioToken
                    );


                /* ==========================================
                   SOURCE AUDIO
                ========================================== */

                audio.src =
                    streamUrl;


                /* ==========================================
                   CORS
                ========================================== */

                audio.crossOrigin =
                    "anonymous";


                /* ==========================================
                   Demande au navigateur de ne pas afficher
                   le bouton Télécharger
                ========================================== */

                audio.setAttribute(
                    "controlsList",
                    "nodownload"
                );


                /* ==========================================
                   Chargement
                ========================================== */

                audio.load();

            }
        );


        /* ==================================================
           MASQUER LE FORMULAIRE
        ================================================== */

        passwordOverlay.style.display =
            "none";


        /* ==================================================
           AFFICHER LA PLAYLIST
        ================================================== */

        musicPlayer.hidden =
            false;

        musicPlayer.style.display =
            "block";


        /* ==================================================
           NETTOYAGE
        ================================================== */

        passwordInput.value = "";

        if (passwordError) {

            passwordError.textContent =
                "";

        }


        /* ==================================================
           DESCENDRE VERS LA PLAYLIST
        ================================================== */

        setTimeout(
            function() {

                musicPlayer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            150
        );


    } catch (error) {

        console.error(
            "Erreur connexion Worker :",
            error
        );


        if (passwordError) {

            passwordError.textContent =
                "Impossible de contacter le serveur.";

        }

    }

}


/* ==========================================================
   VERROUILLER LA PLAYLIST
========================================================== */

function lockMusic() {

    const passwordOverlay =
        document.getElementById(
            "passwordOverlay"
        );

    const musicPlayer =
        document.getElementById(
            "musicPlayer"
        );


    /* ======================================================
       ARRÊTER TOUS LES LECTEURS
    ====================================================== */

    const audioPlayers =
        document.querySelectorAll(
            "#musicPlayer audio"
        );


    audioPlayers.forEach(
        function(audio) {

            audio.pause();

            audio.currentTime = 0;


            /*
             * On retire également la source.
             *
             * Cela évite de laisser l'URL /stream
             * directement présente dans le DOM après
             * verrouillage.
             */

            audio.removeAttribute(
                "src"
            );


            audio.load();

        }
    );


    /* ======================================================
       SUPPRIMER LE TOKEN DE LA MÉMOIRE JS
    ====================================================== */

    audioToken =
        null;


    /* ======================================================
       MASQUER LA PLAYLIST
    ====================================================== */

    if (musicPlayer) {

        musicPlayer.hidden =
            true;

        musicPlayer.style.display =
            "none";

    }


    /* ======================================================
       RÉAFFICHER LE FORMULAIRE
    ====================================================== */

    if (passwordOverlay) {

        passwordOverlay.style.display =
            "";

    }

}


/* ==========================================================
   VALIDATION AVEC LA TOUCHE ENTRÉE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const passwordInput =
            document.getElementById(
                "passwordInput"
            );


        if (passwordInput) {

            passwordInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        checkPassword();

                    }

                }
            );

        }

    }
);
