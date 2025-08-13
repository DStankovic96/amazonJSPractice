import {cart} from '../data/cart.js'
import { findItem, calculatePrice } from './funkcije.js'
import { deliveryOptions } from '../data/deliveryOptions.js';

export function paymentSummary(){

  let zbir=0;
  let shiping=0;
  let bezTakse=0;
  let taksa=0;
  let total=0;
  let quantity=0;

  cart.forEach((c) => {
    let matchingItem = findItem(c);
    let matching;
    let ID = c.deliveryID;
    quantity += c.quantity;

    deliveryOptions.forEach((option) => {
        if(ID === option.id){
            matching = option;
        }
      });
    zbir += matchingItem.priceCents * c.quantity;
    shiping += matching.deliveryPrice;
  })
  bezTakse = zbir + shiping;
  taksa = bezTakse * 0.1;
  total = bezTakse + taksa;

  const paymentSummaryHTML = `
  
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${calculatePrice(zbir)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculatePrice(shiping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${calculatePrice(bezTakse)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${calculatePrice(taksa)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${calculatePrice(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}