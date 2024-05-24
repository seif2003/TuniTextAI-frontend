import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer, selectedCollectionReducer, menuIsOpenReducer } from './slice';

export const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        selectedCollection: selectedCollectionReducer,
        menuIsOpen: menuIsOpenReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;