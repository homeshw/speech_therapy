import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const TestSelector = ({ testList, propSetSelectedTestId }) => {

    const [selectedTestId, setSelectedTestId] = useState('');

    const handleTestSelectionChange = (event) => {
        setSelectedTestId(event.target.value);
        propSetSelectedTestId(event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="test-input-label">Select Test</InputLabel>
                    <Select
                        labelId="test-select-label"
                        id="test-select-label-id"
                        value={selectedTestId}
                        label="Test"
                        onChange={handleTestSelectionChange}
                    >
                        {testList.map(test => (
                            <MenuItem value={test.id}>{test.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

export default TestSelector;