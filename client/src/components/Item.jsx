import React,{useEffect, useState,useContext} from "react";
import "./product.css";
import { store } from "../ContextProvider";

import { useLocation } from "react-router-dom";
const Item = () => {
const {cart,setCart}=useContext(store)
  let location = useLocation();
  const product = location.state.test;
  const [price,setPrice]=useState(product.priceper250g);
  const [weight,setWeight]=useState("250g");
  const [quantity,setQuantity]=useState(1);
  const [price_value,setValue]=useState(price);
  const [success,setSuccess]=useState(false);
useEffect(()=>{
 setValue(price*quantity)
},[price,quantity])
  const Increment=()=>{
    if(quantity===9)
      setQuantity(9);
    else
      setQuantity(quantity+1)
  }
  const Decrement=()=>{
    if(quantity===1)
      setQuantity(1);
    else
      setQuantity(quantity-1)
  }
  const Weight=(e)=>{
    setWeight(e.target.value)
      if(e.target.value==="250g")
        setPrice(product.priceper250g)
      else if(e.target.value==="500g")
          setPrice(product.priceper500g)
        else
        setPrice(product.priceper500g*2)
  }
  const addToCart=()=>{
    const newcart1=cart.filter((item)=>{
      return (item[0]._id===product._id && item[1]===weight)
          
      })
    const newcart2=cart.filter((item)=>{
    return (item[0]._id!==product._id) || (item[0]._id===product._id && item[1]!==weight)
        
    })
    if(newcart1.length>0)
    setCart([...newcart2,[product,weight,price,newcart1[0][3]+quantity]])
   else
  setCart([...newcart2,[product,weight,price,quantity]])

   
    setSuccess(true);
    setTimeout(()=>setSuccess(false),3000)
  }

  return (
   
    <div class="container my-5">
      
      <div class="row">
        <div class="col">
          <img
            src={product.image}
            alt={product.name}
            className="product_image"
          />
        </div>
        <div class="col">
          <div>
            <h1>{product.name}</h1>
            <p className="product_price"> Rs.{price_value} (Shipping calculated at checkout).</p>
            <div className="row  text-secondary"><span className="col">WEIGHT</span></div>
            <div class="row row-cols-auto">
             <div class="col">
              <select class="form-select" aria-label="Default select example" onChange={(e)=>Weight(e)} id="product_select">
                <option value="250g" selected>250g</option>
                <option value="500g" >500g</option>
                <option value="1kg">1kg</option>
              </select>
            </div>

             <div class="col" ><button className="product_button" onClick={Decrement}>-</button> <input type="text"  name="Quantity" value={quantity} className="Product_input"/><button className="product_button" onClick={Increment}>+</button></div> 
            </div>
           {product.status==="Available" ? <button className="addtocart" onClick={()=>{addToCart()}}>Add to cart</button> :<button className="addtocart">Out of Stock</button>}
            {
                success && <div class="alert alert-success" role="alert">
                   Successfully Added to cart
                </div>
            }
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active tab"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  className="tab"
                >
                  Description
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  className="tab"
                >
                  Benifits
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                  className="tab"
                >
                  More
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active text-muted"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                Organic produce contains fewer pesticides. Chemicals such as
                synthetic fungicides, herbicides, and insecticides are widely
                used in conventional agriculture and residues remain on (and in)
                the food we eat. Organic food is often fresher because it
                doesn't contain preservatives that make it last longer. Organic
                produce is sometimes (but not always, so watch where it is from)
                produced on smaller farms nearer to where it is sold. Organic
                farming tends to be better for the environment.
              </div>
              <div
                class="tab-pane fade text-muted"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                Higher nutrient content Reduced pesticide exposure Positive
                environmental impact Higher antioxidant content More healthy
                fats Possibly more antioxidants Less consumption of chemicals
                and resistant bacteria Lower nitrate levels Free from
                antibiotics and synthetic hormones Better welfare for animals
                raised organically
              </div>
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <h5 class="text-muted"> Here are the nutrition facts for one raw medium-sized {product.name}:</h5>
                <table class="table table-success table-striped">
                <thead>
                <tr class="table-success">
                <th scope="row">S.No.</th>
  <th class="table-success">Nutrients</th>
  <th class="table-success">Weight per 250g</th>
</tr>
</thead>
<tbody>
<tr class="table-success">
<th scope="row">1</th>
  <td class="table-success"> Calories</td>
  <td class="table-success">94.6 grams</td>
</tr><tr class="table-success">
<th scope="row">2</th>
  <td class="table-success"> Water</td>
  <td class="table-success">156 grams</td>
</tr><tr class="table-success">
<th scope="row">3</th>
  <td class="table-success"> Protien</td>
  <td class="table-success">0.436 grams</td>
</tr><tr class="table-success">
<th scope="row">4</th>
  <td class="table-success"> Sugar</td>
  <td class="table-success">18.9 grams</td>
</tr>
<tr class="table-success">
<th scope="row">5</th>
  <td class="table-success">Fiber</td>
  <td class="table-success">4.37 grams</td>
</tr><tr class="table-success">
<th scope="row">6</th>
  <td class="table-success">Fat</td>
  <td class="table-success">0.3 grams</td>
</tr>
</tbody>
</table>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
