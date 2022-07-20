import './App.css';
import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const changeColor = () => {
    setButtonColor(newButtonColor);
  };

  const toggleDisableButton = () => {
    setIsButtonDisabled(!isButtonDisabled);
  };

  return (
    <div>
      <button
        disabled={isButtonDisabled}
        onClick={changeColor}
        style={{ color: 'white', backgroundColor: isButtonDisabled ? 'gray' : buttonColor }}
      >
        Change to {newButtonColor}
      </button>

      <label>
        <input type="checkbox" onClick={toggleDisableButton} aria-checked={isButtonDisabled} />
        Disable button
      </label>
    </div>

  );
}

export default App;
