import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const AudioGrid = ({ rows, onRowSelect }) => {

    const [selectedRows, setSelectedRows] = React.useState([]);
    
    const columns = [
        {
            field: 'word',
            headerName: 'Word',
            width: 150,
            editable: true,
        }
    ];

    const handleRowSelection = (e) => {
        // Retrieve the indexes of selected rows
        console.log(e);
    
        // Update the state with the selected rows
        setSelectedRows(e);
        console.log(e);
        onRowSelect(e);
      };

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
                onRowSelectionModelChange={handleRowSelection}
            />
        </Box>
    );
}

export default AudioGrid;
