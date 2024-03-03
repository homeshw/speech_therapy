import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridActionsCellItem
} from '@mui/x-data-grid'


const ResultsGrid = ({ rows }) => {

    const columns = [
        {
            field: 'testName',
            headerName: 'Test Name',
            width: 150,
            editable: false,
        }, {
            field: 'attemptCount',
            headerName: 'Attempt Count',
            width: 150,
            editable: false,
        }, {
            field: 'successRate',
            headerName: 'Success Rate',
            width: 150,
            editable: false,
        }
    ];

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
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default ResultsGrid;