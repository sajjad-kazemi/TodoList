import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoList = createAsyncThunk(
  'info/getTodoList',
  ()=>{
    const TodoList = JSON.parse(localStorage.getItem('todoList'));
    if(!TodoList) {
      localStorage.setItem('todoList','[]');
      return []
    }
    return TodoList
  }
)

const initialState = {
  todoList:[]
}

const InfoSlice = createSlice({
  name:'info',
  initialState,
  extraReducers:{
    [getTodoList.fulfilled]:(state,{payload})=>{
      return {todoList: payload}
    }
  }
})

export default InfoSlice.reducer