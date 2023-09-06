import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import  storage  from "redux-persist/lib/storage";

import userReduser from  './user/userSlice'
import ownerReduser from './owner/ownerSlice'



const persistConfig ={
    key : "root",
    storage
}

const persistUserReduser = persistReducer(persistConfig,userReduser)
const persistOwnerReduser = persistReducer(persistConfig,ownerReduser) 


export  const store = configureStore({
    reducer : {
        user : persistUserReduser,
        owner : persistOwnerReduser,
    }
})



export const persistor =persistStore(store)