import quotes from './quotes.js'

//boutton masquant toutes les cases



// Fonction pour gérer les flocons de neige
const initializeSnowflakes = () => {
    const snowflakes = document.querySelectorAll(".js-snow");

    const getRandomValue = (min, max) => Math.random() * (max - min) + min;

    const animateSnowflake = (snowflake) => {
        snowflake.style.left = `${getRandomValue(0, 100)}%`;
        snowflake.style.animationDelay = `${getRandomValue(0, 10)}s, ${getRandomValue(0, 3)}s`;
    };

    const animateAllSnowflakes = () => {
        snowflakes.forEach((snowflake) => {
        animateSnowflake(snowflake);
        });
    };

    animateAllSnowflakes();
    // Réinitialiser les animations lorsque la fenêtre est redimensionnée
    window.addEventListener("resize", animateAllSnowflakes);
};

initializeSnowflakes()


/*PROGRAMME
- cliquez sur lune case de mon calendrier
- il dois avoir un numéro inférieur à la date du jour
- si elle ne l'a pas => il ne se passe rien
-si c'est bbon la suite se passe
    => on affiche la musique
    => affiche l'image de fond
    => affiche une popup avec une citation
    => en cliquant sur la popup on arrete la musique
- sauvegarder l'historique des cases cochées dans le navigateur
*/

const showPreviouslyOpenedBoxes = () =>{
    //recupére le nombre de boxes déjà ouvertes
    const openedBoxes = localStorage.getItem("openedBoxes")
    if(openedBoxes !== null){
        //ouvrir visuellement ces boxes
        const listOfBoxes = openedBoxes.split(",")
        for (let i = 0; i < listOfBoxes.length; i++){
            const boxNumber = listOfBoxes[i]
            const box = document.querySelector(`[data-number="${boxNumber}"]`)
            if (box !== null) {
            showImage(box)
            }
        }
    }
}




const boxes = document.querySelectorAll(".js-box");
const today = new Date(Date.now()) //new Date crée mon objet
const dateNumber = today.getDate()


boxes.forEach(box => {
    const boxNumber = parseInt(box.textContent)
    box.addEventListener("click", () => {
        if (boxNumber <= dateNumber){
            playSong()
            showImage(box)
            openModal(boxNumber)
           saveHistory(boxNumber)
        }
    } )
});


const url ="assets/audio/opening-song.mp3"
const song = new Audio(url)
//fonction pour le son
const playSong = () => {
    song.pause()
    song.currentTime = 0
    song.play()

}

// fonction pour afficher l'image
// dans sass on nomme la class hide
const showImage  = (box) => {
    box.classList.add('hide') // on crée une class

}

const modal = document.querySelector(".js_modal")
//afficher la citation en fonction du chiffre
const quote = document.querySelector(".js_quote")
const author = document.querySelector(".js_author")
const openModal = (index) => {
    quote.textContent = quotes[index].quote
    author.textContent = quotes[index].author
    modal.showModal() //le js fait apparaitre automatiquement la modal et pour la fermeture c'est form dans html
}

modal.addEventListener('close', () => {
    song.pause();
})

const saveHistory = (boxNumber) => {
    let openedBoxes = []
    let localValue = localStorage.getItem("openedBoxes")
    if (localValue !== null){
        openedBoxes = localValue.split(',')
    }
    openedBoxes.push(boxNumber)
    localStorage.setItem("openedBoxes", openedBoxes)
}

showPreviouslyOpenedBoxes()


// boutton pour retournéer les cases ouvertes
const hideAllBoxesButton = document.querySelector('#hide-all-boxes');


hideAllBoxesButton.addEventListener('click', () => {
    hideAllOpenedBoxes();
});

const hideAllOpenedBoxes = () => {
    const openedBoxes = localStorage.getItem('openedBoxes');
    if (openedBoxes !== null) {
        const listOfBoxes = openedBoxes.split(',');
        listOfBoxes.forEach(boxNumber => {
        const box = document.querySelector(`[data-number="${boxNumber}"]`);
        if (box !== null) {
            hideImage(box);
        }
        });
    }
};

const hideImage = (box) => {
    box.classList.remove('hide');
};
