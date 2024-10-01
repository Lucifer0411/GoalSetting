import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal,editGoal } from '../features/goals/goalSlice'

function GoalItem({goal}) {
  let [editText,setEditText]=useState(goal.text);
  const dispatch=useDispatch();

  const handleDeleteClick=()=>{
    dispatch(deleteGoal(goal._id))
  }
  const handleEditClick=(e)=>{
    let inputField=e.target.parentNode.previousElementSibling;
    inputField.removeAttribute('disabled')
    let editBtn=e.target.parentNode.children[0];
    editBtn.classList.add('d-none')
    const saveIcon=e.target.parentNode.children[1]
    saveIcon.classList.remove('d-none')

  }
 
  const handleSaveClick=()=>{
    const date=document.getElementById('goal-date')
    dispatch(editGoal({id:goal._id,text:editText}))
    date.innerText=new Date().toLocaleString('en-IN')
    console.log('date',date);
    window.location.reload(true);
    
  }


  return (
    <div className='text-center'>
      <div className='goal-item'>
     <ul className="list-group">
      <li className="list-group-item p-3 m-5">
        <div className="row justify-content-center align-items-center">
        <p className='fw-bold col-md-2' id='goal-date'>{new Date(goal.createdAt).toLocaleString('en-IN')}</p>
        {/* <h5 className='col-md-6 text-capitalize' >{goal.text}</h5> */}
        <input type="text" className='h-2 col-md-6 text-capitalize' onChange={(e)=>setEditText(e.target.value)} value={editText} disabled/>
        <div className="btn-container col-md-4">
        <button className="col-6 px-3 btn btn-primary" onClick={handleEditClick}><i className="bi bi-pencil-fill"></i>
        </button>
        <button className="col-6 px-3 btn btn-success d-none" onClick={handleSaveClick}><i className="bi bi-floppy"></i>
        </button>
        <button className="col-6 px-3 btn btn-danger" onClick={handleDeleteClick}><i className="bi bi-trash"></i>
        </button>
        </div>
        </div>
      </li>
     </ul> 
      </div>
    </div>
  )
}

export default GoalItem