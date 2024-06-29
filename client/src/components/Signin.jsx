import React, {useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios'
import './style.css'



function Signin() {  
const Navigation=useNavigate()
   const [success,setSuccess]=useState(false)
   const [alert,setAlert]=useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://grocery-webesite-deploy.onrender.com/login", { email, password })
        .then(result => {
            if(result.data === "Invalid email or password"){
                setSuccess(false)
                setAlert(true)
               setSuccess(false)
            }
            else{
                setAlert(false)
                localStorage.setItem('token',result.data)
                setSuccess(true)
               Navigation('/')
            }
       
        })
        .catch(err =>alert(err))
    }


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" id="signup_page">
        <div className=" bg-white p-3 rounded  mw-50" id="signin_page_width">
            <h2 className="text-success"><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label class="text-secondary" htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Email' 
                    required
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" class="text-secondary">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    required
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>

                </form>
                {
                success && <div class="alert alert-success" role="alert">
                   Successfully Logged In
                </div>
            }{
                alert && <div class="alert alert-danger" role="alert">
                   Invalid Credentials
                </div>
            }
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            
        </div>
    </div>
  );
}

export default Signin;