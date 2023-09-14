import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE ={
    username : "",
    email  : "",
    userId : ""

}

const userSlice = createSlice({
    name : "user",
    initialState : INITIAL_STATE,
    reducers:{
     userLogged : (state ,action)=>{
        state.username = action.payload.username
        state.email = action.payload.email
        state.userId = action.payload.userId 
     },
    }
})

export const {userLogged} = userSlice.actions
// export const  {userLogout} = userSlice.actions
export default userSlice.reducer