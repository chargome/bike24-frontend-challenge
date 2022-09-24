export interface Product {
  id: string;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
}

export interface ShoppingCartProduct extends Product {
  quantity: number;
}
