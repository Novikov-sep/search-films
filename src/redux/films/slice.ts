import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    KinopoiskDev,
    Filter,
    MovieFields,
} from "@openmoviedb/kinopoiskdev_client";

const kp = new KinopoiskDev("ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5");

export const fetchFilms = createAsyncThunk<any>(
    "films/fetchFilmsStatus",
    async () => {
        const query: Filter<MovieFields> = {
            selectFields: [
                "id",
                "description",
                "shortDescription",
                "movieLength",
                "ageRating",
                "name",
                "rating",
                "poster",
                "year",
                "rating",
            ],
            page: 1,
            limit: 9,
        };

        try {
            const { data, error, message } = await kp.movie.getByFilters(query);

            if (data) {
                return data.docs;
            } else if(error) {
                return [];
            }
        } catch (error) {
            if (error) {
                return error;
            }
        }
    }
);

export interface Film {
    ageRating: number;
    description: string;
    id: number;
    movieLength: number;
    name: string;
    poster: {
        previewUrl: string;
        url: string;
    };
    rating: {
        await: null;
        filmCritics: number;
        imbd: number;
        kp: number;
        russianFilmCritics: number;
    };
    shortDescription: string;
    year: number;
}

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface FilmSliceState {
    items: Film[];
    status: Status;
}

const initialState: FilmSliceState = {
    items: [],
    status: Status.LOADING,
};

const filmsSlice = createSlice({
    name: "films",
    initialState,
    reducers: {
        addItems(state, action) {
            state.items = [...state.items, ...action.payload];
        },
        restItems(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilms.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(
            fetchFilms.fulfilled,
            (state, action: PayloadAction<Film[]>) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            }
        );
        builder.addCase(fetchFilms.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const { addItems, restItems } = filmsSlice.actions;

export default filmsSlice.reducer;
