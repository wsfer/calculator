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

equalButton.addEventListener('click', endOperation);
clearButton.addEventListener('click', clearAll);
dotButton.addEventListener('click', function (e) {updateNumber(e.target);});
backButton.addEventListener('click', backSpace);

for (let i of operateButtons) {
    i.addEventListener('click', function (e) {operate(e.target);});
}
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

disableButtons(true, true, true, false, true);

function operate (operateButton) {

    equalButton.disabled = true;
    backButton.disabled = true;

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
    let enableEqual = true;

    if (numberButton.textContent === '.') {
        notInteger = true;
    }

    if (operator === '') {
        firstNumber += numberButton.textContent;
        backButton.disabled = false;
    } else {
        secondNumber += numberButton.textContent;
        backButton.disabled = false;
    }

    if (secondNumber !== '') {
        enableEqual = false;
    }

    updateTextDisplay();
    disableButtons(notInteger, enableEqual, false, false, false);
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    lastNumber = [];
    disableButtons(true, true, true, false, true);
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