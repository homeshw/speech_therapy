import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  loading: false,
  testlist: [],
  tests: [],

}

const apiEndpoint = window.config.REACT_APP_API_ENDPOINT;

export const fetchTestAll = createAsyncThunk('/tests/fetchAll', async () => {

  const response = await axios.get(apiEndpoint + '/api/get/testlist');
  return response.data;

});

export const fetchTestById = createAsyncThunk('/tests/fetchById', async (testId) => {

  const response = await axios.get(apiEndpoint + '/api/get/testarray?testid=' + testId);
  return response.data;

});



export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchTestAll.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(fetchTestAll.fulfilled, (state, action) => {
      state.loading = false;
      state.testlist = action.payload;
    })

    builder.addCase(fetchTestById.fulfilled, (state, action) => {

      console.log(action);
      state.loading = false;

      state.tests = {
        ...state.tests,
        [action.meta.arg] : action.payload
      }
      
    })
  }
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = testsSlice.actions

export default testsSlice.reducer