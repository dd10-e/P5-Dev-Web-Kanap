//Récupérer le local storage
let localStorageItems = JSON.parse(localStorage.getItem("items"));
console.table(localStorageItems);
const positionEmptyCart = document.querySelector("cart__items");

//Si le panier est vide
function getCart() {
    if (localStorageItems == 0) {
        positionEmptyCart.innerHTML = `<p>Votre panier est vide</p>`
    }
    else {
        `<p>123</p>`
    }
}

getCart()

console.log(getCart)

