/* eslint-disable */
import { showAlert } from './alert.js';
import axios from 'axios';
const stripe = Stripe(
  `pk_test_51TnFv6QnJWuvzwTo7mfVdUWf9avKrRUZQa1VD8BpINe48YLKdbkhdd2etvH8aCPLjWCrnWHxdJJZEOLeVYxVZuf100pOo2j2X4`,
);

export const bookTour = async (tourId) => {
  try {
    // 1) get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    //2) create checkout form + charge credit card
  } catch (error) {
    showAlert('error', error);
  }
};
