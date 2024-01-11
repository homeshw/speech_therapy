import Button from '@mui/material/Button';
import * as React from 'react';

const WordSelector = ({ words, onSelect }) => {
    return (
      <div>
        {words.map(word => (
          <Button variant="contained" key={word} onClick={() => onSelect(word)}>
            {word}
          </Button>
        ))}
      </div>
    );
  };

  export default WordSelector;
  