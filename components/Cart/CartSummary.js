import React from 'react';
import { Divider, Segment, Button } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import StripeCheckout from 'react-stripe-checkout';

function CartSummary({ products , handleCheckout, success}) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (<>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong> ${cartAmount}
      <StripeCheckout
        name="React Reserve"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_51KFDHiG5oAmp8CD2U98QCGpTLBMjuoUSSyApji87bhNXjAP1AOEUlu4UjA2hHaEL35nhFiCrWzxBcxNZOnK7Xr4h00udGJFX9j"
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button
          icon="cart"
          color="teal"
          floated="right"
          disabled={isCartEmpty || success}
          content="Checkout"
        />
      </StripeCheckout>

    </Segment>

  </>);

}

export default CartSummary;
