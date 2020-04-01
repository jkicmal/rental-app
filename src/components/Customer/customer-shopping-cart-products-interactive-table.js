import React from 'react';

import { MaterialTableBase } from '../common';

const CustomerShoppingCartProductsInteractiveTable = ({ products, onProductDelete }) => {
  const productsData = products.map(product => ({
    ...product,
    categoryName: !!product.category ? product.category.name : 'None',
    price: Number(product.price).toFixed(2),
    deposit: Number(product.price).toFixed(2)
  }));

  return (
    <MaterialTableBase
      options={{
        search: true,
        paging: true
      }}
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Price (PLN)', field: 'price' },
        { title: 'Deposit (PLN)', field: 'deposit' },
        { title: 'Category', field: 'categoryName' }
      ]}
      data={productsData}
      title="Products"
      editable={{
        onRowDelete: product => Promise.resolve(onProductDelete(product))
      }}
    />
  );
};

export default CustomerShoppingCartProductsInteractiveTable;
