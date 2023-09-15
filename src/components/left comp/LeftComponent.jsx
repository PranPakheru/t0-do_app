import React, { useEffect } from 'react'
import './left.css'
import { v4 as uuidv4 } from 'uuid';


const LeftComponent = ({currentTask, setCurrentTask, lists, setLists}) => {
    // const [lists, setLists]=React.useState({})

    const [inputValue, setInputValue]=React.useState("")
    useEffect(()=>{
      // console.log(lists);
    }, [lists])
    
    const handleItemDelete = (delItemId)=>{
      if(lists[delItemId]){
        
        delete lists[delItemId]
        // console.log(lists, "after delete")
        setLists({...lists})
        setCurrentTask("")
      }
      else{
        alert("item not found.")
      }
    }

    useEffect(()=>{
      // console.log(lists, "useEffect")
      // setLists(lists)
    }, [Object.keys(lists).length])

  return (
    <div>
        <div id={(!currentTask || Object.keys(lists).length==0 )? "leftSideMenu_init" : "leftSideMenu"} >
    <h2>Add task here...</h2>
  
    <input type="text" id="input-box-left" placeholder="add work" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/> 
    <button onClick={()=>{ const obj = {listName:inputValue, listId:uuidv4(), toDoItems:[]};
        setLists({...lists, [obj.listId]:obj})
        setInputValue("")
    }}>Add</button> 
    {
      lists && Object.keys(lists).length>0 && 
      <ul>
      {
        Object.values(lists).map((list, index)=>
        <div className="leftComp_listDiv">

            <li key={index} onClick={()=> setCurrentTask(list.listId)}>{list.listName}</li>
            <button onClick= {()=>handleItemDelete(list.listId)} className='leftComp_button'>
              Delete
            </button>
        </div>
        
        )
      }
  </ul>
    }
   
    </div>
</div>
  )
}

export default LeftComponent