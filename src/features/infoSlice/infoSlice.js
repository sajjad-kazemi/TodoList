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

// ? a todo sample:
// todo: {text:string,id:number,color:string,done:boolean}

const initialState = {
  todoList:[]
}

const InfoSlice = createSlice({
  name:'info',
  initialState,
  reducers:{
    addTodo:(state,{payload})=>{
      return {...state,todoList:{...state.todoList,payload}}
    }
  },
  extraReducers:{
    [getTodoList.fulfilled]:(state,{payload})=>{
      return {todoList: payload}
    }
  }
})

export const {addTodo} = InfoSlice.actions

export default InfoSlice.reducer