// methodes
// ik gebruik liever geen arrow functions omdat ik sneller de standaard function kan aanmaken met de auto complete van VSCode

//geef geen message mee omdat deze dynamisch word aangemaakt hier 
function CheckEmptyField(field) {
    if(field.value == "") return `veld ${field.getAttribute("id")} is vereist!`;
    return "";
}

function CheckEmptyAll(fields = []) {
    let errors = [];
    fields.forEach(element => {
        if(CheckEmptyField(element) != "") errors.push(CheckEmptyField(element))
    });
    
    return errors
}

function CheckPassword(password,repeat) {
    
    let input = [password,repeat]
    let output = []
    output = CheckEmptyAll(input)

    if(output.length == 0)
    {
        if(password.value.length <= 7)
        output.push("wachtwoord moet minstens 7 characters bevatten.")
        if(repeat.value != password.value)
        output.push("wachtwoord en herhaal wachtwoord zijn niet gelijk")
    }
    return output
}

function HideUIElement(uiElement){
    uiElement.hidden = true
}

function ShowUIElement(uiElement) {
    uiElement.hidden = false
}

//source https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
    {
        return true;
    }      
    else
    {
        return false;
    }
}

//main

const errorAlert = document.querySelector("#errorAlert")
const confirmAlert = document.querySelector("#confirmAlert")
const paymentAlert = document.querySelector("#paymentAlert")

HideUIElement(errorAlert)
HideUIElement(confirmAlert)
HideUIElement(paymentAlert)

//form declareren
const form = document.querySelector("#forma")

//click event 
form.addEventListener("submit", (e) =>{
    //voorkomen dat de pagina vernieuwd (ik weet dat dit ook voorkomt dat de info van het formulier word verzonden)
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
    // lege error array declareren
    let errors = [];
    //array met velden die op leeg moeten getest worden
    fieldsForEmpty = [txtVoornaam,txtAchternaam,txtGebruikernaam,txtAdress,cmbLand,cmbProv]
    
    //testen voor empty fields -ww velden die worden later gecontroleerd in hun eigen methode
    errors =  CheckEmptyAll(fieldsForEmpty)
    
    //email controleren
    if(txtEmail.value == null || ValidateEmail(txtEmail) == false)
    errors.push("E-mailaders is niet correct");

    //wachtwoord controle
    //deze methode is om te voorkomen dat alle 4 mogelijke errors voor WW tegelijk te zien zijn
    errors = errors.concat(CheckPassword(txtWachtwoord,txtHerhaalwoord))

    
    // error log posten    
    errorlog.innerHTML = errors.toString().replaceAll(",","<br>");
},false);