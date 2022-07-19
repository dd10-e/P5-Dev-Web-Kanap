const id = getId();

//Récupérer l'ID
fetch(`http://localhost:3000/api/products/` + id)
    .then(data => {
        if (!data.ok) {
            throw Error(data.statusText);
        }

        return data.json();
    })
    .then(product => {
        productsData(product);
        //Ecouter au click
        document.getElementById('addToCart').addEventListener('click', () => {
            const color = document.getElementById('colors').value;
            const qty = document.getElementById('quantity').value;
            //Message si aucune couleur selectionnée
            if (color.length === 0) {
                alert('Merci de sélectionner une couleur.')
                return;
            }
            //Message si aucune cquantité selectionnée
            if (qty <= 0) {
                alert('Merci de sélectionner une quantité supérieure à zero.')
                return;
            }
            //création d'un objet Item
            const item = { id: id, color: color, qty: qty }
            //ajouter un objet au panier
            addToCart(item)
        })
    })
    .catch(function(err) {
        window.location.href = '404.html'
    });





function getId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    return params.id;
}

///créer une fonction appelée RenderSelectOptions
function renderSelectOptions(colorValues) {
    ///créer une variable a l'intérieur avec le placeholder en premier élément
    var options = `<option value="">SVP, choisissez une couleur</option>`
    ///puis pour chaque couleur présente dans le array côté serveur, je veux répeter l'opération
    if (colorValues) {
        for (color of colorValues) {
            ///en plaçant mes valeurs modificables
            options += `<option value="${color}">${color}</option>`
        }
    }
    /// Return option synthétise les opération et me renvoye une phrase
    return options
}

///affiche les informations du produit sur la page en html
function productsData(product) {
    console.log(product)
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").innerHTML = `${product.name}`
    document.getElementById("price").innerHTML = `${displayPrice(product.price)}`
    document.getElementById("description").innerHTML = `${product.description}`
    document.getElementById("colors").innerHTML = renderSelectOptions(product.colors)
}


//la fonction addToCart, ajoute le produit selectionné au localStorage,
//Le client a rentré les bonnes infos
function addToCart(product) {
    let items = getCart() ?? [];
    let found = false;

    //Si il n'y a pas encore de produit
    if (items.length > 0) {
        items.forEach(item => {
            if (product.id === item.id && product.color === item.color) {
                item.qty = parseInt(item.qty) + parseInt(product.qty);
                found = true
            }
        })

        //tout nouveau produit non référencé jusque là
    }
    if (!found) {
        items.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(items));

    alert("Votre produit a été ajouté au panier, vous allez être redirigé vers la page d'accueil.")
    window.location.href = 'index.html'

}


