//Récupérer les données de l'API
fetch('http://localhost:3000/api/products')
  .then(data => data.json())
  .then(data => {
    data.forEach(product => {
      display(product)
    })

  })
//Afficher les produits
function display(product) {
  document.getElementById('items').innerHTML += `
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>`
}



