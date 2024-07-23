import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import odemeReducer from './odemeSlice'

export const store = configureStore({
    reducer: {
        odeme: odemeReducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({ serializableCheck: false })
})