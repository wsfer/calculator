let firstNumber = '';
let secondNumber = '';
let operator = '';

const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const operateButtons = document.querySelectorAll('.operator');
for (let i of operateButtons) {
    i.addEventListener('click', function (e) {operate(e.target);});
}

clearButton.addEventListener('click', clearAll);
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}
equalButton.addEventListener('click', endOperation);
disableOperates();
equalButton.disabled = true;

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
                secondNumber = '';
                break;
            case '-':
                firstNumber = Number(firstNumber) - Number(secondNumber);
                secondNumber = '';
                break;
            case '*':
                firstNumber = Number(firstNumber) * Number(secondNumber);
                secondNumber = '';
                break;
            case '/':
                firstNumber = Number(firstNumber) / Number(secondNumber);
                secondNumber = '';
                break;
        }
        roundNumber();
    }
    operator = operateButton.textContent;
    updateTextDisplay();
    disableOperates();
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

function updateNumber (numberButton) {
    if (operator === '') {
        firstNumber += numberButton.textContent;
    } else {
        secondNumber += numberButton.textContent;
    }

    if (secondNumber !== '') {
        equalButton.disable = true;
    }
    enableOperates()
    updateTextDisplay();
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    disableOperates()
    equalButton.disabled = true;
    updateTextDisplay();
}

function endOperation () {

    switch (operator) {
        case '+':
            firstNumber = Number(firstNumber) + Number(secondNumber);
            secondNumber = '';
            operator = '';
            break;
        case '-':
            firstNumber = Number(firstNumber) - Number(secondNumber);
            secondNumber = '';
            operator = '';
            break;
        case '*':
            firstNumber = Number(firstNumber) * Number(secondNumber);
            secondNumber = '';
            operator = '';
            break;
        case '/':
            firstNumber = Number(firstNumber) / Number(secondNumber);
            secondNumber = '';
            operator = '';
            break;
    }
    roundNumber();
    enableOperates();
    updateTextDisplay();
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