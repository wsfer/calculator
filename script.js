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

enableOperates(false);
equalButton.disabled = true;
dotButton.disabled = true;
backButton.disabled = true;

function operate (operateButton) {

    equalButton.disabled = true;
    backButton.disabled = true;

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        lastNumber = [];
        updateTextDisplay();
        equalButton.disabled = true;
        dotButton.disabled = true;
        backButton.disabled = true;
        enableNumbers(false);
        enableOperates(false);
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
    enableNumbers(true);
    enableOperates(false);
    lastNumber = [];
    notInteger = false;
    dotButton.disabled = true;
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

function updateNumber (numberButton) {

    lastNumber.push(numberButton.textContent);

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
        equalButton.disable = true;
    }

    dotButton.disabled = notInteger;

    enableOperates(true)
    updateTextDisplay();
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    lastNumber = [];
    enableOperates(false);
    enableNumbers(true);
    equalButton.disabled = true;
    dotButton.disabled = true;
    backButton.disabled = true;
    notInteger = false;
    updateTextDisplay();
}

function endOperation () {

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        updateTextDisplay();
        equalButton.disabled = true;
        dotButton.disabled = true;
        backButton.disabled = true;
        lastNumber = [];
        enableNumbers(false);
        enableOperates(false);
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
    enableOperates(true);
    enableNumbers(false);
    updateTextDisplay();
    notInteger = false;
    dotButton.disabled = true;
    backButton.disabled = true;
}

function roundNumber () {
    firstNumber = +firstNumber.toFixed(5);
}

function enableOperates (boolean) {
    if (boolean) {
        for (let i of operateButtons) {
            i.disabled = false;
        }
        if (secondNumber === '') {
            equalButton.disabled = true;
        } else {equalButton.disabled = false;}
    } else {
        for (let i of operateButtons) {
            i.disabled = true;
        }
    }
    
}

function enableNumbers (boolean) {
    if (boolean) {
        for (let i of numberButtons) {
            i.disabled = false;
        }
    } else {
        for (let i of numberButtons) {
            i.disabled = true;
        }
    }
}

function backSpace () {

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
        backButton.disabled = true;
        dotButton.disabled = true;
        equalButton.disabled = true;
        enableOperates(false);
    }
}