
import {products} from '../data/products.js'

export function calculatePrice(c){
    return ((c/100).toFixed(2));
}

export function findItem(c){
  
    let matchingItem;

    products.forEach((ceoItem) =>{
    

    if (c.productId === ceoItem.id) {
      matchingItem = ceoItem;
      // console.log(matchingItem);
    }
    
  })

  return matchingItem;

}