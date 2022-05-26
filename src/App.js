import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [page, setPage] = useState(1) 
  const [limit, setLimit] = useState(5)
  const [newTodo, setNewTodo] = useState("")
  const [totalCount, setTotalCount] = useState(0) 
  const [todos, setTodos] = useState([]) 
  
  const SaveTodo=()=>{
    fetch("http://localhost:8080/todos",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
        value: newTodo,
        isCompleted: false,
    }),
})
    .then((r)=> r.json())
    .then((d)=>{
        setTodos([...todos,d])
        setNewTodo("")
    });

};



  useEffect(()=>{
    axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`).then((r)=>{
      setTodos(r.data);
      setTotalCount(Number(r.headers["x-total-count"]));
    })
  },[page,limit,todos])




  return (
    <div className="App">
            <button disabled={page<=1} onClick={()=>setPage(page-1)}>Previous</button>
                <select onChange={(e)=>setLimit(Number(e.target.value))}>
                  <option value={5} >5</option>
                  <option value={10} >10</option>
                  <option value={15} >15</option>
                </select>
              <button disabled={totalCount < page * 5} onClick={()=>setPage(page+1)}>Next</button>

              <div>
                <input value={newTodo} onChange={({target})=>setNewTodo(target.value)}/>
                <button onClick={SaveTodo}>+</button>
            </div>


          {todos.map((todo)=>(
            <div key={todo.id}>{todo.id}{` : `} {todo.value}</div>
            
          ))}
          
          
    </div>
  );
}

export default App;
