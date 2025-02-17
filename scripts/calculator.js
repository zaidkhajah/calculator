"use strict";

const screen = document.querySelector("#screen");
const numberBtns = document.querySelector("#numbers");
const operationBtns = document.querySelector("#operations");
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");


screen.value = "";
let result = undefined;

addClearButtonListener();
addEqualButtonListener();
addNumButtonListeners();
addOperationButtonListeners();

function addNumButtonListeners() {
    numberBtns.addEventListener("click", event => {
        if ((result || result === 0) && String(result) === screen.value) {
            result = undefined;
            screen.value = "";
        }
        screen.value += event.target.closest("button").textContent;
    });
}

function addOperationButtonListeners() {
    operationBtns.addEventListener("click", event => {
        if (screen.value.includes("+") || screen.value.includes("-") || screen.value.includes("X") || screen.value.includes("-") || screen.value.includes("÷")) {
            let [num1, operation, num2] = screen.value.split(" ");
            result = operate(multPiE(num1), multPiE(num2), operation);
            screen.value = result;
        }
        screen.value += (" " + event.target.closest("button").textContent + " ");
    })
}

function addEqualButtonListener() {
    equalBtn.addEventListener("click", () => {
        let inputs = screen.value.split(" ").reverse();
        let num1, num2, operation;
        while (inputs.length > 2) {
            num1 = multPiE(inputs.pop());
            operation = inputs.pop();
            num2 = multPiE(inputs.pop());
            inputs.push(operate(num1, num2, operation));
        }
        result = inputs[0];
        screen.value = result;
    });
}

function addClearButtonListener() {
    clearBtn.addEventListener("click", () => {
        result = undefined;
        screen.value = "";
    })
}






























function multPiE(num) {
    if (num.includes("πe")) {
        let a = num.split("πe")[0];
        return Number(a ? a : 1) * Math.PI * Math.E;
    }

    if (num.includes("eπ")) {
        let a = num.split("eπ")[0];
        return Number(a ? a : 1) * Math.PI * Math.E;
    }

    if (num.includes("π")) {
        let a = num.split("π")[0];
        return Number(a ? a : 1) * Math.PI;
    }

    if (num.includes("e")) {
        let a = num.split("e")[0];
        return Number(a ? a : 1) * Math.E;
    }
    return Number(num);
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

function operate(a, b, operation) {
    switch (operation) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
        case "X":
            return multiply(a, b);
        case "/":
        case "÷":
            return divide(a, b);
    }
}

