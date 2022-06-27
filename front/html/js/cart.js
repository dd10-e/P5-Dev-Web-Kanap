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
                listenForQtyChange(product)
                listenForDelection(product)
            })
            //fetchIdData()



        })
}
////////////////////////////////////
////Formulaire
///////////////////////////////////
/*
fetchIdData();
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
    e.preventDefault();
    let email = validateEmail(mail.value);
    let firstName = validateFirstName(prenom.value);
    let lastName = validateLastName(nom.value);
    let city = validatecity(ville.value);
    let adress = validateAdress(adresse.value);
    if (
        email == false ||
        firstName == false ||
        lastName == false ||
        city == false ||
        adress == false
    ) {
        if (email == false) {
            emailErrorMsg.innerHTML = "Merci d'entrer une adresse email valide.";
        }
        if (firstName == false) {
            firstNameErrorMsg.innerHTML = "Veuillez vérifier votre prénom.";
        }
        if (lastName == false) {
            lastNameErrorMsg.innerHTML = "Veuillez vérifier votre nom.";
        }
        if (city == false) {
            cityErrorMsg.innerHTML = "Veuillez vérifier votre ville.";
        }
        if (adress == false) {
            adressErrorMsg.innerHTML = "Veuillez vérifier votre adresse.";
        }
        return;
    }
})


//REGEXs
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("adress");
const mail = document.getElementById("email");

//email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
    const regexMail = ^ ([a - zA - Z0 -9_\-\.] +)@([a - zA - Z0 -9_\-\.] +) \.([a - zA - Z]{ 2, 5 }) $;
    if (regexMail.test(mail) == false) {
        return false;
    } else {
        emailErrorMsg.innerHTML = null;
        return true;
    }
}

//names
const regexName = ^ ([a - zA - Z]{ 2, }\s[a-zA - Z]{ 1,} ' ? -? [a - zA - Z]{ 2, }\s?([a - zA - Z]{ 1,})?) ';

//first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
    if (regexName.test(prenom) == false) {
        return false;
    } else {
        firstNameErrorMsg.innerHTML = null;
        return true;
    }
}

//last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
    if (regexName.test(nom) == false) {
        return false;
    } else {
        lastNameErrorMsg.innerHTML = null;
        return true;
    }
}

//city
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validatecity(ville) {
    if (regexName.test(ville) == false) {
        return false;
    } else {
        cityErrorMsg.innerHTML = null;
        return true;
    }
}

//adress
const adressErrorMsg = document.getElementById("adressErrorMsg");
function validateAdress(adresse) {
    if (regexName.test(adresse) == false) {
        return false;
    } else {
        adressErrorMsg.innerHTML = null;
        return true;
    }
}
*/
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
            <p>${displayPrice(product.price)}</p>
            
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
    document.getElementById("totalPrice").innerText = displayPrice(countTotalPrice(products))
}

function listenForDelection(product) {
    document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] .deleteItem`).addEventListener("click", (event) => {
        const products = getCart();
        const index = products.findIndex(a => a.id === product._id && a.color === product.color)
        products.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(products));
        alert('Votre produit a bien été supprimé.')
        window.location.reload();
    })
}

function listenForQtyChange(product) {
    document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] .itemQuantity`).addEventListener("input", (event) => {
        const newQty = event.target.value
        if (newQty <= 0) {
            alert('Merci de séléctionner une quantité supérieure à zéro.')
            return;
        }
        const products = getCart();
        const item = products.find(a => a.id === product._id && a.color === product.color)
        item.qty = newQty
        localStorage.setItem('cart', JSON.stringify(products));
        alert('votre panier été mis à jour')
        window.location.reload();
    })
}
