export let cart = JSON.parse(localStorage.getItem('cart'));
                  
     if(!cart){
      cart=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        delivaryoptionid:'1'
      },
      {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
         delivaryoptionid:'2'
      }];
     }


function savetothelocalstorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){        /* checking product id in the button and product id in the cart*/
        matchingItem = cartItem;
      }
    });
    if(matchingItem){                            /* if it is truthy means add the quantity*/
      matchingItem.quantity+=1;
  
    }
    else{
      cart.push({
        productId:productId,
        quantity: 1,
         delivaryoptionid:'1'
      });
    }
  savetothelocalstorage();
  
  }

  export function removefromcart(productId){
    const newcart = [];
    cart.forEach((cartItem)=>{
           if(cartItem.productId!==productId){
            newcart.push(cartItem);
           }

    });
    cart = newcart;
  savetothelocalstorage();
  }