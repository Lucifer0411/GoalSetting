import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import '../../src/index.css'
import {useNavigate} from 'react-router-dom'
import { register,reset } from "../features/auth/authSlice"
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from "../components/Spinner"



function Register() {
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password_2:'',
  })
  const {name,email,password,password_2}=formData
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isError,isSuccess,message,user,isLoading}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset()) 
  },[user,isError,isSuccess,message,navigate,dispatch])

  const handleChange=(e)=>{
    const value=e.target.value;
      setFormData((prevState)=>{
        return {
          ...prevState,
          [e.target.name]:value
        }
      })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(password!==password_2){
      toast.error("Confirm password does not matches")
    }else{
      const userData={
        name,
        email,
        password
      }
      console.log("data",userData);
      dispatch(register(userData))
    }
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className="container w-50-sm  mt-4 rounded border login_form text-light shadow-lg">
      <section className="text-center mt-4 p-2">
        <h1 className="register_heading">
          <FaUser/>Register
        </h1>
      </section>
      <section className="form_data container ">
        <p className="h2">Please create an account</p>
        <form onSubmit={handleSubmit} className="row">
          <div className="form-group col-md-6 py-3">
          <label className='h3' htmlFor='name'>Name:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-person"></i>
          <input className='form-control' type="text" name="name" id="name" value={name} onChange={handleChange} placeholder="Enter your name..."/>
          </span>
          </div>
          <div className="form-group col-md-6 py-3">
          <label className='h3' htmlFor='email'>Email:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-envelope"></i>
          <input className='form-control'  type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Enter your email..."/>
          </span>
          </div>
          <div className="form-group col-md-6 py-3">
          <label className='h3' htmlFor='password'>Password:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-file-earmark-lock"></i>
          <input className='form-control  ' type="password" name="password" id="password" value={password} onChange={handleChange} placeholder="Enter your password..."/>
          </span>
          </div>
          <div className="form-group col-md-6 py-3">
          <label className='h3' htmlFor='password_2'>Confirm Password:</label>
          <span className="input-group">
          <i className="input-group-text bi bi-shield-check"></i>
          <input className='form-control  ' type="password" name="password_2" id="password_2" value={password_2} onChange={handleChange} placeholder="Enter your confirm password..."/>
          </span>
          </div>
          <input className='btn btn-outline-light m-2 col-2' type="submit" value="Submit" />

        </form>
      </section>
      
    </div>
  )
}

export default Register
