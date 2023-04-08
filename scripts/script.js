// methodes
// ik gebruik liever geen arrow functions omdat ik sneller de standaard function kan aanmaken met de auto complete van VSCode
function ValidateFieldForEmpty(field) {
    if(field.value == "") return `veld ${field.getAttribute("id")} is vereist!`;
    return "";
}
function ValidateAllForEmpty(fields = []) {
    let errors = [];
    fields.forEach(element => {
        if(ValidateFieldForEmpty(element) != "") errors.push(ValidateFieldForEmpty(element))
    });
    
    return errors
}

//source https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
            {
            alert("Valid email address!");
            return true;
            }
    else
        {
        alert("You have entered an invalid email address!");
        return false;
        }
}

//form declareren
const form = document.querySelector("#forma")

//click event 
form.addEventListener("submit", (e) =>{
    //voorkomen dat de pagina vernieuwd (ik weet dat dit ook voorkomt dat de info van het formulier word verzonden maar dat is niet het doel van deze opdracht)
    e.preventDefault();

    let txtVoornaam = document.querySelector("#voornaam")
    let txtAchternaam = document.querySelector("#achternaam")
    let txtGebruikernaam= document.querySelector("#Gebruikersnaam")
    let txtEmail = document.querySelector("#email")
    let txtWachtwoord = document.querySelector("#wachtwoord")
    let txtHerhaalwoord= document.querySelector("#herhaalwachtwoord")
    let txtAdress = document.querySelector("#Adres")

    let cmbLand = document.querySelector("#land")
    let cmbProv = document.querySelector("#provincie")
    let cmbPost = document.querySelector("#postcode")

    let cbBrief = document.querySelector("#nieuwsbrief")
    let cbVoorwaarden = document.querySelector("#voorwaarden")

    let rbBetaling = document.querySelectorAll(".paymentMethod")

    let errorlog = document.querySelector("#errorlog")
    let errors = [];
    fieldsForEmpty = [txtVoornaam,txtAchternaam,txtGebruikernaam,txtAdress,cmbLand,cmbProv]
    
    errors =  ValidateAllForEmpty(fieldsForEmpty)
    // console.log(errors)
    // console.log(errorlog)
    let errorString = errors.toString().replaceAll(",","\n");
    errorlog.value = errorString
},false);