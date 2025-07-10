import { cart,removefromcart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {delivaryoption} from "../data/delivaryoption.js";

hello();
const today = dayjs();
const deliverydate=today.add(7,'days');
console.log(deliverydate.format('dddd MMMM D'));



let cartsummaryHTML = '';
cart.forEach((cartItem)=>{
    const cartproductId = cartItem.productId;
    let matchingproduct;                            /*deduplicating data : we only used product id to obtain this product detials like 
    image,name etc.*/
    products.forEach((product)=>{
        if(product.id===cartproductId){
           matchingproduct = product;
        }
        

    });

    const delivaryoptionid = cartItem.delivaryoptionid;
    let delivaryoptions ;
    delivaryoption.forEach((option)=>{
       if(option.id===delivaryoptionid){
        delivaryoptions = option;

       }
    });
    const today = dayjs();
    const delivarydate = today.add(delivaryoptions.delivarydays,'days');
    const datestring = delivarydate.format('dddd, MMMM D');
    
    cartsummaryHTML+= `
  <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
   <div class="delivery-date">
   Delivery date: ${datestring}
   </div>

   <div class="cart-item-details-grid">
   <img class="product-image"
       src="${matchingproduct.image}">

    <div class="cart-item-details">
       <div class="product-name">
       ${matchingproduct.name}
       </div>
       <div class="product-price">
       $${formatcurrency(matchingproduct.priceCents)}
       </div>
       <div class="product-quantity">
       <span>
           Quantity: <span class="quantity-label">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary">
           Update
       </span>
       <span class="delete-quantity-link link-primary js-dele-link" data-product-id="${matchingproduct.id}">
           Delete
       </span>
       </div>
   </div>

    <div class="delivery-options">
       <div class="delivery-options-title">
       Choose a delivery option:
       </div>
      ${delivaryoptionshtml(matchingproduct,cartItem)}
   </div>
   </div>
   </div>

`
});

function delivaryoptionshtml(matchingproduct,cartItem){
let html = '';
      delivaryoption.forEach((delivaryoption)=>{
        const today = dayjs();
        const delivarydate = today.add(delivaryoption.delivarydays,'days');
        const datestring = delivarydate.format('dddd, MMMM D');
        const pricestring = delivaryoption.pricecents===0?'FREE':`$${formatcurrency(delivaryoption.pricecents)} -`;

     const ischecked = delivaryoption.id === cartItem.delivaryoptionid;

        html +=  `<div class="delivery-option">
       <input type="radio"
       ${ischecked? 'checked':'' }
           class="delivery-option-input"
           name="delivery-option-${matchingproduct.id}">
       <div>
           <div class="delivery-option-date">
           ${datestring}
           </div>
           <div class="delivery-option-price">
           ${pricestring} - Shipping
           </div>
       </div>
       </div>
       `

      });

      return html;
}


document.querySelector('.js-order-summary').innerHTML =cartsummaryHTML;

document.querySelectorAll('.js-dele-link')
.forEach((link)=>{
    link.addEventListener("click",()=>{
        const  productId = link.dataset.productId;
        removefromcart(productId);

        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        

    });


});
