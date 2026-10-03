// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright


console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

const book1 = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.00
};

const book2 = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.00
};

const book3 = {
    title: "1984",
    author: "George Orwell",
    price: 15.00
};

const TAX_RATE = 0.0825;
let isMember = true;

console.log("--- Book Inventory ---");
console.log(book1.title + " by " + book1.author + " - $" + book1.price.toFixed(2));
console.log(book2.title + " by " + book2.author + " - $" + book2.price.toFixed(2));
console.log(book3.title + " by " + book3.author + " - $" + book3.price.toFixed(2));

function calculateSubtotal(price, quantity) {
    return price * quantity;
}

function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

console.log("--- Function Declarations Test ---");
console.log("Subtotal: " + book1.title + ": " + formatCurrency(calculateSubtotal(book1.price, 2)));
console.log("Subtotal: " + book2.title + ": " + formatCurrency(calculateSubtotal(book2.price, 1)));
console.log("Subtotal: " + book3.title + ": " + formatCurrency(calculateSubtotal(book3.price, 3)));

const calculateTax = (subtotal) => subtotal * TAX_RATE;
const applyMemberDiscount = (subtotal, isMember) => {
    return isMember ? subtotal * 0.9 : subtotal;
};

console.log("--- Arrow Functions Test ---");
console.log("Tax: " + book1.title + ": " + formatCurrency(calculateTax(calculateSubtotal(book1.price, 2))));
console.log("Member Discount: " + book1.title + ": " + formatCurrency(applyMemberDiscount(calculateSubtotal(book1.price, 2), true)));
console.log("Non-Member Discount: " + book1.title + ": " + formatCurrency(applyMemberDiscount(calculateSubtotal(book1.price, 2), false)));



const calculateTotal = function(price, quantity = 1, isMember = false) {
    const subtotal = calculateSubtotal(price, quantity);
    const discountedSubtotal = applyMemberDiscount(subtotal, isMember);
    const tax = calculateTax(discountedSubtotal);
    return discountedSubtotal + tax;
};

console.log("--- Function Expression with Defaults ---");
console.log("Total: 1 - " + book1.title + ": " + formatCurrency(calculateTotal(book1.price, 2, true)));
console.log("Total: 2 - " + book2.title + ": " + formatCurrency(calculateTotal(book2.price, 2)));
console.log("Total: 3 - " + book3.title + ": " + formatCurrency(calculateTotal(book3.price)));

function calculateBulkOrder(...prices) {
    let total = 0;
    for (let price of prices) {
        total += price;
    }
    return total;
}

console.log("--- Rest Operator Test ---");
console.log("Bulk Order (3 books): " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price)));
console.log("Bulk Order (5 books): " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price, book1.price, book2.price)));

function processOrder(book, quantity, callback) {
    const total = callback(book.price, quantity);
    return book.title + " - Total: " + formatCurrency(total);
}

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => price * quantity * 0.9;

console.log("--- Callback Functions ---");
console.log(processOrder(book1, 2, standardPricing));
console.log(processOrder(book1, 2, memberPricing));


const orderSummary = {
    customerName: "Van Wright",
    items: [],
    addItem(book, quantity) {
        this.items.push({ book: book, quantity: quantity });
    },
    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.book.price * item.quantity;
        }
        return total;
    },
    displaySummary() {
        let summary = "Order Summary - " + this.customerName + ":\n";
        for (const item of this.items) {
            summary += item.quantity + " x " + item.book.title + " at $" + item.book.price.toFixed(2) + " = $" + (item.book.price * item.quantity).toFixed(2) + "\n";
        }
        summary += "Total: $" + this.getTotal().toFixed(2);
        return summary;
    }
};


console.log("--- Object Methods ---");
orderSummary.addItem(book1, 2);
orderSummary.addItem(book2, 1);
console.log("Total: $" + orderSummary.getTotal().toFixed(2));
console.log(orderSummary.displaySummary());


function validateDiscount(code) {
    if (code) {
        if (code.toUpperCase() === "MEMBER10") {
            return 0.10;
        }
        if (code.toUpperCase() === "SAVE20") {
            return 0.20;
        }
    }
    return 0;
}

console.log("--- Truthy/Falsy Validation ---");
console.log("MEMBER10: " + validateDiscount("MEMBER10"));
console.log("SAVE20: " + validateDiscount("SAVE20"));
console.log("Empty String: " + validateDiscount(""));
console.log("INVALID: " + validateDiscount("INVALID"));


function createOrderProcessor(storeName) {
    const taxRate = 0.0825;
    function processStoreOrder(book, quantity) {
        const subtotal = book.price * quantity;
        const total = subtotal + (subtotal * taxRate);
        return storeName + " - " + book.title + " - Total: " + formatCurrency(total);
    }
    return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---");
const orderProcessed = createOrderProcessor("Van's Bookstore");
console.log(orderProcessed(book1, 2));
console.log(orderProcessed(book2, 3));