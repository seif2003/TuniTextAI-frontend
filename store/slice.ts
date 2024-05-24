import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Collection = {
    id: number;
    title: string;
    creationDate: string | null;
    texts: {
        id: number;
        title: string;
        body: string;
        operation: string;
        result: string;
    }[];
};
type Text = {
    id: number;
    title: string;
    body: string;
    operation: string;
    result: string;
}

export interface CollectionsState {
    collections: Collection[],
}

export interface SelectedCollectionState {
    selectedCollection: Collection | null
}

export interface MenuIsOpenState {
    menuIsOpen: boolean
}

const initialCollectionsState: CollectionsState = {
    collections: [],
}

const initialSelectedCollectionState: SelectedCollectionState = {
    selectedCollection: null,
}

const initialMenuIsOpenState: MenuIsOpenState = {
    menuIsOpen: true
}



export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: initialCollectionsState,
  reducers: {
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.collections.push(action.payload)
    },
    removeCollection: (state, action: PayloadAction<number>) => {
      state.collections = state.collections.filter(collection => collection.id !== action.payload)
    },
    setCollections: (state, action: PayloadAction<Collection[]>) => {
        state.collections = action.payload;
    },
        
  },
})

export const selectCollectionsSlice = createSlice({
    name: 'selectedCollection',
    initialState: initialSelectedCollectionState,
    reducers: {
        selectCollection: (state, action: PayloadAction<Collection | null>) => {
            state.selectedCollection = action.payload;
        }
    }
})

export const menuIsOpenSlice = createSlice({
    name: 'menuIsOpen',
    initialState: initialMenuIsOpenState,
    reducers: {
        toggleMenu: (state) => {
            state.menuIsOpen = !state.menuIsOpen;
        }
    }
})

// Action creators are generated for each case reducer function
export const { addCollection, removeCollection, setCollections } = collectionsSlice.actions
export const { selectCollection } = selectCollectionsSlice.actions
export const { toggleMenu } = menuIsOpenSlice.actions

export const collectionsReducer = collectionsSlice.reducer
export const selectedCollectionReducer = selectCollectionsSlice.reducer
export const menuIsOpenReducer = menuIsOpenSlice.reducer
