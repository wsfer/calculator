let firstNumber = '';
let secondNumber = '';
let operator = '';
let notInteger = false;

const dotButton = document.querySelector('.dot');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const operateButtons = document.querySelectorAll('.operator');

equalButton.addEventListener('click', endOperation);
clearButton.addEventListener('click', clearAll);
dotButton.addEventListener('click', function (e) {updateNumber(e.target);});

for (let i of operateButtons) {
    i.addEventListener('click', function (e) {operate(e.target);});
}
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

disableOperates();
equalButton.disabled = true;
dotButton.disabled = true;

function operate (operateButton) {

    equalButton.disabled = true;

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        updateTextDisplay();
        return;
    }

    if (secondNumber !== '') {
        switch (operator) {
            case '+':
                firstNumber = Number(firstNumber) + Number(secondNumber);
                break;
            case '-':
                firstNumber = Number(firstNumber) - Number(secondNumber);
                break;
            case '*':
                firstNumber = Number(firstNumber) * Number(secondNumber);
                break;
            case '/':
                firstNumber = Number(firstNumber) / Number(secondNumber);
                break;
        }
        roundNumber();
    }
    secondNumber = '';
    operator = operateButton.textContent;
    updateTextDisplay();
    enableNumbers();
    disableOperates();
    notInteger = false;
    dotButton.disabled = true;
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

function updateNumber (numberButton) {

    if (numberButton.textContent === '.') {
        notInteger = true;
    }

    if (operator === '') {
        firstNumber += numberButton.textContent;
    } else {
        secondNumber += numberButton.textContent;
    }

    if (secondNumber !== '') {
        equalButton.disable = true;
    }

    dotButton.disabled = notInteger;

    enableOperates()
    updateTextDisplay();
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    disableOperates()
    equalButton.disabled = true;
    dotButton.disabled = true;
    notInteger = false;
    updateTextDisplay();
}

function endOperation () {

    switch (operator) {
        case '+':
            firstNumber = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            firstNumber = Number(firstNumber) - Number(secondNumber);
            break;
        case '*':
            firstNumber = Number(firstNumber) * Number(secondNumber);
            break;
        case '/':
            firstNumber = Number(firstNumber) / Number(secondNumber);
            break;
    }
    secondNumber = '';
    operator = '';
    roundNumber();
    enableOperates();
    disableNumbers();
    updateTextDisplay();
    notInteger = false;
    dotButton.disabled = true;
}

function roundNumber () {
    firstNumber = +firstNumber.toFixed(5);
}

function disableOperates () {
    for (let i of operateButtons) {
        i.disabled = true;
    }
} 

function enableOperates () {
    for (let i of operateButtons) {
        i.disabled = false;
    }
    if (secondNumber === '') {
        equalButton.disabled = true;
    } else {equalButton.disabled = false;}
}

function disableNumbers () {
    for (let i of numberButtons) {
        i.disabled = true;
    }
}

function enableNumbers () {
    for (let i of numberButtons) {
        i.disabled = false;
    }
}