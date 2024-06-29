import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const Cancel = () => {
    Swal.fire('Order Failed','Continue Shopping','error')
  return (
    <div className="alert alert-success" role="alert">
    <div class='d-flex align-items-center justify-content-center'>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Thanks for visiting</h5>
      <p class="card-text">Continue Shopping</p>
      <Link to="/home" class="btn btn-primary">Click here</Link>
    </div>
  </div>
 </div>
</div>
  )
}

export default Cancel