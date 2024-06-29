import React, { useState,useContext }  from 'react'
import {store} from '../ContextProvider'
import axios from 'axios';
import './style.css'
import {Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user,setUser}=useContext(store);
  const [edit,setEdit]=useState(false);
  const [Username,setUsername]=useState(user.name);
  const [Password,setPassword]=useState(user.name);
  const navigate = useNavigate()
  const editButton=()=>
    {
      setEdit((edit)=>!edit);
    }

    const editProfile=async()=>{
      let email=user.email
     
    await axios.put("https://grocery-webesite-deploy.onrender.com/updateprofile", { Username, email, Password })
      .then(result => {
          setUser(result.data)
          localStorage.removeItem("token");
          navigate('/home')
          })
      .catch(err => console.log(err))
     
    }
  return (
    <div  class="d-flex justify-content-center align-items-center">
      {user.name ?
    <div class="card shadow-lg p-5 my-5 ">
     {!edit? <div>
         <h4>Username:</h4><p className='profile_details'>{user.name}</p>
         <h4>Email:</h4><p className='profile_details'>{user.email}</p>
          {user.isAdmin ? <h4 className='my-3'>IsAdmin: Yes</h4>:<h4 className='my-3'>IsAdmin:No</h4>}
<button className='d-block my-3 border border-secondary w-100 rounded-0 ' onClick={()=>editButton()}>Edit profile</button>
         
        <Link to="/admin" className='text-decoration-none'>{user.isAdmin && <div className='my-3 p-1 bg-dark w-100 rounded-0 text-light text-center ' >Go to Admin Site</div>}</Link>
      </div>:
      <div>
       <label>Username:</label><input className='profile_details' type='text' placeholder='Enter new username' required onChange={(e) => setUsername(e.target.value)}/>
       <label>Email:</label><span className='profile_details'>{user.email}</span>
       <label>Password:</label><input className='profile_details' type='password' placeholder='Enter new password' required onChange={(e) => setPassword(e.target.value)}/>
 
         <button className='d-block my-3 border border-secondary w-100 rounded-0 ' onClick={()=>editProfile()}>Submit</button>
        
        
        </div>}
    </div>:<div class="card shadow-lg p-4 vw-100 text-center">please login first</div>
}
    </div>
  )
}

export default Profile