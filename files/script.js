const validOrInvalidNbr = JSON.parse(localStorage.getItem('phone_numbers_validation_data')) || [];

const logicFn = (() => {
    
    function validate (phoneNumber) {
        const regex = /(^1)?\s?([\s|-])?(([\d]{3})|\(([\d]{3})\))([\s|-])?([\d]{3})([\s|-])?([\d]{4})$/g;        
        const test = regex.test(phoneNumber);
        const match = phoneNumber.match(regex);

        if (test && match[0].split('').length === phoneNumber.length) {
            UIUpdates.validationMsg(`Valid US number: ${phoneNumber}`,true);
        }
        else {
            UIUpdates.validationMsg(`Invalid US number: ${phoneNumber}`,true);
        }
    }

    return {validate};
})()


const UIUpdates = (() => {

    function validationMsg (msg,storage = false) {

        const para = document.createElement('p');
        para.innerText = msg;
        para.className = 'validationResults';
        document.getElementById('results-div').append(para);

        if (storage) {
            storageFN(msg);
        }
    }

    function storageFN (msg) {
        validOrInvalidNbr.push({msg});
        localStorage.setItem('phone_numbers_validation_data',JSON.stringify(validOrInvalidNbr));
    }

    return {validationMsg};
})()


if (validOrInvalidNbr.length) {
    for (let i = 0; i < validOrInvalidNbr.length; i++) {
        UIUpdates.validationMsg(validOrInvalidNbr[i].msg);
    }
}

document.getElementById('check-btn').addEventListener('click',() => {
    if (document.getElementById('user-input').value) {
        logicFn.validate(document.getElementById('user-input').value);
        document.getElementById('user-input').value = '';
    }
    else {
        alert('Please provide a phone number');
    }
})

document.getElementById('clear-btn').addEventListener('click', () => {
    // while (document.getElementById('results-div').children.length) {
    //     document.getElementById('results-div').children[0].remove();
    // }
    document.getElementById('results-div').innerHTML = '';
    validOrInvalidNbr.splice(0);
    localStorage.clear();
})

document.getElementById('USValidNbrsTitle').addEventListener('click',() => {
    document.getElementById('listOfValidNbrs').classList.toggle('ulShow');
})