const id=getId();


fetch(`http://localhost:3000/api/products/`+ id)
    .then(data => data.json())
    .then(product =>
        {
          productsData(product);
          document.getElementById('addToCart').addEventListener('click', () =>
          {
              const color = document.getElementById('colors').value;
              const qty = document.getElementById('quantity').value;

              if (color.length === 0)
              {
                  alert('Merci de sélectionner une couleur.')
                  return;
              }

              if (qty <= 0)
              {
                  alert('Merci de sélectionner une quantité supérieure à zero.')
                  return;
              }
            //création d'un objet Item
            const item ={id:getId(), color:color, qty:qty}
            //ajouter un objet au panier
            addToCart (item)
            })

            

            
         })
               
        

    

function getId()
{
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    
    return params.id;  
}
///créer une fonction appelée RenderSelectOptions
function renderSelectOptions(colorValues)
{
    ///créer une variable a l'intérieur avec le placeholder en premier élément
    var options = `<option value="">SVP, choisissez une couleur</option>`
    ///puis pour chaque couleur présente dans le array côté serveur, je veux répeter l'opération
    if(colorValues) {
    for (color of colorValues) {
        ///en plaçant mes valeurs modificables
        options += `<option value="${color}">${color}</option>`
        }
    }
    /// Return option synthétise les opération et me renvoye une phrase
    return options
} 

///affiche les informations du produit sur la page en html
function productsData(product)
{
    console.log(product)
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").innerHTML = `${product.name}`
    document.getElementById("price").innerHTML = `${product.price}`
    document.getElementById("description").innerHTML = `${product.description}`
    document.getElementById("colors").innerHTML = renderSelectOptions(product.colors) 
}


//Est-ce qu'il existe déjà des produits dans le LS ?
//Je récupère les valeurs du panier
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
        items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
}


//la fonction addToCart, ajoute le produit selectionné au localStorage,
//Le client a rentré les bonnes infos
function addToCart (product){
if (product.qty <= 0 || product.color == ""){
    return;
}
//va chercher les infos dans le LS
let items = getCart();


//Si il n'y a pas encore de produit
if (items.lenght == 0){
    items = [product];

// Si il y a déjà un produit identique en id et couleur, il ajuste la quantité
} else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
    if (product.id === items[i].id && product.color === items[i].color) {
        found = true;
        items[i].qty = parseInt(items[i].qty) + parseInt(product.qty);
    }

//tout nouveau produit non référencé jusque là
    }
    if (found == false) {
    items.push(product);
    }
}
localStorage.setItem("cart", JSON.stringify(items));
}