import React, { useEffect,useState } from 'react'
import Custombutton from './Custombutton'
import axios from 'axios';
function TodoList() {
    const [localtodo,setlocaltodo] = useState([]);
    const [isedited,setisedited] = useState({});
    const [editedtext,seteditedtext] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:3001/get').then((res)=>{
            setlocaltodo(res.data);
        }).catch((err)=>{
            console.log("Error in Todolist"+err);
        })
    },[localtodo]);


    const HandleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id).then((res)=>{
            setlocaltodo(localtodo.filter((todos)=>todos._id!==id));
            
        }).catch((err)=>{
            console.log("Error in Handling Todo delete"+err);
        })
    }

    const HandleEdit = (id,editedtext) =>{
        axios.put('http://localhost:3001/edit/'+id,{text:editedtext}).then((res)=>{
            setisedited({...isedited,[id]:false})
            setlocaltodo((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, text: editedtext } : todo
                )
            ); 
        }).catch((err)=>{
            console.log("Error in Handling Todo update"+err);
        })
    }

    const HandleComplete = (id) =>{
        axios.put('http://localhost:3001/editcomplete/'+id).then((res)=>{
            setlocaltodo((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, complete: !todo.complete } : todo
                )
            );
        }).catch((err)=>{
            console.log("Error in Handling Todo update"+err);
        })
    }

  return (
    localtodo.length==0?
    <h3 className='text-xl flex justify-center items-center mt-4 text-white '>No Todos Found</h3>
    :<ul>
        <div className='flex flex-col justify-center items-center mt-9'>
        {localtodo.map((todos)=>(
            todos.text?.trim().length > 0 ?
            <li key={todos._id} className='flex justify-center items-center mt-2 w-full max-w-lg  bg-[#10172a] rounded-md '>
                <input
                    className='w-5 h-10 mx-2 cursor-pointer'
                    type="checkbox"
                    checked={todos.complete}
                    onChange={() => HandleComplete(todos._id)}
                />
                <input 
                className='w-full h-10 pl-3 pr-10  text-md text-white border-2 border-gray-800 rounded-md bg-[#10172a]  focus:ring-0 focus:border-transparent'
                style={{textDecoration:todos.complete?"line-through":"none"}}
                value = {isedited[todos._id]?editedtext[todos._id]??todos.text:todos.text}
                readOnly ={!isedited[todos._id]}
                type='text'
                onChange={(e)=>seteditedtext({...editedtext,[todos._id]:e.target.value})}
                ></input>
                <Custombutton title={isedited[todos._id]?"💾":"✏️"} onClick={
                    ()=>{
                        if(isedited[todos._id]){
                            HandleEdit(todos._id,editedtext[todos._id]);
                        }else{
                            setisedited({...isedited,[todos._id]:true});
                            seteditedtext({...editedtext,[todos._id]:todos.text});
                        }
                    }
                }/>
                <Custombutton title={"❌"} onClick={()=>HandleDelete(todos._id)}/>
            </li>:
            console.log("No todos found")
        ))}
        </div>
    </ul>
  )
}

export default TodoList