import React from 'react'

function Custombutton({onClick,title}) {
  return (
    <button className="bg-[#10172a] p-1 mx-1 text-xl text-white rounded-md border-2 border-gray-800 shadow-blue-200 cursor-pointer
            hover:bg-gray-600" onClick={onClick}>
        {title}
    </button>
  )
}

export default Custombutton