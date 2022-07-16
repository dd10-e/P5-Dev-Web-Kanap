//Récupérer ID dans l'URL
const id = new URL(window.location.href).searchParams.get("order");
console.log(id)
//Afficher l'ID
document.getElementById('orderId').innerHTML = id;
//Vider le local storage
localStorage.clear();