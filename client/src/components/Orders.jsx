import React, {useEffect, useState } from 'react'
import axios from 'axios';
import {useLocation} from 'react-router-dom'

const Orders = () => {
  let location = useLocation();
  const user = location.state.test;
  const [Orders,setOrders]=useState([])
  useEffect(()=>{
    const func=async()=>{
      const orders=await axios.post("https://grocery-webesite-deploy.onrender.com/userOrders",{user})
      setOrders(orders.data)
    }
    func()
  },[])
  return (
    <div className="container-fluid mt-5">
      <h1 className='text-center'>Order History</h1>
       {Orders.length>0 ?
      
      <table class="table table-success table-striped">
        <thead>
          <tr class="table-success">
            <th scope="row">S.No.</th>
            <th class="table-success">User</th>
            <th class="table-success">Customer Name</th>
            <th class="table-success">Customer email</th>
            <th class="table-success">Orders</th>
            <th class="table-success">Shipping Address</th>
            <th class="table-success">Shipping Type</th>
            <th class="table-success">Payment Id</th>
            <th class="table-success">SubTotal/Total</th>
            <th class="table-success">Payment Status</th>
          </tr>
        </thead>
        <tbody>
        {Orders?.map((item,key)=>{
            return(
                <tr>
                <th scope="row">{key+1}</th>
            <td class="table-success">{item.user}</td>
            <td class="table-success">{item.customer_name}</td>
            <td class="table-success">{item.customer_email}</td>
            <td class="table-success">{item.products}</td>
            <td class="table-success"><div className='text-small'><span>{item.shipping.line1},</span><span>{item.shipping.line2}<br/></span><span>{item.shipping?.city},</span><span>{item.shipping?.postal_code},</span><span>{item.shipping?.state}</span>Phone No.{item.customerPhonenumber}<span></span></div></td>
            {item.total!==item.subtotal? <th class="table-success">Express air delivery</th>:<th className='table-success'>Land delivery</th>}
           
            <td class="table-success"><span className='font-weight-bold'>{item.paymentintentId}</span><br/>{item.delivery_status==='delivered' && <span>Ordered delivered at {item.updatedAt} <br/></span>}<span>Order placed at {item.createdAt}</span></td>
                <td className='table-success'>Subtotal:{item.subtotal}<br/>Total:{item.total}</td>
                <td class="table-success">{item.payment_status}</td>
            </tr>
            
            )
        })}
        </tbody>
      </table>:<div className='d-flex justify-content-center mt-5 text-secondary'>No Orders</div>}
    </div>
  )
}

export default Orders