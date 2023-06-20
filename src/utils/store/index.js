import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer, homeReducer, carsReducer } from './slices/Slices';
import { postsReducer } from './slices/PostsSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        home: homeReducer,
        cars: carsReducer,
        posts: postsReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools: true
});
// setupListeners(store.dispatch);

export * from '../apis/apiSlice';

