import React,{useContext} from 'react'
import { store } from '../ContextProvider';
import Users from './Users';
import AdminOrders from './AdminOrders';
import Products from './Products';

const Admin = () => {
  const { user} = useContext(store);
  return (
    <div className='container-fliud'>
      {user.isAdmin ?<div><ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active bg-light text-info" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Users</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link bg-light text-info" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Products</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link bg-light text-info" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Orders</button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><Users/></div>
   <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><Products/></div>
    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"><AdminOrders/></div>
  </div></div>:<div className='d-flex justify-content-center mt-5'><h3 className='text-secondary'>No Access</h3></div>}</div>
  )
}

export default Admin
