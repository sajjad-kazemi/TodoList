import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const welcomeList = [
  {
    text:'Welcome to your Todo List',
    color:'colorList.1',
    id:1,
    done:false
  },
  {
    text:'This Todo list was made by sajjad-kazemi with ❤',
    color:'colorList.1',
    id:2,
    done:false
  },
  {
    text:'You have many options here such as custom colors and dark mode.',
    color:'colorList.2',
    id:3,
    done:false
  },
  {
    text:'You can also change language to persian "فارسی" if you want!',
    color:'colorList.3',
    id:4,
    done:false
  },
  {
    text:'And use the handle right before the checkbox to drag and drop the items',
    color:'colorList.4',
    id:5,
    done:false
  },
  {
    text:'Also checkout my github page (github.com/sajjad-kazemi) the link is in bottom right of the page',
    color:'colorList.5',
    id:6,
    done:false
  }

]

export const fetchTodoList = createAsyncThunk(
  'info/fetchTodoList',
  ()=>{
    const TodoList = JSON.parse(localStorage.getItem('todoList'));
    if(TodoList === null) {
      localStorage.setItem('todoList',JSON.stringify(welcomeList));
      return welcomeList
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
      const todo = {
        text:payload.text,
        color:payload.color,
        id:new Date().getTime(),
        done:false
      }
      state.todoList.unshift(todo)
    },
    deleteTodo:(state,{payload})=>{
      state.todoList = state.todoList.filter(todo => todo.id !== payload)
    },
    doneTodo:(state,{payload})=>{
      const todoList = [...state.todoList]
      todoList.forEach(todo=>{
        if(todo.id !== +payload) return
        todo.done = !todo.done
      })
      state.todoList = todoList
    },
    changeOrder:(state,{payload})=>{
      state.todoList = payload
    },
    changeColor:(state,{payload})=>{
      const {id,color} = payload
      const todoList = [...state.todoList]
      todoList.forEach(todo=>{
        if(todo.id !== id) return
        todo.color = color
      })
      state.todoList = todoList
    },
    doneAll:(state)=>{
      const todoList = [...state.todoList]
      todoList.forEach(todo=>{
        todo.done = true
      })
      state.todoList = todoList
    },
    undoneAll:(state)=>{
      const todoList = [...state.todoList]
      todoList.forEach(todo=>{
        todo.done = false
      })
      state.todoList = todoList
    },
    deleteAll:(state)=>{
      state.todoList = []
    },
    clearHistory:(state)=>{
      state.todoList = state.todoList.filter(todo=> !todo.done)
    },
    localStorageUpdate:(state)=>{
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }
  },
  extraReducers:{
    [fetchTodoList.fulfilled]:(state,{payload})=>{
      return {...state,todoList: payload}
    }
  }
})

export const {addTodo,deleteTodo,changeOrder,deleteAll,clearHistory,localStorageUpdate,doneAll,doneTodo,changeColor,undoneAll} = InfoSlice.actions
export const getTodoList = (store) => store.info.todoList
export const getFirstTodo = (store) => store.info.todoList[0] || false
export default InfoSlice.reducer