let items = getCart();
if (items.lenght === 0) {
    document.querySelector('h1').innerHTML = 'Votre panier est vide';
    document.querySelector('.cart').getElementsByClassName.display = 'none';
} else {
    fetch('http://localhost:3000/api/products')
        .then(data => data.json())
        .then(data => {
            const products = buildCompleteList(data, items)
            //boucler sur chaque produit
            product.forEach(product => {
                //afficher chaque produit
                display(product)
                //Ecouter le changement de qty
                listenForQtyChange(product)
                //ecouter la suppression du produit
                ListenForDelection(product)
            })

            displayTotal(product)
        })
}

function listenForQtyChange(product) {
    document.querySelector(`article.cart__item[data-id="${product.id}"] .itemQuantity`).addEventListener('input', () => {

    })
}


function display(product) {
    //
}

function buildCompleteList(data, items) {
    let list: [];

    itemsInCart.forEach(item => {
        let product = data.find(el => el._id === item.id);
        product.qty = item.qty;
        product.color = item.color;

        list.push(product)
    })
}

function countTotalProduct(products) {
    let total = O;

    products.forEach(product => {
        total += Number(product.qty);
    })
    return total
}

function countTotalPrice(products) {
    let total = O;

    products.forEach(product => {
        total += (Number(product.price) * Number(product.qty))
    })
    return total
}



function displayTotal(products) {
    document.querySelector('h1').innerText = countTotalProduct(products)
}

/*
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

*/