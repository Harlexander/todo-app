import { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todos } from './models/Todos';
import TodoItem from './components/TodoItem';

export type Actions = 
{ type: "done", id: number } | { type : "remove", id : number} | { type : "add", todo : string} | { type : "edit", todo : string, id : number}

const reducer = (todos:Todos[], action:Actions) => {  
  switch (action.type) {
    case "done":
      return todos.map((todo) => todo.id === action.id ? ({...todo, isDone : !todo.isDone}) : todo);

    case "remove": 
      return todos.filter((todo) => action.id !== todo.id);

    case "add":
      return [...todos, {id : Date.now(), todo : action.todo, isDone : false}]

    case "edit":
      return todos.map(({id, todo, isDone}) => id === action.id ? {todo : action.todo, id, isDone} : {id, todo, isDone})
    default:
      return todos
  }
}

const App: React.FC = () =>  {
  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(reducer, []);

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault();

    if(todo){
      dispatch({ type : "add", todo : todo});
    }
  }

  return (
    <div className="App bg-blue-500 min-h-screen space-y-4">
      <h1 className='text-4xl  '>Taskify</h1>

      <div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      </div>

      <div className='space-y-4 px-10'>
        {
          todos.map((todo) => (
              <TodoItem todo={todo} dispatch={dispatch}/>
          ))
        }
      </div>
    </div> 
     
  );
}

export default App;
