import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

type PaginationModel = {
    page: number,
    pageSize: number
};

type TabelaOrdensProps<T> = {
    serviceOrder: T[];
    columns: GridColDef[];
    paginationModel: PaginationModel;
    checkboxSelection?: boolean;
    onRowSelectionModelChange?: (newSelectionModel: GridRowSelectionModel) => void; 
}


export default function TableOrder<T>({ columns, serviceOrder, paginationModel, checkboxSelection = true, onRowSelectionModelChange }: TabelaOrdensProps<T>) {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <DataGrid
                checkboxSelection={checkboxSelection}
                rows={serviceOrder}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20]}
                sx={{ border: 0 }}
                onRowSelectionModelChange={onRowSelectionModelChange}
            />
        </Box>
    );
}



