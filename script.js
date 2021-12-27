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
    lastNumber.push('-');
    minusButton.removeEventListener('click', startNegative);
    minusButton.disabled = true;
    operator = '';
    backButton.disabled = false;
    updateTextDisplay();
}

function updateOperation (operateButton) {

    disableButtons(true, true, true, false, true);

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        lastNumber = [];
        disableButtons(true, true, true, true, true);
        updateTextDisplay();
        return;
    }

    if (secondNumber !== '') {
        operate();
    }

    secondNumber = '';
    operator = operateButton.textContent;
    lastNumber = [];
    notInteger = false;
    disableButtons(true, true, true, false, true);
    updateTextDisplay();
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
            i.addEventListener('click', (e) => updateOperation(e.target));
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
        lastNumber = [];
        disableButtons(true, true, true, true, true);
        updateTextDisplay();
        return;
    }

    operate();

    secondNumber = '';
    operator = '';
    lastNumber = [];
    notInteger = false;
    disableButtons (true, true, true, true, false);
    updateTextDisplay();
}

function backSpace () {
    if (lastNumber[lastNumber.length-1] === '.') {
        dotButton.disabled = false;
        notInteger = false;
    }

    let targetNumber = '';
    lastNumber.pop();
    for (let i of lastNumber) {targetNumber += i;}

    (secondNumber) ? secondNumber = targetNumber : firstNumber = targetNumber;

    updateTextDisplay();

    if (lastNumber.length === 0 && targetNumber === firstNumber) {
        disableButtons(true, true, true, false, true);
        minusButton.addEventListener('click', startNegative);
        minusButton.disabled = false;
    } else if (lastNumber.length === 0) {
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

function operate () {
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
    firstNumber = +firstNumber.toFixed(7);
}

//keyboard support.
document.addEventListener('keyup', (e) => pressKey(e.key));
const zeroButton = document.querySelector('#zero');
const plusButton = document.querySelector('#plus');

function pressKey (keyPressed) {
    switch (keyPressed) {
        case 'Backspace':
            if (backButton.disabled === false) {
                backSpace();
            }
            break;
        case 'Escape':
            clearAll();
            break;
        case '1': case '2': case '3':
        case '4': case '5': case '6':
        case '7': case '8': case '9':
        case '0': case '.':
            if (zeroButton.disabled === false) {
                updateNumberForKeyboard(`${keyPressed}`);
            }
            break;
        case '+': case '/': case '*':
            if (plusButton.disabled === false) {
                updateOperationForKeyboard(`${keyPressed}`);
                break;
            }
            break;
        case '-':
            if (firstNumber === '') {
                startNegative();
                break;
            } else if (minusButton.disabled === false) {
                updateOperationForKeyboard(`${keyPressed}`);
            }
            break;
        case '=':
            if (equalButton.disabled === false) {
                endOperation();
            }
            break;
    }
}

function updateNumberForKeyboard (keyNumber) {

    lastNumber.push(keyNumber);
    let disableEqual = true;

    if (keyNumber === '.') {
        notInteger = true;
    }

    if (operator === '') {
        firstNumber += keyNumber;
        minusButton.removeEventListener('click', startNegative);
        for (let i of operateButtons) {
            i.addEventListener('click', (e) => updateOperation(e.target));
        }
    } else {
        secondNumber += keyNumber;
    }

    if (secondNumber !== '') {
        disableEqual = false;
    }

    updateTextDisplay();
    disableButtons(notInteger, disableEqual, false, false, false);
}

function updateOperationForKeyboard (operateKey) {

    disableButtons(true, true, true, false, true);

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        lastNumber = [];
        disableButtons(true, true, true, true, true);
        updateTextDisplay();
        return;
    }

    if (secondNumber !== '') {
        operate();
    }

    secondNumber = '';
    operator = operateKey;
    lastNumber = [];
    notInteger = false;
    disableButtons(true, true, true, false, true);
    updateTextDisplay();
}