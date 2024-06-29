import React,{ useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './style.css'
function Signup() {    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success,setSuccess]=useState(false)
    const [alert,setAlert]=useState(false)
const navigation=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
    await axios.post("https://grocery-webesite-deploy.onrender.com/register", { name, email, password }).then(result => {
        if(result.data==="User exists"){
            setAlert(true)
            setSuccess(false)
        }
        else{
            setAlert(false)
            localStorage.setItem('token',result.data)
            setSuccess(true)
           navigation('/')
        }
    })
    .catch(err => console.log(err))
       
     

    }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100" id="signup_page">
        <div className="bg-white p-3 rounded signin_page_width mw-100">
        <h2 class="text-success"><center>Sign Up</center></h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" class="text-secondary" >
                        <strong>Name</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Name' 
                    autoComplete='off' 
                    name='email' 
                    required
                    class='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" class="text-secondary">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    required
                    class='form-control rounded-0' 
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
                    class='form-control rounded-0' 
                    required
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Register
                </button>
                </form>
                {
                success && <div class="alert alert-success" role="alert">
                   Successfully Registered
                </div>
            }
             {
                alert && <div class="alert alert-danger" role="alert">
                There is account with this email,please login.
                </div>
            }
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            
        </div>
    </div>
  );
}

export default Signup;