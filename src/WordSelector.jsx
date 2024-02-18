import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

const WordSelector = ({ words, onSelect }) => {
  return (
    <Box sx={{ width: '50%', textAlign: 'center' }} className="word-selector-box">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }}>
        {words.map(word => (
          <Grid item xs={3}>
            <Button id={word.word} key={word.word} onClick={() => onSelect(word.word)}>
              {word.word}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WordSelector;
