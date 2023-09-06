import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE ={
    ownername : "",
    ownerEmail : "",
    ownerId : " ",
    stadiumId : ""
}


const ownerSlice = createSlice({
    name : " owner",
    initialState : INITIAL_STATE,
    reducers : {
        ownerLogged : (state , action)=>{
            state.ownername = action.payload.ownername
            state.ownerEmail = action.payload.email
            state.ownerId = action.payload.ownerId
            state.stadiumId = action.payload.stadiumId  
        }
    }
})

export const {ownerLogged} = ownerSlice.actions
export default ownerSlice.reducer