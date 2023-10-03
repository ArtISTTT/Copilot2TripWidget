import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IUserState = {
    data: {} | undefined;
};

const initialState: IUserState = {
    data: undefined,
};

export const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<{}>) => {
            state.data = action.payload;
        },
    },
});

export const { setAppData } = appSlice.actions;

export default appSlice.reducer;
