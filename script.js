let firstNumber = '';
let secondNumber = '';
let operator = '';
let notInteger = false;
let lastNumber = [];

const dotButton = document.querySelector('.dot');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const operateButtons = document.querySelectorAll('.operator');
const backButton = document.querySelector('#back');
const minusButton = document.querySelector('#minus');

equalButton.addEventListener('click', endOperation);
clearButton.addEventListener('click', clearAll);
dotButton.addEventListener('click', function (e) {updateNumber(e.target);});
backButton.addEventListener('click', backSpace);
minusButton.addEventListener('click', startNegative);

for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

disableButtons(true, true, true, false, true);
minusButton.disabled = false;

function startNegative () {
    firstNumber += '-';
    minusButton.removeEventListener('click', startNegative);
    minusButton.disabled = true;
    operator = '';
    updateTextDisplay();
}

function operate (operateButton) {

    disableButtons(true, true, true, false, true);

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        lastNumber = [];
        updateTextDisplay();
        disableButtons(true, true, true, true, true);
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
    lastNumber = [];
    notInteger = false;
    disableButtons(true, true, true, false, true);
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

function updateNumber (numberButton) {

    lastNumber.push(numberButton.textContent);
    let disableEqual = true;

    if (numberButton.textContent === '.') {
        notInteger = true;
    }

    if (operator === '') {
        firstNumber += numberButton.textContent;
        minusButton.removeEventListener('click', startNegative);
        for (let i of operateButtons) {
            i.addEventListener('click', (e) => operate(e.target));
        }
    } else {
        secondNumber += numberButton.textContent;
    }

    if (secondNumber !== '') {
        disableEqual = false;
    }

    updateTextDisplay();
    disableButtons(notInteger, disableEqual, false, false, false);
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    lastNumber = [];
    disableButtons(true, true, true, false, true);
    minusButton.addEventListener('click', startNegative);
    minusButton.disabled = false;
    notInteger = false;
    updateTextDisplay();
}

function endOperation () {

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        updateTextDisplay();
        disableButtons(true, true, true, true, true);
        lastNumber = [];
        return;
    }

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
    lastNumber = [];
    roundNumber();
    updateTextDisplay();
    notInteger = false;
    disableButtons (true, true, true, true, false);
}

function roundNumber () {
    firstNumber = +firstNumber.toFixed(5);
}

function backSpace () {

    if (lastNumber[lastNumber.length-1] === '.') {
        dotButton.disabled = false;
    }

    if (secondNumber === '') {
        lastNumber.pop();
        firstNumber = '';
        for (let i of lastNumber) {
            firstNumber += i;
        }
    } else {
        lastNumber.pop();
        secondNumber = '';
        for (let i of lastNumber) {
            secondNumber += i;
        }
    }
    updateTextDisplay();

    if (lastNumber.length === 0) {
        disableButtons(true, true, true, false, true);
    }
}

function disableButtons (boolDot, boolEqual, boolBack, boolNumbers, boolOperates) {
    dotButton.disabled = boolDot;
    equalButton.disabled = boolEqual;
    backButton.disabled = boolBack;
    for (let i of numberButtons) {
        i.disabled = boolNumbers;
    }
    for (let i of operateButtons) {
        i.disabled = boolOperates;
    }
}