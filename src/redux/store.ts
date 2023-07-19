import {configureStore} from "@reduxjs/toolkit";
import placeReducer from "./placeSlice";

export const store = configureStore({
    reducer: {
        globalStates: placeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
