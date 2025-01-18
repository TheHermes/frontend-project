let lastKnownId = undefined;
let lastKnownNumber = undefined;
let wait = false;

let pairs = 0;
let moves = 0;
const cardN = '../assets/images/card.png';

let cardArr1 = [
    { value: `<div class="memoryCards"><img class=card id="1" src="../assets/images/card.png" data-turnable="true" data-numbers=1 data-img="../assets/images/ace.png" alt="bild på ess"></div>` },
    { value: `<div class="memoryCards"><img class=card id="2" src="../assets/images/card.png" data-turnable="true" data-numbers=1 data-img="../assets/images/ace.png" alt="bild på ess"></div>` },
    { value: `<div class="memoryCards"><img class=card id="3" src="../assets/images/card.png" data-turnable="true" data-numbers=2 data-img="../assets/images/king.png"alt="bild på kung"></div>` },
    { value: `<div class="memoryCards"><img class=card id="4" src="../assets/images/card.png" data-turnable="true" data-numbers=2 data-img="../assets/images/king.png" alt="bild på kung"></div>` },
    { value: `<div class="memoryCards"><img class=card id="5" src="../assets/images/card.png" data-turnable="true" data-numbers=3 data-img="../assets/images/queen.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="6" src="../assets/images/card.png" data-turnable="true" data-numbers=3 data-img="../assets/images/queen.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="7" src="../assets/images/card.png" data-turnable="true" data-numbers=4 data-img="../assets/images/joker.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="8" src="../assets/images/card.png" data-turnable="true" data-numbers=4 data-img="../assets/images/joker.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="9" src="../assets/images/card.png" data-turnable="true" data-numbers=5 data-img="../assets/images/2heart.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="10" src="../assets/images/card.png" data-turnable="true" data-numbers=5 data-img="../assets/images/2heart.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="11" src="../assets/images/card.png" data-turnable="true" data-numbers=6 data-img="../assets/images/6spade.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="12" src="../assets/images/card.png" data-turnable="true" data-numbers=6 data-img="../assets/images/6spade.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="13" src="../assets/images/card.png" data-turnable="true" data-numbers=7 data-img="../assets/images/7heart.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="14" src="../assets/images/card.png" data-turnable="true" data-numbers=7 data-img="../assets/images/7heart.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="15" src="../assets/images/card.png" data-turnable="true" data-numbers=8 data-img="../assets/images/jack.png" alt="bild på drottning"></div>` },
    { value: `<div class="memoryCards"><img class=card id="16" src="../assets/images/card.png" data-turnable="true" data-numbers=8 data-img="../assets/images/jack.png" alt="bild på drottning"></div>` }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let newP = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[newP];
        array[newP] = temp;
    }
}

shuffle(cardArr1);

for (item of cardArr1) {
    document.querySelector("#container1").innerHTML += item.value;
}

document.querySelectorAll(".card").forEach((elem) => {

    elem.addEventListener('click', (evt) => {
        let cardR = evt.target.getAttribute('data-img');
        // Första val, utför när man klickar på ett kort
        if (lastKnownId == undefined && !wait && lastKnownNumber == undefined) {
            evt.target.setAttribute('src', cardR);
            //evt.target.style.pointerEvents = 'none';

            lastKnownId = evt.target.id;
            lastKnownNumber = evt.target.dataset.numbers;

            moves++;
            console.log("moves: " + moves);
        }
        // Andra val, utför efter den första klicket 
        else if (lastKnownId != undefined && !wait && lastKnownNumber !== undefined && evt.target.id != lastKnownId) {
            evt.target.setAttribute('src', cardR);
            //evt.target.style.pointerEvents = 'none';
            moves++;
            console.log("moves: " + moves);

            // Utför detta om de två valen är par
            if (evt.target.dataset.numbers == lastKnownNumber) {
                let id = lastKnownId;

                evt.target.style.pointerEvents = 'none';
                document.getElementById(id).style.pointerEvents = 'none';

                pairs++;

                lastKnownId = undefined;
                lastKnownNumber = undefined;

                // Om du hittat alla par utför detta
                if (pairs == 8) {
                    showWin();
                }
            }

            // Utför om de valda korten inte är samma
            else {
                wait = true;

                setTimeout(() => {
                    //evt.target.style.pointerEvents = 'auto';
                    //document.getElementById(lastKnownId).style.pointerEvents = 'auto';
                    document.getElementById(lastKnownId).setAttribute('src', '../assets/images/card.png');
                    evt.target.setAttribute('src', '../assets/images/card.png');

                    lastKnownId = undefined;
                    lastKnownNumber = undefined;

                    wait = false;
                }, 1000)
            }
        }
    });
});

function showWin() {
    setTimeout(() => {
        document.querySelector("#winInfo").style.display = 'flex';
        document.querySelector("#win").innerText = "DU VANN!";
        document.querySelector("#container1").style.pointerEvents = 'none';
        document.querySelector("#clicks").innerHTML = "Det tog dig " + moves + " steg för att vinna!";
        document.querySelector("#reset").style.display = 'flex';
    }, 1000);
}

document.querySelector("#reset").addEventListener("click", () => {
    location.reload();
})