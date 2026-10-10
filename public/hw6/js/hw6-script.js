// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright


const productPrices = {
    laptop: 999.99,
    tablet: 499.99,
    phone: 699.99,
    monitor: 299.99
};

const discountCodes = {
    "SAVE10": 0.10,
    "SAVE20": 0.20,
    "STUDENT": 0.15
};

const calculateTax = (subtotal) => {
    return subtotal * 0.0825;
};

const applyDiscount = function(subtotal, code) {
    const trimCode = code.trim().toUpperCase();

    if (discountCodes[trimCode]) {
        return subtotal * discountCodes[trimCode];
    }

    return 0;
}

const orderForm = document.getElementById("orderForm");
const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discountCode");
const results = document.getElementById("results");

const resultProduct = document.getElementById("resultProduct");
const resultQuantity = document.getElementById("resultQuantity");
const resultSubtotal = document.getElementById("resultSubtotal");
const resultDiscount = document.getElementById("resultDiscount");
const resultTax = document.getElementById("resultTax");
const resultTotal = document.getElementById("resultTotal");


orderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedProduct = productInput.value;
    const quantity = Number(quantityInput.value);
    const discountCode = discountInput.value.trim();

    const price = productPrices[selectedProduct];

    if(selectedProduct === "") {
        alert("Please select a product");
        return;
    }

    if(quantity < 1) {
        alert("Please enter a quanitity, at least 1");
        return;
    }

    const subtotal = price * quantity;
    const discountAmount = applyDiscount(subtotal, discountCode);
    const discountedSubtotal = subtotal - discountAmount;
    const tax = calculateTax(discountedSubtotal);
    const total = discountedSubtotal + tax;

    resultProduct.textContent = selectedProduct;
    resultQuantity.textContent =  quantity;
    resultSubtotal.textContent = "$" + subtotal.toFixed(2);
    resultDiscount.textContent = "-$" + discountAmount.toFixed(2);
    resultTax.textContent = "$" + tax.toFixed(2);
    resultTotal.textContent = "$" + total.toFixed(2);

    results.classList.remove("results-hidden");


});



