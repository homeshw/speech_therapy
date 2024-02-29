import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

const WordSelector = ({ words, onSelect }) => {
  return (
    <Box sx={{ marginTop: '20px', marginRight: '40px', border: 1, borderColor: "#bfbfbf", padding: '10px' }} className="word-selector-box">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }}>
        {words.map(word => (
          <Grid item xs={3}>
            <Button id={word.word} variant="outlined" key={word.word} onClick={() => onSelect(word.word)}>
              {word.word}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WordSelector;
