import React from 'react';

import { MaterialTableBase } from '../common';
import { formatPrice } from '../../helpers/formatters';

const CustomerShoppingCartProductsInteractiveTable = ({ products, onProductDelete }) => {
  return (
    <MaterialTableBase
      options={{
        search: true,
        paging: true,
      }}
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Price / Day', render: (rowData) => formatPrice(rowData.price) },
        { title: 'Deposit', render: (rowData) => formatPrice(rowData.deposit) },
        { title: 'Category', field: 'categoryName' },
      ]}
      data={products.map((product) => ({ ...product }))}
      title="Products"
      editable={{
        onRowDelete: (product) => onProductDelete(product),
      }}
    />
  );
};

export default CustomerShoppingCartProductsInteractiveTable;
