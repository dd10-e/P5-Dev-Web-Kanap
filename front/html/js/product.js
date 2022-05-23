const id=getId();


fetch(`http://localhost:3000/api/products/`+ id)
    .then(data =>data.json())
    .then(data=>
        {
            console.log(data)
            document.querySelector('.item_img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`;
            document.getElementById("#title").innerHTML = `${data.name}`
            document.getElementById("#price").innerHTML = `${data.price}`
            document.getElementById("#description").innerHTML = `${data.description}`
            for (let colorkanape of data.colors) {
                colorOption.innerHTML = `<option value="${data.colors}">${data.colors}</option>`
            }
        });

function getId()
{
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    
    return params.id;  
}