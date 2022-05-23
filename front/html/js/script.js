fetch('http://localhost:3000/api/products')
  .then(data =>
  {
        return data.json()
  })
  .then(data =>
  {
      data.forEach(product =>
      {
          document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageURL}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>`
      })
  })
