import { createSlice } from "@reduxjs/toolkit";


interface FilterState {
    page: number;
    limit: number;
    random: number;
}

const initialState: FilterState = {
    page: 0,
    limit: 9,
    random: 0,
}

const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        restPage(state) {
            state.page = 0;
        },
        incrementPage(state) {
            if(state.page === 0) {
                state.page = 2;
            } else {
            state.page = state.page + 1;
            }
        },
        incrementRandom (state) {
            state.random = state.random + 1;
        }
    }
})

export default FilterSlice.reducer;

export const {incrementPage, restPage, incrementRandom} = FilterSlice.actions;