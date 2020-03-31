import React from 'react';

import { StoreCategory } from '.';

const StoreCategoryList = ({ categories }) => {
  return categories.map(category => <StoreCategory key={category.id} category={category} />);
};

export default StoreCategoryList;
