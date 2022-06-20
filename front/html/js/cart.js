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
            displayTotal(products)
            products.forEach(product => {
                //listenForQtyChange(product)
                listenForDelection(product)
            })



        })
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

function countTotalProduct(products) {
    let totalQty = 0;

    products.forEach(product => {
        totalQty += Number(product.qty);
    })
    return totalQty
}

function countTotalPrice(products) {
    let totalPrice = 0;

    products.forEach(product => {
        totalPrice += (Number(product.price) * Number(product.qty))
    })
    return totalPrice
}

///affiche les informations du produit sur la page en html
function display(product) {
    document.getElementById("cart__items").innerHTML +=
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

function displayTotal(products) {
    document.getElementById("totalQuantity").innerText = countTotalProduct(products)
    document.getElementById("totalPrice").innerText = countTotalPrice(products)
}


function listenForDelection(product) {
    let deleteItem = document.querySelectorAll(".deleteItem");
    console.log(deleteItem);

    deleteItem.forEach((delete) => {
        delete.addEventListener("click", () => {
            console.log(delete);
            let totalProductRemove = product.length;
            console.log(totalProductRemove);

            if (totalProductRemove == 1) {
                return (
                    localStorage.removeItem("product"),
                    console.log("remove tout le panier")
                );
            }
            else {
                XXXXX
            }
        }


/*
function listenForQtyChange(product) {
    consolelog("===")
    let newProductQty = product.qty
    document.querySelectorAll(".itemQuantity").addEventListener("change", (newProductQty) => {
        if (product.qty < newProductQty) {
            alert('Un produit a été ajouté')
            product.qty++
            localStorage.cart = JSON.stringify(cart);
            displayTotal();
        }
        else {
            alert('Un produit a été supprimé')
            product.qty--
            localStorage.cart = JSON.stringify(cart);
            displayTotal();
        }
    })
}


function listenForQtyChange(product) {
    document.querySelectorAll(".itemQuantity").addEventListener("change", () => {
        const adjustQty = document.getElementById('itemQuantity').value;
        if (product.qty < product.adjustQty && product.color === cart.dataset.color && product.id === product._id) {
            alert('Un produit a été ajouté')
            product.qty++
            localStorage.cart = JSON.stringify(cart);
            displayTotal();
        }
        else {
            alert('Un produit a été supprimé')
            product.qty--
            localStorage.cart = JSON.stringify(cart);
            displayTotal();
        }
    })
}
*/