import React from 'react'
import Custombutton from './Custombutton'
import { useState } from 'react'
import TodoList from './TodoList'
import axios from 'axios'


function Enter() {
  const [text,setText] = useState("")
  const handleaddition = () =>{
    axios.post('http://localhost:3001/add',{text:text}).then((res)=>{
        console.log(res.data);
        setText("");
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <>
    <div className='flex justify-center items-center mt-10'>
        <input
        class="w-full h-10 max-w-md bg-[#10172a] text-gray-300 rounded-md pl-2 pr-5 border-2 border-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        placeholder='Enter Your Todo here....'
        value={text}
        onChange={(e) => setText(e.target.value)}
        type='text'></input>
        <Custombutton onClick={handleaddition} title={"➕ADD"}/>
    </div>
    <TodoList/>
    </>
    )
}

export default Enter