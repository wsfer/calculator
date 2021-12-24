let firstNumber = '';
let secondNumber = '';
let operator = '';

function operate (a, b, operate) {
    switch (operate) {
        case '+':
            return add (a, b);
            break;
        case '-':
            return subtract (a, b);
            break;
        case '*':
            return multiply (a, b);
            break;
        case '/':
            return divide (a, b);
            break;
    }
}

function updateTextDisplay () {
    document.querySelector('.display').textContent = firstNumber + operator + secondNumber;
}

function updateNumber (button) {
    firstNumber = button.textContent;
    updateTextDisplay();
}

const numberButtons = document.querySelectorAll('.numbers > button');
for (let i of numberButtons) {
    i.addEventListener('click', function (e) {updateNumber(e.target);});
}

