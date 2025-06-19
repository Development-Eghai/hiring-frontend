import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commonReducer from 'Views/Common/Slices/Common_slice';
import hiringmanagerReducer from 'Views/Hiring_manager/Slices/HiringManagerSlice';

const reducers = combineReducers({
    commonState: commonReducer,
    hiringManagerState: hiringmanagerReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export default store;