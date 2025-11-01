import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/AuthSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import commonReducer from './slice/CommonSlice';
import logger from 'redux-logger'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;