console.log(`Fönsterstorlek: ${window.innerWidth}px * ${window.innerHeight}px`);
console.log(`Skärmens resolution: ${screen.width}px * ${screen.height}px`);

if ((window.navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    console.log('Webbläsare: Opera');
} else if (navigator.userAgent.indexOf("Edg") != -1) {
    console.log('Webbläsare: Microsoft Edge');
} else if (navigator.userAgent.indexOf("Chrome") != -1) {   // != -1 eftersom om den inte hittar en string av samma namn så  
    console.log('Webbläsare: Google Chrome');               // returnerar den -1, annars ger den ett positivt värde
} else if (navigator.userAgent.indexOf("Safari") != -1) {
    console.log('Webbläsare: Safari');
} else if (navigator.userAgent.indexOf("Firefox") != -1) {
    console.log('Webbläsare: Firefox');
} else if ((navigator.userAgent.indexOf("MSIE") != -1)){
    console.log('Webbläsare: Internet Explorer');
} else {
    console.log('Unknown browser');
}

let platform = undefined;

if (window.navigator.userAgent.indexOf("Windows") != -1){
    platform = "Windows";
} else if (window.navigator.userAgent.indexOf("Mac") != -1){
    platform = "Mac";
} else if (window.navigator.userAgent.indexOf("Linux") != -1){
    platform = "Linux";
} else platform = "Annan plattform"

console.log(`Platform: ${platform}\nSpråk: ${navigator.language}`)

function locationGet(position) {
    console.log(`Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
}
function locationError(error) {
    console.log(error, "Användaren har nekat positionering, kan inte visa kordinater.")
}
navigator.geolocation.getCurrentPosition(locationGet, locationError);

if (localStorage.getItem('visit')) {
    let Count = localStorage.getItem('visit');
    console.log("Användaren har besökt sidan: " + Count + " gånger.");
    Count++;
    localStorage.setItem('visit', Count);
} else {
    localStorage.setItem('visit', 1);
}
