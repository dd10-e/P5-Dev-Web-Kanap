let items = getCart();
if (items.length === 0) {
    document.querySelector('.cartAndFormContainer').innerHTML = '<h1>Votre panier est vide</>';
    document.querySelector('.cart').getElementsByClassName.display = 'none';
} else {
    fetch('http://localhost:3000/api/products')
        .then(data => data.json())
        .then(data => {
            const products = buildCompleteList(data, items)
            //boucler sur chaque produit
            products.forEach((product) => {
                display(product)
            })
            /* console.log('===')
             displayTotal(products)
             console.log('===')
             products.forEach(product => {
                 listenForQtyChange(product)
                 ListenForDelection(product)
             })
 */


        })
}

function listenForQtyChange(product) {
    document.querySelector(`article.cart__item[data-id="${product.id}"] .itemQuantity`).addEventListener('input', () => {

    })
}

///affiche les informations du produit sur la page en html
function display(product) {
    document.getElementById("cart__items").innerHTML =
        `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}"></img>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}€</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`


}

function buildCompleteList(data, itemsInCart) {
    let list = [];

    itemsInCart.forEach(item => {
        let product = data.find(el => el._id === item.id);
        let pro = { ...product }
        pro.qty = item.qty;
        pro.color = item.color;

        list.push(pro)
    })
    return list;
}

function countTotalProduct(product) {
    let totalQty = O;

    products.forEach(product => {
        totalQty += Number(product.qty);
    })
    return totalQty
}

function countTotalPrice(product) {
    let totalPrice = O;

    products.forEach(product => {
        totalPrice += (Number(product.price) * Number(product.qty))
    })
    return totalPrice
}



function displayTotal(products) {
    document.querySelector('h1').innerText = countTotalProduct(products)
}