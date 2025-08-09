export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2 
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 7
},{
  productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
  quantity: 6
},{
  productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
  quantity: 33
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
          quantity: 1
        });
      }

}

export function total_quantity(){
  
      let total = 0;

      cart.forEach((c) => {
        total = total + c.quantity;
      })

      document.querySelector('.js-cart-quantity').innerHTML = total;
}