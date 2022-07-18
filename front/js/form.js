//Simplifier le getElementById
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");
const orderButton = document.getElementById("order");

const regexWordsOnly = /([A-ZÀ-ÿ][-,a-z. ']+[ ]*\D\b)+/gim;


//Ecouter au click
orderButton.addEventListener("click", (e) => {
    e.preventDefault();
    let formIsValid = true;


    //Masquer par défault les msg d'erreur
    hideError('firstNameErrorMsg')
    hideError('lastNameErrorMsg')
    hideError('cityErrorMsg')
    hideError('addressErrorMsg')
    hideError('emailErrorMsg')
    //Afficher msg d'erreur si REGEX invalidé
    if (!validateEmail(mail.value)) {
        formIsValid = false
        showError('emailErrorMsg', "Merci d'entrer une adresse email valide.");
    } else {
        hideError('emailErrorMsg')
    }

    if (!validateFirstName(prenom.value)) {
        formIsValid = false
        showError('firstNameErrorMsg', "Veuillez vérifier votre prénom.");

    }

    if (!validateLastName(nom.value)) {
        formIsValid = false
        showError('lastNameErrorMsg', "Veuillez vérifier votre nom.");

    }

    if (!validateCity(ville.value)) {
        formIsValid = false
        showError('cityErrorMsg', "Veuillez vérifier votre ville.");

    }

    if (!validateAddress(adresse.value)) {
        formIsValid = false
        showError('addressErrorMsg', "Veuillez vérifier votre adresse.");

    }
    //Créer un objet contact avec coordonnées et panier
    if (formIsValid) {
        let payload = {
            contact: {
                firstName: prenom.value,
                lastName: nom.value,
                address: adresse.value,
                city: ville.value,
                email: mail.value
            },
            products: getCart().map(item => item.id)
        }
        //Envoyer les données sur l'API puis rediriger vers page confirmation
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => data.json())
            .then(data => {
                location.href = `confirmation.html?order=${data.orderId}`
            });
    }

})



function hideError(_id) {
    document.getElementById(_id).innerHTML = ''

}

function showError(_id, message) {
    document.getElementById(_id).innerHTML = message
}
//REGEXs///////////////////
function validateAddress(adresse) {
    const regexAddress = /^\d+\s[A-z]+\s[A-z]+/g;
    if (adresse.match(regexAddress)) {
        return true;
    }
}

function validateCity(ville) {
    if (ville.match(regexWordsOnly)) {
        return true;
    }
}

function validateEmail(mail) {
    const regexMail = /^((?!\.)[\w_.-]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g;
    if (mail.match(regexMail)) {
        return true;
    }
}


function validateFirstName(prenom) {
    if (prenom.match(regexWordsOnly)) {
        return true;
    }
    return false;
}

function validateLastName(nom) {
    if (nom.match(regexWordsOnly)) {
        return true;
    }
}



