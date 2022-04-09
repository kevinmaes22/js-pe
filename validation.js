const firstName = document.getElementById('firstNameInput');
const lastName = document.getElementById('lastNameInput');
const userName = document.getElementById('usernameInput');
const address = document.getElementById('addressInput');
const country = document.getElementById('countrySelect');
const province = document.getElementById('provinceSelect');
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const confirmPassword = document.getElementById('confirmPasswordInput');
const payment = document.getElementsByName('paymentOptions');
const zipcode = document.getElementById('zipcodeInput');
const terms = document.getElementById('termsCheckbox');

let errors = [];

function requiredFieldsAreNotEmpty() {
    checkEmptyField(firstName, 'voornaam');
    checkEmptyField(lastName, 'achternaam');
    checkEmptyField(userName, 'gebruikersnaam');
    checkEmptyField(address, 'adres');
    checkEmptySelect(country, 'land');
    checkEmptySelect(province, 'provincie');

    return errors;
}

function checkEmptyField(field, fieldName) {
    if (!field.value)
        errors.push(`Het veld ${fieldName} is vereist.`);
}

function checkEmptySelect(field, fieldName) {
    if (field.selectedIndex === 0)
        errors.push(`Het veld ${fieldName} is vereist.`);
}

function validateEmail() {
    const matches = email.value.match(/^[a-zA-Z0-9][a-zA-Z0-9.-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*$/gm);
    if (matches === null)
        errors.push('E-mailadres is niet correct.');
}

function validatePassword() {
    checkEmptyField(password, 'wachtwoord');
    checkEmptyField(confirmPassword, 'herhaal wachtwoord');

    if (password.value.length < 7)
        errors.push('Het opgegeven wachtwoord is te kort.')

    if (password.value !== confirmPassword.value)
        errors.push('Je wachtwoorden komen niet overeen.')
}

function validatePayment() {
    let selected;

    for (let index = 0; index < payment.length; index++) {
        const element = payment[index];
        if (element.checked)
            selected = element.value
    }

    if (selected === undefined) {
        errors.push('Gelieve een betalingswijze te selecteren')
    } else {
        document.getElementById('results').innerHTML += `<div class="alert alert-info" role="alert"><h3>Betalingswijze</h3><p>Je betalingswijze is ${selected}</p></div>`
    }
}

function checkPC() {
    checkEmptyField(zipcode, 'postcode');

    if (zipcode.value) {
        if (zipcode.value < 1000 || zipcode.value > 9999) {
            errors.push('De waarde van postcode moet tussen 1000 en 9999 liggen.')
        }
    }
}

function checkTerms() {
    if (!terms.checked) {
        errors.push('Je moet de algemene voorwaarden accepteren.')
    }
}

function showSuccess() {
    document.getElementById('results').innerHTML = '<div class="alert alert-success" role="alert"><h3>Goed gedaan!</h3><p>Aww yeah, je werd geregistreerd.</p></div>' + document.getElementById('results').innerHTML
}

function showErrors() {
    document.getElementById('results').innerHTML = '<div class="alert alert-danger" role="alert"><h3>Yikes, errors..</h3><div id="errorList"></div></div>';

    for (let index = 0; index < errors.length; index++) {
        document.getElementById('errorList').innerHTML += `<p>${errors[index]}</p>`

    }

}

function validate() {
    errors = [];
    document.getElementById('results').innerHTML = '';

    requiredFieldsAreNotEmpty();
    validateEmail();
    validatePassword();
    validatePayment();
    checkPC();
    checkTerms();

    return errors;
}