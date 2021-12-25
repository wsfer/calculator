let firstNumber = '';
let secondNumber = '';
let operator = '';

const operateButtons = document.querySelectorAll('.operator');
for (let i of operateButtons) {
    i.addEventListener('click', function (e) {operate(e.target);});
} 

const numberButtons = document.querySelectorAll('.number');
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearAll);

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', endOperation);

function operate (operateButton) {

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
    updateTextDisplay();
}

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    operator = '';
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
    updateTextDisplay();
}