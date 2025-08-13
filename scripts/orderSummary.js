
import {cart, remove_item, updateDeliveryId} from '../data/cart.js'
import { findItem, calculatePrice } from './funkcije.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js';
import { paymentSummary } from './paymentSummary.js';

function deliveryOptionHTML(pronadjen,c){
      
            let html = "";
            deliveryOptions.forEach((dOption) => {
            
            const isChecked = dOption.id === c.deliveryID;
            html += `
                    <div class="delivery-option js-delivery-option" data-delivery-id=${dOption.id} data-delivery-pronadjen=${pronadjen.id}>
                          <input type="radio" ${isChecked? 'checked' : ''}
                            class="delivery-option-input"
                            name="delivery-option-${pronadjen.id}">
                          <div>
                            <div class="delivery-option-date">
                              ${dayjs().add(dOption.deliveryDays, 'day').format('dddd, MMMM D')}
                            </div>
                            <div class="delivery-option-price">
                              ${dOption.deliveryPrice === 0? 'FREE' : `$${calculatePrice(dOption.deliveryPrice)} - `} Shipping
                            </div>
                          </div>
                    </div>
            `
          })
          return html;
        }
        
export function orderSummary(){
    
  let generateHTML = ''; 

    cart.forEach((c) => {

  let pronadjen = findItem(c);

  let ID = c.deliveryID;
  let matching;
  
  deliveryOptions.forEach((option) => {
    if(ID === option.id){
        matching = option;
    }
  })

  generateHTML += `<div class="cart-item-container">
            <div class="delivery-date">
             
              Delivery date: ${dayjs().add(matching.deliveryDays, 'day').format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${pronadjen.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${pronadjen.name}
                </div>
                <div class="product-price">
                  $${calculatePrice(pronadjen.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${c.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-deleted-id="${pronadjen.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(pronadjen, c)}
              </div>
            </div>
          </div>`

          // console.log(generateHTML);
  })

  document.querySelector('.js-order-summary').innerHTML = generateHTML;

  document.querySelectorAll('.js-delete').forEach((selected)=>{
  selected.addEventListener('click', ()=>{
    console.log('testttttttt')
      let productId = selected.dataset.deletedId;
      // console.log(productId);
      remove_item(productId);
      console.log(cart);
      orderSummary();
      paymentSummary();
      
     })
  })

  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', ()=>{
      let id = option.dataset.deliveryId;
      let pronadjenxd = option.dataset.deliveryPronadjen;
      updateDeliveryId(pronadjenxd, id);
       orderSummary();
       paymentSummary();
    })
  })


}






