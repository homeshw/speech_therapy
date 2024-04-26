import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    data: {},
    userResults : [],
    userResultsStats : []

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

export const loadResults = createAsyncThunk('/results/load', async (args) => {
    const res = await axios.get(apiEndpoint + '/api/get/results/grid');

    return res.data;
});

export const loadResultsByTestId = createAsyncThunk('/results/loadById', async (id) => {
    const res = await axios.get(apiEndpoint + '/api/get/results/'+id);

    return res.data;
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

        builder.addCase(loadResults.fulfilled, (state, action) => {
            return  {
                ...state,
                loading : false,
                userResults : action.payload
            }
        })

        builder.addCase(loadResultsByTestId.fulfilled, (state, action) => {
            return  {
                ...state,
                loading : false,
                userResultsStats : action.payload
            }
        })

    }
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = testsSlice.actions

export default resultsSlice.reducer