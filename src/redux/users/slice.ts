import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface initialState {
    isAuth: boolean,
    users: {
        login: string,
        password: string,
        favorites: {
            id: number,
            title: string,
            image: string,
        }[] | []}[] | [],
    currentUser: {
        login: string | null,
        password: string | null,
        favorites: {
            id: number,
            title: string,
            image: string,
        }[] | []
    },
}

const initialState: initialState = {
    isAuth: false,
    users: [],
    currentUser: {
        login: null,
        password: null,
        favorites: [],
    }
}


const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            if(state.users.length > 0) {
                const result = state.users.findIndex((item: any, id: number) => {
                    return item.login === action.payload.login && item.password === action.payload.password;
                })
                if(result === -1) {
                    state.isAuth = true;
                    state.users = [...state.users, action.payload];
                    state.currentUser.login = action.payload.login;
                    state.currentUser.password = action.payload.password;
                } else {
                    alert('Пользователь с таким логином и паролем уже зарегистрирован');
                }
        } else {
                state.isAuth = true;
                state.users = [...state.users, action.payload];
                state.currentUser.login = action.payload.login;
                state.currentUser.password = action.payload.password;
        }
        },
        logIn(state: any, action) {
            if(state.users.length > 0) {
                const result = state.users.findIndex((item: any, id:number) => {
                    return item.login === action.payload.login && item.password === action.payload.password
                })
                if(result === -1) {
                    alert('Такого пользователя не существует');
                } else {
                    state.isAuth = true;
                    state.currentUser.login = action.payload.login;
                    state.currentUser.password = action.payload.password;
                    state.currentUser.favorites = state.users[result].favorites;
                }
        } else {
                alert('Такого пользователя не существует');
            }
        },
        logOut(state) {
            state.isAuth = false;
            state.currentUser.login = null;
            state.currentUser.password = null;
            state.currentUser.favorites = [];
        },
        addFavorite(state: any, action) {
            if(state.currentUser.favorites.length > 0) {
                const result = state.currentUser.favorites.findIndex((item: any, id: number) => {
                    return item.id === action.payload.id;
                })
                if(result === -1) {
                    state.currentUser.favorites = [...state.currentUser.favorites, action.payload];
                    const result = state.users.findIndex((item: any, id:number) => {
                        return item.login === state.currentUser.login && item.password === state.currentUser.password;
                    })
                    state.users[result].favorites = state.currentUser.favorites
                } else {
                    state.currentUser.favorites.splice(result, 1)
                    const result2 = state.users.findIndex((item: any, id:number) => {
                        return item.login === state.currentUser.login && item.password === state.currentUser.password;
                    })
                    state.users[result2].favorites = state.currentUser.favorites
                }
            } else {
                state.currentUser.favorites = [action.payload];
                const result = state.users.findIndex((item: any, id:number) => {
                    return item.login === state.currentUser.login && item.password === state.currentUser.password;
                })
                state.users[result].favorites = state.currentUser.favorites
            }
        }
    }
})

export const {addUser, logIn, logOut, addFavorite} = UserSlice.actions;

export default UserSlice.reducer;