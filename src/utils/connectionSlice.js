import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    initialState : null,
    name : "connectionSlice",
    reducers : {
        addConnections : (state , action) => action.payload,
        removeConnections : () => null,
    }
})

export const {addConnections , removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;