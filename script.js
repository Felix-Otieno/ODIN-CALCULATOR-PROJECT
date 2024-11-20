// Basic operation functions
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
    if (b === 0) {
      return "Error: Division by 0!";
    }
    return a / b;
  }
  
  // Operate function
  function operate(operator, num1, num2) {
    if (operator === "+") {
      return add(num1, num2);
    } else if (operator === "-") {
      return subtract(num1, num2);
    } else if (operator === "*") {
      return multiply(num1, num2);
    } else if (operator === "/") {
      return divide(num1, num2);
    }
  }
  
  let currentInput = '0';  // Tracks current input displayed
  let firstNum = null;
  let secondNum = null;
  let currentOperator = null;
  
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('button');
  const clearButton = document.querySelector('.clear');
  const equalsButton = document.querySelector('.equals');
  const decimalButton = document.querySelector('.decimal');
  
  // Handle button clicks
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
  
  function handleButtonClick(event) {
    const buttonText = event.target.innerText;
  
    if (buttonText >= '0' && buttonText <= '9') {
      // Handle number input
      if (currentInput === '0') {
        currentInput = buttonText;
      } else {
        currentInput += buttonText;
      }
      updateDisplay();
    } else if (buttonText === '.') {
      // Handle decimal input
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
      }
    } else if (buttonText === 'C') {
      // Handle clear
      currentInput = '0';
      firstNum = null;
      secondNum = null;
      currentOperator = null;
      updateDisplay();
    } else if (buttonText === '=') {
      // Handle equal button (calculate result)
      secondNum = parseFloat(currentInput);
      if (firstNum !== null && currentOperator !== null) {
        currentInput = operate(currentOperator, firstNum, secondNum).toString();
        firstNum = null;
        secondNum = null;
        currentOperator = null;
        updateDisplay();
      }
    } else {
      // Handle operator buttons
      if (firstNum === null) {
        firstNum = parseFloat(currentInput);
      } else if (currentOperator) {
        secondNum = parseFloat(currentInput);
        firstNum = operate(currentOperator, firstNum, secondNum);
      }
      currentOperator = buttonText;
      currentInput = '0'; // Reset current input for the next number
    }
  }
  
  // Update the display with current input
  function updateDisplay() {
    display.innerText = currentInput;
  }
  
  // Keyboard support (optional)
  document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
      handleButtonClick({ target: { innerText: event.key } });
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      handleButtonClick({ target: { innerText: event.key } });
    } else if (event.key === 'Enter') {
      handleButtonClick({ target: { innerText: '=' } });
    } else if (event.key === 'Backspace') {
      // Implement backspace logic here if needed
    }
  });
  