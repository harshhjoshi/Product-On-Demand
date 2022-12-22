import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from'../Redux/MyProductSlice'
import MyCartReducer from'../Redux/MyCartSlice'
export const mystore=configureStore({
    reducer:{
    product:MyProductReducer,
    cart:MyCartReducer
    }
})