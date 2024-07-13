let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.id));
});

function handleButtonClick(buttonId) {
    if (buttonId === 'clear') {
        clear();
    } else if (buttonId === 'backspace') {
        backspace();
    } else if (buttonId === 'equals') {
        evaluate();
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(buttonId)) {
        setOperation(buttonId);
    } else {
        appendNumber(buttonId);
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    display.textContent = '0';
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1) || '0';
    if (currentOperator === null) {
        firstNumber = display.textContent;
    } else {
        secondNumber = display.textContent;
    }
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === 'divide' && display.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondNumber = display.textContent;
    display.textContent = roundResult(
        operate(parseFloat(firstNumber), parseFloat(secondNumber), currentOperator)
    );
    firstNumber = display.textContent;
    currentOperator = null;
    shouldResetScreen = true;
}

function setOperation(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function appendNumber(buttonId) {
    const value = getButtonValue(buttonId);
    if (display.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    display.textContent += value;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function getButtonValue(buttonId) {
    const buttonMap = {
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        decimal: '.',
    };
    return buttonMap[buttonId];
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(number1, number2, operator) {
    switch (operator) {
        case 'add':
            return add(number1, number2);
        case 'subtract':
            return subtract(number1, number2);
        case 'multiply':
            return multiply(number1, number2);
        case 'divide':
            return divide(number1, number2);
        default:
            return null;
    }
}