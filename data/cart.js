export const cart = [];

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