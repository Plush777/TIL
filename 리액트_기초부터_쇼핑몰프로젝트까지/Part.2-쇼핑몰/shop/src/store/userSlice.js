import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: { name : 'kim', age : 10 },
    reducers: {
        changeName(state, action) {
            state.name = action.payload;
        },
        changeAge(state, action) {
            state.age += action.payload;
        }
    }
});

export default user