import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridActionsCellItem
} from '@mui/x-data-grid'


const AudioGrid = ({ rows, onRowSelect, onRowDelete }) => {

    const columns = [
        {
            field: 'word',
            headerName: 'Word',
            width: 150,
            editable: true,
        }, {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={onRowDelete(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ];

    const handleRowSelection = (e) => {
        onRowSelect(e);
    };

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
