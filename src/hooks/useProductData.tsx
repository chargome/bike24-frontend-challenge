import React from 'react';
import data from '../../data/products.json';
import { Product } from '../model';

export const useProductData = () => {
  const [products] = React.useState(data as Product[]);

  return {
    products,
  };
};
