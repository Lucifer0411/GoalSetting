import axios from 'axios'

export const API_URL='http://localhost:8000/api/users/'

const register=async(userData)=>{
    const response=await axios.post(API_URL,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data
}

export const logoutUser=()=>{
     localStorage.removeItem('user');
}
const login=async(userData)=>{
    const response=await axios.post(`${API_URL}login`,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data
}
const authService={
    register,
    login
}
export default  authService