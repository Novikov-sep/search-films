import { configureStore } from "@reduxjs/toolkit";
import films from './films/slice'
import filter from './filter/slice'
import modal from './modal/slice'
import users from './users/slice'

export const store = configureStore({
    reducer: {
        films,
        filter,
        modal,
        users
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch