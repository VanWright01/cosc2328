// IC12 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

const statusBox = document.getElementById("statusBox");
statusBox.textContent = "DOM is ready! Elements successfully selected.";
console.log("Status Box: ", statusBox);


const firstCard = document.querySelector(".card");
firstCard.querySelector("p").textContent = "This card was selected using querySelector.";


firstCard.classList.add("highlight");
statusBox.classList.add("active");


const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item, index) => {
    if (index % 2 === 0) {
        item.classList.add("highlight");
    }
});



const thirdCard = document.querySelector("#card-3");
thirdCard.classList.toggle("hidden");

const secondCard = document.querySelector("#card-2");
secondCard.classList.remove("card");


const secondCardParagraph = secondCard.querySelector("p");
secondCardParagraph.textContent = "Safe update: even text like <script>alert('hack');</script> renders as plain characters, not real HTML";
