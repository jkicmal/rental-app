import React from 'react';

import { Screen } from '../../components/common';
import {
  CustomerShoppingCartProductsInteractiveTable,
  CustomerShoppingCartCheckoutForm
} from '../../components/customer';

const ScreensCustomerShoppingCart = () => (
  <Screen horizontalCenter>
    <CustomerShoppingCartProductsInteractiveTable />
    <CustomerShoppingCartCheckoutForm />
  </Screen>
);

export default ScreensCustomerShoppingCart;
