import React, { useContext, useEffect, useState } from 'react'
import { store } from "../ContextProvider";

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import './product.css'
const Cart = () => {
  const [cart_total,setCarttotal]=useState(0)
    const {user,cart,setCart}=useContext(store);
    const [alert,setAlert]=useState(false)
  const navigation=useNavigate()
    useEffect(()=>{
      let num=0;
      cart.map((val)=>{
        return num=num+parseInt(val[2]);
      })
      setCarttotal(num)
      
    },[cart])
    const delete_item=(value)=>{
      const newcart1=cart.filter((item)=>{
        return (item[0].name===value[0].name && item[1]!==value[1]) || (item[0].name!==value[0].name && item[1]!==value[1]) || ((item[0].name!==value[0].name && item[1]===value[1]))
            
        })
      setCart(newcart1)
     
    }
    const func=(e)=>{
      navigation(`/products/${e[0].name}`,{state:{test:e[0]}})
    }
    const OrderNow=async()=>{
      if(!user.name)
        {
          setAlert(true)
        }
        else{
          setAlert(false)
          const stripe = await loadStripe("pk_test_51OpszFSB63zQKciP0t9jOn01V1UdEflESkoUP2gYkJ9zKP1iAspW0438ehb7ujxTybgXMCvmga99A6j8BP9iYS3200ySMi30H6");
         const response = await axios.post("https://grocery-webesite-deploy.onrender.com/orders/order_payment" , {cart,user})
         
         const result =await stripe.redirectToCheckout({
             sessionId:response.data.id
         });
        if(result.error)
          {
            alert(result.error)
          }
         
        }

    }
    return(
      <>
      <div class="container row row-cols-auto mt-5 mx-auto" >
        {
          cart.map((value)=>{
            return(
              <div class="card mb-3 col" id="Cart_items" onClick={()=>func(value)} style={{maxWidth:"500px"}}>
              <div class="row">
                <div class="col-md-4">
                <img class="img-fluid rounded-start" src={value[0].image} alt={value[0].name}/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                   <h2 class="card-title text-body">{value[0].name}</h2>
                    <p class="card-text" >Price: {value[2]} , weight: {value[1]} , Quantity: {value[3]}</p>
                    <p class="card-text"><strong>Total Price: {value[2]*value[3]}</strong></p>
                    <p class="card-text">Delete:<button className='delete_button' onClick={()=>delete_item(value)}> <FontAwesomeIcon icon={faTrashCan} /></button></p> 
                   
                  </div>
                </div>
               
              </div>
              
            </div>
           
            );
          })
        }
      
      </div>
      {cart.length>0 ? <div class="d-flex justify-content-center align-items-center"><div>
      <h2 class="text-body text-center">Order Details</h2>
     <div className='d-flex justify-content-between'><span class="text-secondary">Subtotal: </span><span class="text-secondary"> Rs.{cart_total}</span></div> 
      <p class="text-muted">Shipping will be calculated at checkout</p>
     <div className='d-flex justify-content-between'><span >Total: </span><span> Rs.{cart_total}</span></div> 
      <button onClick={OrderNow} className='Order_button'>Order Now</button>
      {
        alert &&<div class="alert alert-warning" role="alert">
        Please Login first!!
      </div>
      }
        </div></div>:<div class="d-flex justify-content-center mt-5 text-black-50" ><h1>Your cart is empty</h1>
        </div>} </>
    )
}
export default Cart
       