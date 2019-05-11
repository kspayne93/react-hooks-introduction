import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = (props) => {
  //useState returns  an array that always contains exactly two things: 1) Current state, 2) Function to update state
  const [selectedCharacter, setSelectedCharacter] = useState(1)
  const [chosenSide, setChosenSide] = useState('light');
  const [destroyed, setDestroyed] = useState(false)

  const sideHandler = side => {
    setChosenSide(side);
  }; 

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

    let content = (
      <>
        <CharPicker
          side={chosenSide}
          selectedChar={selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedCharacter} />
        <button onClick={sideHandler.bind(null, 'light')}>Light Side</button>
        <button onClick={sideHandler.bind(null, 'dark')}>Dark Side</button>
        {chosenSide === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }

    return content;
  }

export default App;
