// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright


console.log("=== Function Declarations ===");
function greet(name){
    return "Hello, " + name + "!";
}

function area(width, height){
    return width * height;
}

console.log(greet("Van"));
console.log("Area of 5,10: " + area(5, 10));



console.log("=== Function Expressions + arrow functions ===");

const multiply = function(x, y) {
    return x * y;
}

const divide = (x, y) => {
    return x / y;
}

const square = x => x * x;

console.log("Multiply 5,10: " + multiply(5, 10));
console.log("Divide 10,5: " + divide(10, 5));
console.log("Square of 5: " + square(5));

console.log("=== Default Parameters & Rest Operators ===");

function greetUser(name, greeting = "Hello") {
    return greeting + ", " + name + "!";
}

console.log(greetUser("Van"));
console.log(greetUser("Van", "Yo"));

function sumAll(...numbers) {
    let total = 0;
    for(const n of numbers) {
        total += n;
    }
    return total;
}

console.log("Sum of 1,2,3,4,5: " + sumAll(1, 2, 3, 4, 5));

console.log("=== Callback Functions ===");

function processNumber(value, callback) {
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("Double -> " + processNumber(5, double));
console.log("Triple -> " + processNumber(5, triple));

console.log("=== Object Methods (this) ===");
const product = {
    brand: "Acme",
    price: 12.5,
    quantity: 4,
    total() {
        return this.price * this.quantity;
    },
    describe() {
        return this.quantity + " x " + this.brand + " @ $" + this.price + " = $" + this.total().toFixed(2);
    }
}

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
