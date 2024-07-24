import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({goal}) {
  const dispatch=useDispatch();
  const handleclick=()=>{
    dispatch(deleteGoal(goal._id))
  }

  return (
    <div className='text-center'>
      <div className='goal-item'>
     <ul className="list-group">
      <li className="list-group-item p-3">
        <div className="row justify-content-center align-items-center">
        <p  className='fw-bold col-md-2'>{new Date(goal.createdAt).toLocaleString('en-IN')}</p>
        <h5 className='col-md-8 text-capitalize' >{goal.text}</h5>
        <button className="col-md-2 btn btn-danger" onClick={handleclick}><i className="bi bi-trash"></i></button>
        </div>
      </li>
     </ul> 
      </div>
    </div>
  )
}

export default GoalItem