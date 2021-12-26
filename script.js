let firstNumber = '';
let secondNumber = '';
let operator = '';

const operateButtons = document.querySelectorAll('.operator');

const numberButtons = document.querySelectorAll('.number');
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearAll);

const equalButton = document.querySelector('#equal');

function operate (operateButton) {

    equalButton.removeEventListener('click', endOperation);

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
        equalButton.addEventListener('click', endOperation);
    }

    updateTextDisplay();
    for (let i of operateButtons) {
        i.addEventListener('click', function (e) {operate(e.target);});
    }
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    updateTextDisplay();
}

function endOperation () {

    if (secondNumber === '0') {
        firstNumber = 'Error';
        secondNumber = '';
        operator = '';
        updateTextDisplay();
        return;
    }

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
    updateTextDisplay();
}

function roundNumber () {
    firstNumber = +firstNumber.toFixed(5);
}