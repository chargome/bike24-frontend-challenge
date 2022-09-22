import React from 'react';
import data from '../../data/products.json';

interface Product {
  id: string;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
}

export const useProductData = () => {
  const products = React.useState(data as Product[]);

  return {
    products,
  };
};
