import {FaSignInAlt,FaUser,FaSignOutAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../../src/index.css'
import { useSelector,useDispatch } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice';
import { useEffect } from 'react';



function Header() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.auth)

    const handleLogout=()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    useEffect(()=>{

    },[])

  return (
    <header className='navbar navbar-expand'>
      <div className="container">
      <div className="logo">
            <Link className='logo_text' to='/'>GoalSetter</Link>
        </div>
    <div className="">
    <ul className='navbar-nav'>
            {
                user ? (
                    <li className='nav-item nav-link'>
                    <button  className='nav_link p-2 border rounded' onClick={handleLogout}>
                        <FaSignOutAlt/>
                            Logout
                    </button>
                </li>
                ) : (<>
                    <li className='nav-item nav-link  link-unstyled' >
                    <Link className='nav_link p-2 border rounded' to='/login'>
                        <FaSignInAlt/>
                        Login
                    </Link>
                </li>
                <li className='nav-item nav-link bg-yellow link-unstyled'  >
                    <Link className='nav_link p-2 border rounded' to='/register'>
                        <FaUser/>
                        Register
                    </Link>
                </li>
                    </>)
            }
   
        </ul>
    </div>
      
      </div>
    </header>
  )
}

export default Header
