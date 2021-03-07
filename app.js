const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verrouillage = true; //fige la partie quand on a gagné
let joueurEnCours = "X"; // le joueur X va démarrer

info.innerHTML = `Au tour de ${joueurEnCours}`;


const casDeVictoires = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//tableau des cases cochées (en attente des valeurs "X" ou "O")
let partieEnCours = ["", "", "", "", "", "", "", "", ""];

// FONCTIONS

//1. pour chacune des cases sur lesquelles on va cliquer
cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
})

//2. la fonction clicSurCase va prendre en paramètre l'objet d'evenement(e)
function clicSurCase(e) {
    const caseClique = e.target; //et on va mettre dans une constante la case sur laquelle on vient de cliquer
    const caseIndex = caseClique.getAttribute('data-index'); //on va aussi prendre l'index de la case sur laquelle on va cliquer

    //4a. s'il y a déjà quelque-chose dans la case [caseIndex] sur laquelle on vient de cliquer dans le tableau partieEnCours OU 4b. si j'ai l'inverse de verrouillage (false), je return
    if (partieEnCours[caseIndex] !== "" || !verrouillage) {
        return;
    }

    //3. on va commencer à remplir les cases du tableau partieEnCours sur lesquelles on est en train de cliquer
    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours);

    //5. avant d'appeler la fonction qui valide la victoire, on va créer celle qui fait changer de joueur MAIS on ne va appeler cette méthode qu'après avoir chercher et valider si la partie est terminée ou pas
    //changementDeJoueur();

    //7. on va donc appeler la fonction qui valide les victoires...
    validationVictoires();

}

//8a. ...et la créer
function validationVictoires() {

    //8b.on va déclarer une variable qui détermine la fin de la partie et qui démarre à false (car ce n'est pas encore la fin de la partie)
    let findePartie = false;

    //8c. on va itérer à travers les 8 combinaisons de victoires possibles
    for (i = 0; i < casDeVictoires.length; i++) {

        //8d. puis on va vérifier si on est dans un cas de victoire à chaque itération (par exemple trois "X" dans la première rangée) 
        const verifVictoire = casDeVictoires[i];
        // [0, 1, 2],
        let a = partieEnCours[verifVictoire[0]];
        console.log(a);
        // "X"
        let b = partieEnCours[verifVictoire[1]];
        console.log(b);
        // "X"
        let c = partieEnCours[verifVictoire[2]];
        // "X"

        //8e. s'il reste des cases/chaînes de caractères vides, c'est que le jeu n'est pas terminé
        if (a === '' || b === '' || c === '') {
            continue;
        }
        //8f. cas de victoire et fin du jeu si c'est 3fois égal à "X" ou 3fois égal à "O" 
        if (a === b && b === c) {
            findePartie = true;
            break; // sort de la condition 
        }
    }

    //9. message de fin de partie et verrouillage de l'écran
    if (findePartie) {
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`
        verrouillage = false;
        return; // sort de la fonction
    }

    //10. cas du match nul
    //s'il n'y pas de chaîne de caractères vide dans partieEnCours
    let matchNul = !partieEnCours.includes('');
    if (matchNul) {
        info.innerText = 'Match nul !';
        verrouillage = false;
        return;
    }

    changementDeJoueur();
}


//6. Est-ce que le joueur en cours est strictement égal au "X", ou à "O"? Si le joueur en cours est "X", alors il devient "O", sinon il devient "X"
function changementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}

