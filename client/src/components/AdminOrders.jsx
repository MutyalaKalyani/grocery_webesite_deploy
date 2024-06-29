import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faPen,faSquareCheck} from '@fortawesome/free-solid-svg-icons';
const AdminOrders = () => {
  const [Orders,setOrders]=useState([])
  const [confirm,setConfirm]=useState(false)
  useEffect(()=>{
    const func=async()=>{
      const orders=await axios.get("https://mern-deploy-fn3u.onrender.com/orders/getAllorders")
      setOrders(orders.data)
    }
    func()
  },[confirm])
  const update=async(id)=>{
   const order= await axios.put("https://mern-deploy-fn3u.onrender.com/orders/updateOrder",{id})
   if(order.data==="success"){
    setConfirm(true)
    setTimeout(()=>{
      setConfirm(false)
    },3000)
   }
  }
  return (
    <div className="container-fluid">
     {!confirm ?<p className='text-center text-info'>Click on update to mark delivery as successfull</p>:<div class="alert alert-success" role="alert">
                  Delivery Successfully 
                </div>}
      <table class="table table-success table-striped">
        <thead>
          <tr class="table-success">
            <th class="table-success">User</th>
            <th class="table-success">Customer Name</th>
            <th class="table-success">Customer email</th>
            <th class="table-success">Customer PhoneNo</th>
            <th class="table-success">Orders</th>
            <th class="table-success">Shipping Address</th>
            <th class="table-success">Shipping Type</th>

            <th class="table-success">Delivery Status</th>
            <th class="table-success">Payment Id</th>
            <th class="table-success">Payment Status</th>
            <th class="table-success">Update</th>
          </tr>
        </thead>
        <tbody>
        {Orders.map((item,key)=>{
            return(
                <tr>
            <td class="table-success">{item.user}</td>
            <td class="table-success">{item.customer_name}</td>
            <td class="table-success">{item.customer_email}</td>
            <td class="table-success">{item.customerPhonenumber}</td>
            <td class="table-success">{item.products}</td>
            <td class="table-success"><div className='text-small'><span>{item.shipping.line1},</span><span>{item.shipping.line2}<br/></span><span>{item.shipping?.city},</span><span>{item.shipping?.postal_code},</span><span>{item.shipping?.state}</span></div></td>
            {item.total===item.subtotal? <th class="table-success">Express air delivery</th>:<th className='table-success'>Land delivery</th>}
           
           
            <td class="table-success" >{item.delivery_status}</td>

            <td class="table-success"><span className='font-weight-bold'>{item.paymentintentId}</span><br/>{item.delivery_status==='delivered' && <span>Ordered delivered at {item.updatedAt} <br/></span>}<span>Order placed at {item.createdAt}</span></td>
                
            <td class="table-success">{item.payment_status}</td>
           <td class="table-success">{item.delivery_status==='pending' ? <FontAwesomeIcon icon={faPen} onClick={()=>update(item._id)} />:<FontAwesomeIcon icon={faSquareCheck} />} </td>

            </tr>
            
            )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders