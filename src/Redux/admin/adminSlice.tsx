import { createSlice } from "@reduxjs/toolkit";
import ownerSlice from "../owner/ownerSlice";

const   INITIAL_STATE ={
    username : "",
}


const adminSlice = createSlice({
    name : "admin",
    initialState : INITIAL_STATE,
    reducers:{
        adminLogged : (state ,action)=>{
            state.username
        }
    }
})
export const {adminLogged} = adminSlice.actions
export default adminSlice.reducer