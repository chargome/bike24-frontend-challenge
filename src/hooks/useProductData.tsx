import data from '../../data/products.json';

interface Product {
  id: string;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
}

export const useProductData = () => {
  return {
    products: data as Product[],
  };
};
