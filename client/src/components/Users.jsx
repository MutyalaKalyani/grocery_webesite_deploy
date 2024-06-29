import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Users = () => {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    const func=async()=>{
      const user=await axios.get("https://mern-deploy-fn3u.onrender.com/allUsers")
      setUsers(user.data)

    }
    func()
  },[])
  return (
    <div className="container">
      <table class="table table-success table-striped">
        <thead>
          <tr class="table-success">
            <th scope="row">S.No.</th>
            <th class="table-success">User</th>
            <th class="table-success">Email</th>
            <th class="table-success">IsAdmin</th>
          </tr>
        </thead>
        <tbody>
        {users.map((item,key)=>{
            return(
                <tr>
                <th scope="row">{key+1}</th>
            <td class="table-success">{item.name}</td>
            <td class="table-success">{item.email}</td>
            {item.isAdmin ? <td class="table-success">Yes</td>:<td class="table-success">No</td>}

            </tr>
            
            )
        })}
        </tbody>
      </table>
    </div>
  );
};


export default Users