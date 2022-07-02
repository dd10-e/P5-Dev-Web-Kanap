const id = new URL(window.location.href).searchParams.get("order");
console.log(id)

document.getElementById('orderId').innerHTML = id;

localStorage.clear();