let firstNumber = '';
let secondNumber = '';
let operator = '';

const operateButtons = document.querySelectorAll('.operator');
for (let i of operateButtons) {
    i.addEventListener('click', function (e) {operate(e.target);});
} 

const numberButtons = document.querySelectorAll('.numbers > button');
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

function operate (operateButton) {

    if (secondNumber !== '') {
        switch (operator) {
            case '+':
                firstNumber = Number(firstNumber) + Number(secondNumber);
                secondNumber = '';
                updateTextDisplay();
                break;
            case '-':
                firstNumber = Number(firstNumber) - Number(secondNumber);
                secondNumber = '';
                operator = '';
                updateTextDisplay();
                break;
            case '*':
                firstNumber = Number(firstNumber) * Number(secondNumber);
                secondNumber = '';
                operator = '';
                updateTextDisplay();
            case '/':
                firstNumber = Number(firstNumber) * Number(secondNumber);
                secondNumber = '';
                operator = '';
                break;
        }
    }
    operator = operateButton.textContent;
    updateTextDisplay();
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = firstNumber + operator + secondNumber;
}

function updateNumber (numberButton) {
    if (operator === '') {
        firstNumber += numberButton.textContent;
    } else {
        secondNumber += numberButton.textContent;
    }
    updateTextDisplay();
}

