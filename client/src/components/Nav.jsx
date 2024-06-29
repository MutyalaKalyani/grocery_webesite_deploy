import React, { useContext, useEffect } from "react";
import axios from "axios";
import { store } from "../ContextProvider";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import { useState } from "react";
const Nav = () => {
  const navigation=useNavigate()
  const { user, setUser ,cart} = useContext(store);
const [quantity,setQuantity]=useState(0);
 useEffect(()=>{
  
  const func=async()=>{
      await axios.get("https://grocery-webesite-deploy.onrender.com/getUser", {
          headers: {
          'x-auth-token': localStorage.getItem('token')
          }
        })
      .then(result => {
          setUser(result.data)
         
      })
      .catch(err => console.log(err))
  }
  func();
},[])
useEffect(()=>{
  let num=0;
  cart.map((item)=>{
    return num+= item[3];
   })
   setQuantity(num)
},[cart])

  return (
    <>
    <div className="Navbar">
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
          <Link to="/" class="navbar-brand" id="NavBar">
            Organic farm
          </Link>
          
          {!user.name ? (
            <div>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link
                      class="nav-link active"
                      style={{ color: "black" }}
                      to="/login"
                    > <i class="bi bi-cart3"></i>
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      style={{ color: "black" }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
                <li  style={{listStyleType:"none"}}><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} style={{color:"black"}}/><span class="top-0 start-100 translate-middle badge rounded-pill bg-danger">{quantity}</span></Link></li>
              </div>
            </div>
          ) : (
           <div class="d-flex justify-content-center align-items-center ">
              <ul style={{ listStyleType: "none" }}>
                <li class="nav-item dropdown ">
                  <li
                    class="nav-link dropdown-toggle"
                    href=""
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{color:"black"}}
                  >
                    Hi {user.name}
                  </li>
                  
                  <ul class="dropdown-menu">
                    <Link to="/profile" class="dropdown-item">
                      Profile
                    </Link>
                    <button  class="dropdown-item" onClick={()=>navigation(`/orders`,{state:{test:user}})}>
                      Orders
                    </button>
                    <li
                      class="dropdown-item"
                      onClick={() => {
                        setUser([]);
                        localStorage.removeItem("token");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </li>
             
              </ul>
 <li  style={{listStyleType:"none"}}><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} style={{color:"black"}}/><span class="top-0 start-100 translate-middle badge rounded-pill bg-danger">{quantity}</span></Link></li>
       </div>
       )}
          
        </div>
      </nav>
    </div>
    </>
  );
};

export default Nav;
