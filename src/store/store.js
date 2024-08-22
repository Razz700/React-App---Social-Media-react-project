import { configureStore } from "@reduxjs/toolkit";
import DataSliceReducer from "../state/DataSlice";

export default configureStore({
    reducer:{
        postsData:DataSliceReducer
    }
})