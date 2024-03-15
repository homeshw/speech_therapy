import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    data: {}

}

const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

export const saveResults = createAsyncThunk('/results/save', async (args) => {

    const TestBody = args;
    return await axios.post(apiEndpoint + '/api/upload/testresult', TestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

});

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(saveResults.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(saveResults.fulfilled, (state, action) => {
            return  {
                ...state,
                loading : false,
                data : action.meta.arg
            }
        })

    }
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = testsSlice.actions

export default resultsSlice.reducer