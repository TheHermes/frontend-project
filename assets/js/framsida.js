//1B Användar uppgifter för spelregler
let age;

function ageInput() {
    let age = document.querySelector("#age").value;
    document.querySelector("#age").value = "";
    localStorage.setItem('age', age);

    console.log(age);
    if (age >= 18) {
        if (confirm("Med att trycka på OK godkänner du att du är myndig?")) {
            document.querySelector("#age-output").innerHTML = `Din ålder är <b>${age}</b>`
            document.querySelector("#age").style.display = "none";
            document.querySelector("#ageBtn").style.display = "none";
            document.querySelector('#money').style.pointerEvents = 'auto';
            document.querySelector('#money').style.opacity = '1';
            document.querySelector('#moneyBtn').style.pointerEvents = 'auto';
            document.querySelector('#moneyBtn').style.opacity = '1';
        }
    } else if (!age) {
        alert("Fyll i ålder")
    } else if (age < 18 && age >= 0) {
        alert("Du är inte myndig och kan inte spela på vårt casino");   //Om man inte är myndig stänger sidan sig själv
        window.open("../index.html", "_self");
    } else {
        alert("Ange en giltig ålder")
    }
}
function moneyInput() {
    let money = document.querySelector("#money").value;
    money = money.replaceAll(',', '.');
    document.querySelector("#money").value = "";
    localStorage.setItem('money', money);

    if (money >= 10) {
        if (confirm(`Du vill spela med ${money}€? Tryck på ok för att godkänna.`)) {
            document.querySelector("#money").style.display = "none";
            document.querySelector("#moneyBtn").style.display = "none";
            money = Number(money);
            document.querySelector('#money-output').innerHTML = `Du har valt att spela med <b>${money} €</b>`;
            document.querySelector('#timeContainer').style.display = 'flex';
        }
    } else {
        alert("Ange en giltig saldo, OBS! Minimi saldo är 10€")
    }
}
//1a delen, input av namn samt generande av användarnamn
//let namn = document.getElementById("förnamn").value;
//let efternamn = document.getElementById("efternamn").value;
function minFunktion() {
    let namn = document.getElementById("förnamn").value;
    let efternamn = document.getElementById("efternamn").value;

    namn = namn.trim();                         //Tar bårt eventuella mellanslag, om end usern insätter
    efternamn = efternamn.trim();

    let lcnamn = namn.toLowerCase();            //Byter alla bokstäver till småbokstäver, om det finns stora för att generar användarnamn
    let lcefternamn = efternamn.toLowerCase();
    let användar = `${lcnamn}${lcefternamn[0]}${lcefternamn[1]}`  //lc = lowercase
    if (!namn || !efternamn) {
        alert("Du måste fylla i båda fälten!");
    } else {
        document.querySelector("#förnamn").style.display = "none";
        document.querySelector("#efternamn").style.display = "none";
        document.querySelector("#nameBtn").style.display = "none";

        document.querySelector('#age').style.pointerEvents = 'auto';
        document.querySelector('#age').style.opacity = '1';
        document.querySelector('#ageBtn').style.pointerEvents = 'auto';
        document.querySelector('#ageBtn').style.opacity = '1';

        document.querySelector("#hello-output").innerHTML = `Hej ${namn} ditt användarnamn är <b> ${användar} </b>`;
        localStorage.setItem("användarNamn", användar)
    }
}

document.querySelector("#nav4").innerHTML = localStorage.getItem("användarNamn");

function clock() {
    const element = document.getElementById('nav');
    let dag1 = new Date()
    element.innerHTML = dag1.getDate() + "." + dag1.getMonth() + "." + dag1.getFullYear() + " kl. " + ("00" + dag1.getHours()).slice(-2) + "." + ("00" + dag1.getMinutes()).slice(-2) + "." + ("00" + dag1.getSeconds()).slice(-2); 
}

clock();
const date = setInterval(clock, 1000);


