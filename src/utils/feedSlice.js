import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    initialState : null,
    name : "FeedSlice",
    reducers : {
        addFeed : (state , action) => action.payload,
        removeUserFromFeed : (state , action) => {
            const newFeed = state.filter((user) =>user._id !== action.payload );
            return newFeed;
        } 
    }
})

export const {addFeed , removeUserFromFeed} = feedSlice.actions; 
export default feedSlice.reducer;