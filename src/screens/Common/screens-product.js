import React from 'react';

import { Screen } from '../../components/common';
import { ProductContainer } from '../../components/shared';

const ScreensProduct = (props) => {
  const productId = props.match.params.productId;
  return (
    <Screen>
      <ProductContainer productId={productId} />
    </Screen>
  );
};

export default ScreensProduct;
