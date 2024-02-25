import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const AudioGrid = ({ rows }) => {
    const columns = [
        {
            field: 'word',
            headerName: 'Word',
            width: 150,
            editable: true,
        }
    ];

    // const rows = [
    //   { id:1, word: '​ක'}
    // ];

    console.log(rows)

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default AudioGrid;
