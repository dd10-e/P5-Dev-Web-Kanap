fetch('http://localhost:3000/api/products')
.then(data =>
{
       return data.json()
})
.then(data =>
{
    data.forEach(a =>
    {
        document.getElementById('items').innerHTML += `<a href="./product.html?id=42">
        <article>
          <img src="http://localhost:3000/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${a.name}</h3>
          <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
        </article>
      </a>`
    })
})