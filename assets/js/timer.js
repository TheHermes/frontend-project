let timeChoice;
let timeSubmit;

const choiceArray = [
    { val: "Välj speltid" },
    { val: "TEST1", info: "Du kommer att spela i 5 sekunder", value: 10000 },
    { val: "TEST2", info: "Du kommer att spela i 5 sekunder", value: 610000 },
    { val: "5m", info: "Vill du att spela i 5 minuter", value: 300000 },
    { val: "15m", info: "Vill du spela i 15 minuter", value: 900000 },
    { val: "30m", info: "Vill du spela i 30 minuter", value: 1800000 },
    { val: "1h", info: "Vill du spela i 1 timme", value: 3600000 },
    { val: "1h30m", info: "Vill du spela i 1 timme och 30 minuter", value: 5400000 },
    { val: "2h", info: "Vill du spela i 2 timmar", value: 7200000 }
];

// Genererar valen i select elementet
for (let i in choiceArray) {
    document.querySelector('#sel').innerHTML += `<option>${choiceArray[i].val}</option>`;
};

// Om det finns i sessionstorage redan en timeOption från ett tidigare val från en annan sida så gör den lite annorlundare
if (sessionStorage.getItem('to') != undefined) {
    document.querySelector("#sel").style.display = "none";
    timeOption = new Date(sessionStorage.getItem('to'));
    let playTimeEnd = document.querySelector("#playTimeEnd");

    let timme = ("00" + timeOption.getHours()).slice(-2);
    let minut = ("00" + timeOption.getMinutes()).slice(-2);
    playTimeEnd.innerHTML = `Klockan ${timme}.${minut} slutar din speltid.`;

    casinoTimer2();
    const newInterval = setInterval(casinoTimer2, 1000);
} else if (sessionStorage.getItem('to')==undefined) {
    document.querySelector("#sel").addEventListener('change', (evt) => {
        timeSubmit = choiceArray[evt.target.selectedIndex].value;
        console.log(timeSubmit);
        playTimeEnd = document.querySelector("#playTimeEnd");
        if (confirm(choiceArray[evt.target.selectedIndex].info + "?\nTryck på ok för att godkänna speltiden.")) {
            const now2 = new Date().getTime();
            timeOption = new Date(now2 + timeSubmit);
            sessionStorage.setItem("to", timeOption);
            playTimeEnd = document.querySelector("#playTimeEnd");
            
            console.log()
            // Tar bårt select elementet efter att man gjort sitt val
            document.querySelector("#sel").style.display = "none";

            let timme = ("00" + timeOption.getHours()).slice(-2);   // ("00" + var).slice(-2) Gör så att om timme, minuten eller 
            let minut = ("00" + timeOption.getMinutes()).slice(-2); // sekunden är under 10 att den visar t.ex. 02:05:02 istlället för 2:5:2.

            playTimeEnd.innerHTML = `Klockan ${timme}.${minut} slutar din speltid.`;
            
            casinoTimer2();
            setInterval(casinoTimer2, 1000);
        }
    });
}



function casinoTimer2() {
    newInterval = localStorage.getItem('timer');
    //timeOption = sessionStorage.getItem('to');

    const now = new Date().getTime();
    let gameTime = timeOption - now;

    let hours = ("00" + Math.floor((gameTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    let minutes = ("00" + Math.floor((gameTime % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);            // ("00" + var).slice(-2) Gör så att om timme, minuten eller 
    let seconds = ("00" + Math.floor((gameTime % (1000 * 60)) / 1000)).slice(-2);                       // sekunden är under 10 att den visar t.ex. 02:05:02 istlället för 2:5:2. 

    document.getElementById("timerOut").innerHTML = `${hours}:${minutes}:${seconds}`;

    if (gameTime <= 0) {
        sessionStorage.removeItem('to');
        gameTime = undefined;
        clearInterval(setInterval(casinoTimer2, 1000));
        document.getElementById("timerOut").innerHTML = "Speltid slut";
        alert("Speltid slut");
        window.open("../index.html", "_self");
    } else if (gameTime < 600000 && gameTime > 599000) {
        alert("10 minuter kvar!")
    }
};