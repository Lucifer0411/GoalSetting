import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
    const [text,setText]=useState('');
    const dispatch=useDispatch();
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }
  return (
    <div className='container'>
        <form className="container" onSubmit={onSubmit}>
        <div className="form-group row gap-4">
            <label className='form-label h3 col-12' htmlFor="text">Enter your Goal</label>
            <input className="form-control col" type="text" name="text" id="text" onChange={(e)=>setText(e.target.value)} value={text}/>
            <input className="btn btn-primary btn-lg col-md-4 col-" type="submit" value="Submit" />
        </div>
        </form>
    </div>
  )
}

export default GoalForm
