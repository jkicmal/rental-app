import React from 'react';

import StoreCategory from '../Category';

const StoreCategoryList = ({ categories }) => {
  return categories.map(category => <StoreCategory key={category.id} category={category} />);
};

export default StoreCategoryList;
