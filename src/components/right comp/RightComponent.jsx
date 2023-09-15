import React, { useEffect } from 'react'
import './right.css'
import { v4 as uuidv4 } from 'uuid';
import LeftComponent from '../left comp/LeftComponent';

const RightComponent = ({currentTask, lists, setLists}) => {
    // const [lists, setLists]=React.useState([]);
    const [inputValue, setInputValue]=React.useState("")
    useEffect(()=>{
      console.log(lists);
    }, [lists])

    const handleItemDelete = (delItemId)=>{
      if(currentTask && lists[currentTask]){
        lists[currentTask]={
          ...lists[currentTask], 
          toDoItems:lists[currentTask].toDoItems.filter((items)=>items.itemId!=delItemId)
        }
        console.log(lists, "after delete")
        setLists({...lists})
      }
      else{
        alert("item not found.")
      }
    }
    
  return (
    <div><div id="rightSideMenu">
      {lists && Object.keys(lists).length>0 && currentTask ? <h2>{lists[currentTask]?.listName}</h2> : <h2>No task added</h2>}
      
   
    
    <input type="text" id="input-box-right" placeholder="add work" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
    <button onClick={()=>{const obj = {itemName:inputValue, itemId:uuidv4(), isCompleted:false };
      // setLists({...lists, [LeftComponent.toDoItems]:obj})
      
      // setLists(lists)
      if(Object.keys(lists).length>0 && currentTask){
        setLists((prev)=>{
          const temp = {...prev}
          temp[currentTask] = {...temp[currentTask], toDoItems:[...temp[currentTask].toDoItems, obj]}
          return temp
        })
      }
      else{
        alert("please select a to-do first")
      }
      setInputValue("")
    }}>Add</button> 
    <ul className="rightComp">
        {
          lists[currentTask]?.toDoItems.map((list, index)=>
          <div className='rightComp_listDiv' key={list?list.itemId:Math.random()*1234}>
              <input className='check' type='checkBox' value={list?list.isCompleted:false} onChange={(e)=>{
                console.log("event", e)
                if(e.target.checked){
                  lists[currentTask]={
                    ...lists[currentTask], 
                    toDoItems:lists[currentTask].toDoItems.map((items)=>{
                      if(items.itemId==list.itemId){
                        items.isCompleted=true
                        return items
                      }
                     
                    })
                  }
               
                  setLists({...lists})
                }
                else{
                  lists[currentTask]={
                    ...lists[currentTask], 
                    toDoItems:lists[currentTask].toDoItems.map((items)=>{
                      if(items.itemId==list.itemId){
                        list.isCompleted=false
                        return list
                      }
                     
                    })
                  }
                
                  setLists({...lists})
                }
              }}/>
               <li key={index}>{list.itemName}</li>
               <button onClick= {()=>handleItemDelete(list.itemId)} className='rightComp_button'>
              Delete
            </button>
          </div>
         
          )
        }
    </ul>
</div></div>
  )
}

export default RightComponent