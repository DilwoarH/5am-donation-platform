var stripe = Stripe('pk_live_bViOyjIuyMPMFeIBSkRV1FV000fkLhB6mF');

var checkoutButton = document.getElementById('checkout-button-plan_G2wvrRjaTDMeie');
var amount = document.getElementById('amount');
checkoutButton.addEventListener('click', function () {
  checkoutButton.disabled = true;
  // When the customer clicks on the button, redirect
  // them to Checkout.

  try {
    stripe.redirectToCheckout({
      items: [{plan: 'plan_G2wvrRjaTDMeie', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'https://5am.netlify.com/success.html',
      cancelUrl: 'https://5am.netlify.com/cancelled.html',
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });

  } catch (error) {
    var displayError = document.getElementById('error-message');
    displayError.textContent = error.message;
    amount.classList.add('govuk-input--error');
  }
});