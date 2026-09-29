/* IC10 – COSC 2328 – Professor McCurry
   Implemented by: Van Wright */

const city = "Houston";
const country = "United States";
let population = 2300000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

if (population > 1000000) {
    console.log(city + " is a metropolis.");
} else {
    console.log(city + " is a growing city.");
}

let isLoggedIn = false;
if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in.");
}

const username = "";
if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required.");
}

let hasAccount = true;
let isEmailVerified = false;
let agreedToTerms = true;

if ((hasAccount && agreedToTerms) || isEmailVerified) {
    console.log("Regestration allowed");
} else {
    console.log("Regestration blocked");
}

