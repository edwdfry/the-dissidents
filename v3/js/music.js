/* ==========================================================
   LES DISSIDENTS — SECTION MUSIQUE

   Gestion :
   - mot de passe SHA-256
   - affichage de la playlist
   - verrouillage de la playlist
   - validation avec la touche Entrée
========================================================== */


/* ==========================================================
   CALCUL SHA-256
========================================================== */

async function hashPassword(password) {

    const data = new TextEncoder().encode(password);

    const hashBuffer =
        await crypto.subtle.digest("SHA-256", data);

    const hashArray =
        Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(
            byte => byte.toString(16).padStart(2, "0")
        )
        .join("");

}


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


    /* Vérification */

    if (!passwordInput || !passwordOverlay || !musicPlayer) {

        console.error(
            "Un élément de la section musique est introuvable."
        );

        return;

    }


    /* Mot de passe saisi */

    const motDePasseEntre =
        passwordInput.value;


    /* Calcul SHA-256 */

    const hash =
        await hashPassword(motDePasseEntre);


    /* ======================================================
       HASH DU MOT DE PASSE CORRECT
    ======================================================= */

    const hashCorrect =
        "cbd2f85803188ffe860ee3d45c6106ba775a5182e347bdd7a47469b4cb29e52b";


    /* ======================================================
       MOT DE PASSE CORRECT
    ======================================================= */

    if (hash === hashCorrect) {

        /* Masquer le formulaire */

        passwordOverlay.style.display = "none";


        /* Afficher la playlist */

        musicPlayer.hidden = false;

        musicPlayer.style.display = "block";


        /* Nettoyage */

        passwordInput.value = "";

        if (passwordError) {

            passwordError.textContent = "";

        }


        /* Aller doucement vers la playlist */

        setTimeout(function() {

            musicPlayer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 150);

    }


    /* ======================================================
       MOT DE PASSE INCORRECT
    ======================================================= */

    else {

        if (passwordError) {

            passwordError.textContent =
                "Mot de passe incorrect.";

        }

        passwordInput.value = "";

        passwordInput.focus();

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