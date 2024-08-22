import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchData=createAsyncThunk('fetchUserdata',
    async (url)=>{
    const response=await fetch(url);
    const data=await response.json();
    return data;
});

export const DataSlice=createSlice({
    name:'Data',
    initialState:{
loading:false,
postArray:[],
error:null,
currentPageHome:true
    },
    reducers:{
navigateOtherPage:(state)=>{
state.currentPageHome=false;
},
navigateHomePage:(state)=>{
    state.currentPageHome=true;
}
    },
    extraReducers:(builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.postArray = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});
export const {navigateHomePage,navigateOtherPage}=DataSlice.actions;
export default DataSlice.reducer;