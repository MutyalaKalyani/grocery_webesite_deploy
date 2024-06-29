import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import './style.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [Tempproducts, settempProducts] = useState([]);
  const [searchkey, setsearchkey] = useState('')
  const[type , settype]=useState('all')
  const[status , setStatus]=useState('all')

  useEffect(() => {
    const getData = async () => {
      await fetch("https://grocery-webesite-deploy.onrender.com/products/getallproducts")
        .then((response) => response.json())
        .then((data) => {settempProducts(data); setProducts(data)});
    };
    getData();
  },[]);
const navigation=useNavigate()
const func=(e)=>{
  navigation(`/products/${e.name}`,{state:{test:e}})
}
function filterBySearch()
  {
    const dupdate = Tempproducts.filter(product=>product.name.toLowerCase().includes(searchkey))
    setProducts(dupdate)
  }

  function filterByType(e)
  {
    settype(e)
    if(e.toLowerCase()!=='all'){
      const dupdate = Tempproducts.filter(product=>product.type.toLowerCase()===(e.toLowerCase()))
      setProducts(dupdate)
    }
    else{
      setProducts(Tempproducts)
    }
   
  }
  function filterByStatus(e)
  {
    setStatus(e)
    if(e.toLowerCase()!=='all'){
      const dupdate1 = Tempproducts.filter(product=>product.status.toLowerCase()===(e.toLowerCase()))
      setProducts(dupdate1)
    }
    else{
      setProducts(Tempproducts)
    }
   
  }
return (
     
      <div class="container row row-cols-auto mx-auto" id="Home_row">
       <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search products'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="d-block col-md-4">
            <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

            <option value="all">All</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="pulses/cereals">Pulses/cereals</option>
              
            </select>
          </div>
          <div className="d-block col-md-4">
            <select className="form-control m-2" value={status} onChange={(e)=>{filterByStatus(e.target.value)}} >

            <option value="all">All</option>
              <option value="available">In Stock</option>
              <option value="outofstock">Out of Stock</option>
              
            </select>
          </div>
      {products && products.map((e) => {
        return (
       
<div class="col mx-auto text-center" id="Home_col">
          <div class="card" >
          <img src={e.image} class="card-img-top mx-auto" alt={e.name} id="Home_img"/>
          <div class="card-body">
            <h5 class="card-title">{e.name}</h5>
            <p class="card-text">From Rs.{e.priceper250g}</p>
            <div class="middle">
    
  
                <button className="text" onClick={()=>{func(e)}}  >VIEW</button>
            </div>
          </div>
        </div>
        </div>
        );
      })}
      </div>
  );
};
export default Home;