/*const date = setInterval(() => {
    const element = document.getElementById('nav');
    dag = new Date()
    element.innerHTML = dag.getDate() + "." + dag.getMonth() + "." + dag.getFullYear() + " kl. " + ("00" + dag.getHours()).slice(-2) + "." + ("00" + dag.getMinutes()).slice(-2) + "." + ("00" + dag.getSeconds()).slice(-2); 
}, 1000);*/
const d = new Date();
let day = d.getDay()
if (day == 6 || day == 0) {
    document.getElementById("nav2").innerHTML = "Casinot är stängt idag";
    //document.getElementById("nav3").innerHTML = casinoCd();
}

const myInterval = setInterval(casinoCd, 1000);

function stopTimer() {
    clearInterval(myInterval);
}

function casinoCd() {
    let now = new Date().getTime();
    let distance = nextMån - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let veckodag = document.getElementById("veckodag");
    let selectedValue = veckodag.options[veckodag.selectedIndex].value;
    if (selectedValue == "lördag" || selectedValue == "söndag") {
        document.querySelector("#nav2").innerHTML = `Casinot är stängt idag! Tid tills Casinot öppnar: ${days}d  ${hours}h ${minutes}m ${seconds}s`
        document.querySelector("#stängt").style.display ="none"
        document.querySelector("#stängt2").style.display ="none"
    } else if (selectedValue == "måndag" || selectedValue == "tisdag" || selectedValue == "onsdag" || selectedValue == "torsdag" || selectedValue == "fredag") {
        document.querySelector("#nav2").innerHTML = "Casinot är öppet idag!!!";
        document.querySelector("#stängt").style.display ="block"
        document.querySelector("#stängt2").style.display ="block"



    }
}

let now = new Date();
let nextMån = new Date();
nextMån.setDate(now.getDate() + (6 - now.getDay() + 7) % 7 + 1);
nextMån.setHours(24, 0, 0, 0);

const tid = new Date()
let dag = tid.getDay()
const vd = [
    {name: "Söndag", value: 0, },
    {name: "Måndag", value: 1},
    {name: "Tisdag", value: 2},
    {name: "Onsdag", value: 3},
    {name: "Torsdag", value: 4},
    {name: "Fredag", value: 5},
    {name: "Lördag", value: 6}
];

for (let i = 0; i < vd.length; i++){
    if (dag == vd[i].value){
        document.querySelector("#default").style.display = "none";
        document.querySelector('#default').innerHTML = vd[i].name;
    }
}



const bakgrund = document.querySelector("#bakgrund")

bakgrund.addEventListener("click", function (evt) {
    /*if (evt.target.value == "ljus"){
        const ljus = document.querySelector("#bakgrund-färg").style.backgroundColor = '#ffffff';  
        localStorage.setItem("bgColor", ljus)
    } else if (evt.target.value == "mörk") {
        document.querySelector("#bakgrund-färg").style.backgroundColor = '#20123c';  
    }else if (evt.target.value == "suddig"){
        document.querySelector("#bakgrund-färg").style.backgroundColor = "#a9a9a9";
    }*/
    document.querySelector(".bakgrund-färg1").style.backgroundColor = evt.target.value;
    document.querySelector(".bakgrund-färg2").style.backgroundColor = evt.target.value;
    localStorage.setItem("bgColor", evt.target.value)

})


function myColor() {
    let red = document.querySelector("#red").value;
    let green = document.querySelector("#green").value;
    let blue = document.querySelector("#blue").value;
    let color = "rgb(" + red + "," + green + "," + blue + ")";
    document.querySelector('.text-färg1').style.color = color;
    document.querySelector('.text-färg2').style.color = color;


    /*document.querySelectorAll(".text-färg1").forEach((elem) => {
         elem.style.color = color;
    })*/

    localStorage.setItem("textColor", color)
}

document.querySelector("#red").addEventListener("input", myColor);
document.querySelector("#green").addEventListener("input", myColor);
document.querySelector("#blue").addEventListener("input", myColor);

/*localStorage.setItem("red", red.value);
localStorage.setItem("green", green.value);
localStorage.setItem("blue", blue.value);*/

document.querySelector("#box").style.display = "none"

document.querySelector(".bakgrund-färg1").style.backgroundColor = localStorage.getItem("bgColor");
document.querySelector(".bakgrund-färg2").style.backgroundColor = localStorage.getItem("bgColor");
document.querySelector(".text-färg1").style.color = localStorage.getItem("textColor");
document.querySelector(".text-färg2").style.color = localStorage.getItem("textColor");