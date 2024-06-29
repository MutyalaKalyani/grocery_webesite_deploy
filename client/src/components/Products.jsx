import React, { useEffect, useState } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faPlus , faTrashCan} from '@fortawesome/free-solid-svg-icons';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [add, setAdd] = useState(false);
  const [alert,setAlert] = useState(false);
  const [success,setSuccess]=useState(false)
  const [name,setName] = useState(false);
  const [priceper250g,setPriceper250g] = useState(false);
  const [priceper500g,setPriceper500g] = useState(false);
  const [type,setType ] = useState(false);
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(false);

  let product={
    name,
    priceper250g,
    priceper500g,
    type,
    status,
    image
  }
  useEffect(() => {
    const getData = async () => {
     const result= await axios.get("https://mern-deploy-fn3u.onrender.com/products/getallproducts")
       setProducts(result.data)
    };
    getData();
  }, [success]);
  const AddProduct=()=>{
     setAdd(add=>!add)
  }
    useEffect(()=>{
    const func=async()=>{
      const Product=await axios.get("https://mern-deploy-fn3u.onrender.com/products/getallproducts")
      setProducts(Product.data)
    }
    func()
  },[])
  const Submithandle=async(e)=>{
    e.preventDefault();
    if(product.name.length>0){
     const result=await axios.post("https://mern-deploy-fn3u.onrender.com/products/add",product);
     setAlert(false)
     if(result.data==='success'){
      setSuccess(true)
      setTimeout(()=>setSuccess(false),2000)
        
        
     }
     else if(result.data==="product already exists"){
        setSuccess(false)
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
       
     }}

  }
  const update=async(id)=>{
     const result=await axios.post("https://mern-deploy-fn3u.onrender.com/products/deleteProduct",{id})
     if(result.data==="Product Deleted Successfully")
      {
        setSuccess(true)
        setTimeout(()=>setSuccess(false),3000)
      }
  }
  return (
    <div className="container">
    <button className="px-2 my-3 bg-danger border text-light" onClick={()=>AddProduct()}><FontAwesomeIcon icon={faPlus} />ADD</button>
    {
        add && <div className="d-flex justify-content-center"><form onSubmit={Submithandle}>
           
            <h4 className="text-center">Add Product</h4>
            <div className="row py-1"> <label className="col">Name :</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} name="name" className="col" required/></div>
            <div className="row py-1" >  <label className="col">Price per 250g:</label>
            <input type="text" onChange={(e)=>setPriceper250g(e.target.value)} name="priceper250g" className="col" required/></div>
            <div className="row py-1">  <label className="col">Price per 500g:</label>
            <input type="text" onChange={(e)=>setPriceper500g(e.target.value)} name="priceper500g" className="col" required/></div>
            <div className="row py-1"> <label className="col">Type :</label>
            <input type="text" onChange={(e)=>setType(e.target.value)} name="type" className="col" required /></div>
            <div className="row py-1">  <label className="col">Status :</label>
            <input type="text" onChange={(e)=>setStatus(e.target.value)} name="status" className="col"/></div>
            <div className="row py-1"> <label className="col">Image url :</label>
            <input type="text" onChange={(e)=>setImage(e.target.value)} name="image" className="col" required/></div>
            <input type="submit" className="bg-success border px-2 mb-3 mx-auto"/>
        </form></div>
    }
    {
        alert && <div class="alert alert-danger" role="alert">
       Product Already Exists
      </div>
    }
    {
        success && <div class="alert alert-success" role="alert">
        Product Operation Successfully
      </div>
    }
      <table class="table table-success table-striped">
        <thead>
          <tr class="table-success">
            <th scope="row">S.No.</th>
            <th class="table-success">Product</th>
            <th class="table-success">Price per 250g</th>
            <th class="table-success">Price per 500g</th>
            <th class="table-success">Type</th>
            <th class="table-success">Status</th>
            <th className="table-success">Delete</th>
          </tr>
        </thead>
        <tbody>
        {products && products?.map((item,key)=>{
            return(
                <tr>
                <th scope="row">{key+1}</th>
            <td class="table-success">{item.name}</td>
            <td class="table-success">{item.priceper250g}</td>
            <td class="table-success">{item.priceper500g}</td>
            <td class="table-success">{item.type}</td>
            <td class="table-success">{item.status}</td>
            <td> <FontAwesomeIcon icon={faTrashCan} onClick={()=>update(item._id)}/></td>
            </tr>
            
            )
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
