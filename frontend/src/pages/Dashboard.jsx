import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner'
import { getGoals,reset} from '../features/goals/goalSlice';
import GoalItem from '../components/GoalItem';
import '../../src/index.css'


function Dashboard() {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user}=useSelector((state)=>state.auth)
  const {goals,isLoading,isError,isSuccess,message}=useSelector((state)=>state.goals)
 

  useEffect(()=>{
    if(isError){
      console.log(message);
    }
    if(!user){
    navigate('/login')
  }
   if(user){
    dispatch(getGoals())
  }
  return () => {
    dispatch(reset())
  }
  },[user,navigate,isError,message,dispatch])

  if(isLoading){ 
    return <Spinner/>
  }

  return (
    <div className='container-fluid  pt-5 mydashboard p-4 text-light' >
      <section className='text-center'>
        <p className='display-4'>Dashboard </p>
        <h1>Welcome {user && user.name.toUpperCase()}</h1>
      </section>
      <GoalForm/>
      <section className='container mt-5 text-start '>
        {
     
          goals.length>0 ? goals.map((goal)=>(<GoalItem key={goal._id} goal={goal}/>)) : ( <h3>User has zero goals</h3>)
          
        }
      </section>
    </div>
  )
}

export default Dashboard
