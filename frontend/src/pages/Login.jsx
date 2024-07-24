import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import '../../src/index.css'
import {useNavigate} from 'react-router-dom'
import { login,reset } from "../features/auth/authSlice"
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from "../components/Spinner"

function Login() {
  
  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })
  const {email,password}=formData
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isError,isSuccess,message,user,isLoading}=useSelector((state)=>state.auth)
  
  
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess && user){
      toast.success("user login successfully")
      navigate('/')
    }
    dispatch(reset()) 
  },[user,navigate,dispatch,message,isError,isSuccess])
  
  const handleChange=(e)=>{
    setFormData((prevState)=>{
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const userData={
      email,
      password
    }
      dispatch(login(userData))
      navigate('/')
  }
  if(isLoading){
      return <Spinner/>
    }
  return (
    <div className="container mt-4 rounded border  login_form shadow-lg">
      <section className="rounded-3 p-2 login_form text-center mt-4">
        <h1 className="login_heading ">
          <FaSignInAlt/>Login
        </h1>
      </section>
      <section className="container text-light">
        <p className="h2">Login and start setting goals</p>
        <form className="pt-3" onSubmit={handleSubmit}>
          <div className="form-group">
          <label className='h3' htmlFor='email'>Email:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-envelope"></i>
          <input className='form-control'  type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Enter your email..."/>
          </span>
          </div>
          <div className="form-group mt-3">
          <label className='h3' htmlFor='password'>Password:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-file-earmark-lock"></i>
          <input className='form-control' type="password" name="password" id="password" value={password} onChange={handleChange} placeholder="Enter your password..."/>
          </span>
          </div>
          <input className='btn-lg btn btn-outline-light m-2 mt-3' type="submit" value="Submit" />

        </form>
      </section>
      
    </div>
 
  )
}

export default Login
