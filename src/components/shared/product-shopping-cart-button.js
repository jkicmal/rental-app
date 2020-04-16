import React from 'react';

import Button from '@material-ui/core/Button';

export default function ProductShoppingCartButton({
  isCustomer,
  productInShoppingCart,
  productAvailableItemsCount,
  onRemove,
  onAdd,
}) {
  if (!isCustomer) return null;

  return (
    // NOTE: You 'key' attribute to force re-render every time key changes
    <div key={productInShoppingCart}>
      {productInShoppingCart ? (
        <Button style={{ width: '100%' }} onClick={onRemove}>
          REMOVE FROM SHOPPING CART
        </Button>
      ) : (
        <Button
          disabled={productAvailableItemsCount === 0}
          style={{ width: '100%' }}
          onClick={onAdd}
        >
          ADD TO SHOPPING CART
        </Button>
      )}
    </div>
  );
}
