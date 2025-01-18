/* Exempel på JS-fil för specifik sida (ssp-sidan i det här fallet) */
let betMoney = undefined;
let money = localStorage.getItem('money');
money = Number(money);

document.querySelector('#money-Output').innerText = "Dina pengar: " + money + "€";

const buttonsSSP = [
    { name: 'Sten', win: 'Sax', lose: 'Papper', tie: 'Sten', button: '<button class="button" data-name="Sten" id="btn1">Sten</button>' },
    { name: 'Sax', win: 'Papper', lose: 'Sten', tie: 'Sax', button: '<button class="button" data-name="Sax" id="btn2">Sax</button>' },
    { name: 'Papper', win: 'Sten', lose: 'Sax', tie: 'Papper', button: '<button class="button" data-name="Papper" id="btn3">Papper</button>' }
];

// Money input for playing
document.querySelector('#submit').addEventListener("click", () => {
    betMoney = Number(document.querySelector('#money1').value);
    document.querySelector('#money1').value = "";;
    if (betMoney > money) {
        alert("Du kan inte spela med mera pengar än vad du har.")
        betMoney = undefined;
    } else if (betMoney <= money && betMoney >= 10) {
        if (confirm(`Du vill spela med ${betMoney}. Tryck på OK för att fortsätta.`)) {
            document.querySelector('#gameMoney').innerText = `Din satsning: ${betMoney}€`;
            money = money - betMoney;
            document.querySelector('#money-Output').innerText = "Dina pengar: " + money + "€";

            document.querySelector('#money1').style.display = 'none';
            document.querySelector('#label').style.display = 'none';
            document.querySelector('#submit').style.display = 'none';
            document.querySelector("#btn1").style.display = 'block';
            document.querySelector("#btn2").style.display = 'block';
            document.querySelector("#btn3").style.display = 'block';

        } else {
            betMoney = undefined;
        }
    } else {
        alert("Ange ett giltigt nummer! OBS! Minsta insats: 10€")
    }
})

// Computer

let randomNum = Math.floor(Math.random(0) * 11);


let index = Math.floor(Math.random() * buttonsSSP.length);

let namn = buttonsSSP[index].name;
let win = buttonsSSP[index].win;
let lose = buttonsSSP[index].lose;
let tie = buttonsSSP[index].tie;

document.querySelector("#playAgain").style.display = 'none';

for (item of buttonsSSP) {
    document.querySelector('#game').innerHTML += item.button
    // Player
    document.querySelectorAll('.button').forEach((elem) => {

        elem.addEventListener('click', (evt) => {
            // Tie
            if (evt.target.dataset.name == tie) {
                money = money + betMoney;
                document.querySelector('#cpuOut').innerHTML = "Datorns val: " +  buttonsSSP[index].name;
                document.querySelector('#youOut').innerHTML =  "Ditt val: " + evt.target.dataset.name;

                document.querySelector('#money-Output').innerText = "Dina pengar: " + money + "€";
                document.querySelector("#output").innerText = 'Jämt';
                document.querySelector('#gameMoney').innerText = `Din satsning: 0€`;

                document.querySelector("#btn1").style.display = 'none';
                document.querySelector("#btn2").style.display = 'none';
                document.querySelector("#btn3").style.display = 'none';

                document.querySelector("#playAgain").style.display = 'block';

                betMoney = undefined;
            }
            // Win
            else if (evt.target.dataset.name == lose && randomNum < 5) {
                document.querySelector('#cpuOut').innerHTML = "Datorns val: " + buttonsSSP[index].name;
                document.querySelector('#youOut').innerHTML =  "Ditt val: " + evt.target.dataset.name;

                document.querySelector("#output").innerText = 'Du vann!';

                money = money + betMoney * 2;
                localStorage.setItem('money', money);

                document.querySelector('#money-Output').innerText = "Dina pengar: " + money + "€";
                document.querySelector('#gameMoney').innerText = `Din satsning: 0€`;

                document.querySelector("#btn1").style.display = 'none';
                document.querySelector("#btn2").style.display = 'none';
                document.querySelector("#btn3").style.display = 'none';

                document.querySelector("#playAgain").style.display = 'block';

                betMoney = undefined;
            }

            // Lose
            else if (evt.target.dataset.name == win || randomNum > 4) {
                document.querySelector('#cpuOut').innerHTML =  "Datorns val: " + buttonsSSP[index].name;
                document.querySelector('#youOut').innerHTML =  "Ditt val: " + evt.target.dataset.name;

                document.querySelector("#btn1").style.display = 'none';
                document.querySelector("#btn2").style.display = 'none';
                document.querySelector("#btn3").style.display = 'none';

                document.querySelector("#output").innerText = 'Ingen vinst';
                document.querySelector('#gameMoney').innerText = `Din satsning: 0€`;

                document.querySelector("#playAgain").style.display = 'block';

                localStorage.setItem('money', money);


                betMoney = undefined;
            }
        })
    })
}

// Adda mera pengar
document.querySelector('#moreBtn').addEventListener('click', () => {
    let moreMoney = document.querySelector('#moreMoney').value;
    if (!moreMoney) {
        alert("Skriv in en summa");
        moreMoney = undefined;
    } else if (confirm("Vill du sätta in " + moreMoney + "€")) {
        document.querySelector('#moreMoney').value = "";
        console.log(moreMoney);
        money = money + Number(moreMoney);
        localStorage.setItem('money', money);
        document.querySelector('#money-Output').innerText = "Dina pengar: " + money + "€";
    }

})

function playAgain() {
    document.querySelector("#output").innerHTML = "";
    if (money == 0) {
        alert("Dina pengar räcker inte till för att spela.");
    } else {
        index = Math.floor(Math.random() * buttonsSSP.length);
        randomNum = Math.floor(Math.random(0) * 11);
        win = buttonsSSP[index].win;
        lose = buttonsSSP[index].lose;
        tie = buttonsSSP[index].tie;
        document.querySelector('#cpuOut').innerHTML = ``;
        document.querySelector('#youOut').innerHTML = ``;
        document.querySelector("#playAgain").style.display = 'none';
        document.querySelector('#gameMoney').innerHTML = ``;
        document.querySelector('#money1').style.display = 'block';
        document.querySelector('#label').style.display = 'block';
        document.querySelector('#submit').style.display = 'block';
        document.querySelector("#output").innerHTML = "";
    }
}

document.querySelector('#playAgain').addEventListener('click', () => {
    playAgain();
})