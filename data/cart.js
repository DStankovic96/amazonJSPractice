
function saveToStorage(){
    localStorage.setItem('korpa', JSON.stringify(cart));
}

export let cart = JSON.parse(localStorage.getItem('korpa')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryID: '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 7,
  deliveryID: '2' 
},{
  productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
  quantity: 6,
  deliveryID: '2' 
},{
  productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
  quantity: 33,
  deliveryID: '3' 
}];

export function add_to_cart(productId){

        let matchingItem;

        cart.forEach((c)=> {
        //  console.log("test");
        if(productId === c.productId){
          matchingItem = c;
        }
        //  if(c.productId === productId){
        //     c.quantity++;
        });

      if(matchingItem){
        matchingItem.quantity++;
      }else{
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryID: '1'
        });
      }
      saveToStorage();

}

export function total_quantity(){
  
      let total = 0;

      cart.forEach((c) => {
        total = total + c.quantity;
      })

      document.querySelector('.js-cart-quantity').innerHTML = total;
}

export function remove_item(id){

    let newCart=[];

    cart.forEach((c) => {
      if(c.productId !== id){
        newCart.push(c);
      }
    })

    cart = newCart;
    saveToStorage();
    

}

export function updateDeliveryId(productId,id){
   
        let matchingItem;

        cart.forEach((c)=> {
        
        if(productId === c.productId){
          matchingItem = c;
        }
       
        });

        matchingItem.deliveryID = id;
        saveToStorage();
}