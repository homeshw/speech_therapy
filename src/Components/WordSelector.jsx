import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

const WordSelector = ({ words, onSelect }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-evenly' }}>
      {words && words.map((word) => {
        return (
          <button className="button-choice" onClick={()=> onSelect(word)}>
            {word}
          </button>
        )
      })}
    </div>
  );
};

export default WordSelector;
