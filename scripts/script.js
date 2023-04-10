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

//methodes waar ik een van de alerts kan meegeven en laten zien of verstoppen
function HideUIElement(uiElement){
    uiElement.hidden = true
}
function ShowUIElement(uiElement) {
    uiElement.hidden = false
}

//betalingswijze 
function CheckRB(fields) {
     let betalinglog = document.querySelector("#betalinglog")
     betalinglog.textContent = `Je betalingswijze is ${fields.find(e => e.checked == true).value}`
}

//postcode word hier niet op leeg gecontroleerd dat word door de CheckEmptyAll methode gedaan
function CheckPC(field) {
    if(field.value != "" &&(field.value < 1000 || field.value >10000))
    return "postcode moet tussen 1000 en 9999 liggen"
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

//hide de alerts on startup
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

    let cbVoorwaarden = document.querySelector("#voorwaarden")
    // rb betalingen aanmaken als array niet als een nodelist zodat ik de array.find kan gebruiken om de waarden op te vragen
    let rbBetaling= Array.from(document.querySelectorAll(".paymentMethod"))
    

    let errorlog = document.querySelector("#errorlog")
    // lege error array declareren
    let errors = [];

    //array met velden die op leeg moeten getest worden
    fieldsForEmpty = [txtVoornaam,txtAchternaam,txtGebruikernaam,txtAdress,cmbLand,cmbProv,cmbPost]    
    //testen voor empty fields -ww velden die worden later gecontroleerd in hun eigen methode
    errors =  CheckEmptyAll(fieldsForEmpty)
    
    //email controleren
    if(txtEmail.value == null || ValidateEmail(txtEmail) == false)
    errors.push("E-mailaders is niet correct");

    //wachtwoord controle
    //deze methode is om te voorkomen dat alle 4 mogelijke errors voor WW tegelijk te zien zijn
    errors = errors.concat(CheckPassword(txtWachtwoord,txtHerhaalwoord))
    
    //postcode check met if statement om een null result uit de error array te houden
    if(CheckPC(cmbPost) != null)errors.push(CheckPC(cmbPost))

    //betalingswijze 
    CheckRB(rbBetaling)

    if(cbVoorwaarden.checked == false) errors.push("je moet de algemene voorwaarden accepteren")

    //check ofdat er errors zijn en de juiste UI elementen laten zien
    if(errors.length == 0)
    {
        ShowUIElement(paymentAlert)
        ShowUIElement(confirmAlert)
        HideUIElement(errorAlert)   
    }
    else
    {
        HideUIElement(paymentAlert)
        HideUIElement(confirmAlert)
        ShowUIElement(errorAlert)   
        errorlog.innerHTML = errors.toString().replaceAll(",","<br>");
    }
},false);