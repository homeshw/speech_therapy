import { configureStore } from '@reduxjs/toolkit'
import testsReducer from './reducers/testSlice'
import sessionStorageMiddleware from './middlewares/sessionStorageMiddleware'
import  resultsReducer from './reducers/userTestSlice'

export const store = configureStore({
    reducer: {
      tests: testsReducer,
      results : resultsReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sessionStorageMiddleware),
  })