import { createSlice } from "@reduxjs/toolkit"

interface initialState {
    modalState: boolean,
    modalHeader: boolean,
}

const initialState: initialState = {
    modalState: false,
    modalHeader: false,
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModalHeader(state) {
            state.modalState = true;
            state.modalHeader = true;
        },
        closeModalHeader(state) {
            state.modalState = false;
            state.modalHeader = false;
        },
    }
})

export const {openModalHeader, closeModalHeader} = ModalSlice.actions;

export default ModalSlice.reducer;