import React, { useState } from 'react';
import "../Components/calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState('0');        // current number or result
  const [expression, setExpression] = useState('');  // full equation while typing
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // number input
  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setExpression(prev => prev + String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
      setExpression(prev => prev === '' ? String(num) : prev + String(num));
    }
  };

  // decimal input
  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setExpression(prev => prev + '0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(prev => prev + '.');
    }
  };

  // clear
  const clear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  // operator
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForNewValue) {
      const newValue = calculate(previousValue, inputValue, operation);
      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setExpression(prev => prev + ' ' + nextOperation + ' ');
    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  // calculate
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  // equals
  const handleEquals = () => {
    if (!operation) return;
    const lastNumber = parseFloat(display);
    const result = calculate(previousValue, lastNumber, operation);

    setDisplay(String(result)); // show result
    setExpression('');          // hide equation
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  // percentage
  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const result = currentValue / 100;
    setDisplay(String(result));
    setExpression('');
  };

  // plus/minus
  const handlePlusMinus = () => {
    const result = parseFloat(display) * -1;
    setDisplay(String(result));
    setExpression('');
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{expression || display}</div>
      </div>

      <div className="calculator-buttons">
        <div className="button-row">
          <button className="btn btn-clear" onClick={clear}>C</button>
          <button className="btn btn-clear" onClick={handlePlusMinus}>±</button>
          <button className="btn btn-clear" onClick={handlePercentage}>%</button>
          <button className="btn btn-operator" onClick={() => performOperation('/')}>/</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(7)}>7</button>
          <button className="btn btn-number" onClick={() => inputNumber(8)}>8</button>
          <button className="btn btn-number" onClick={() => inputNumber(9)}>9</button>
          <button className="btn btn-operator" onClick={() => performOperation('*')}>*</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(4)}>4</button>
          <button className="btn btn-number" onClick={() => inputNumber(5)}>5</button>
          <button className="btn btn-number" onClick={() => inputNumber(6)}>6</button>
          <button className="btn btn-operator" onClick={() => performOperation('-')}>-</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(1)}>1</button>
          <button className="btn btn-number" onClick={() => inputNumber(2)}>2</button>
          <button className="btn btn-number" onClick={() => inputNumber(3)}>3</button>
          <button className="btn btn-operator" onClick={() => performOperation('+')}>+</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number btn-zero" onClick={() => inputNumber(0)}>0</button>
          <button className="btn btn-number" onClick={inputDecimal}>.</button>
          <button className="btn btn-operator" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
