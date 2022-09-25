import { ShoppingCartProduct } from '../model';
import { calculateTotalOfCart } from './price';

const item1: ShoppingCartProduct = {
  id: '1',
  productName: 'EBIKE',
  price: 10,
  taxRate: 10,
  quantity: 10,
  maxAmount: 100,
};
const item2: ShoppingCartProduct = {
  id: '2',
  productName: 'EBIKE2',
  price: 10,
  taxRate: 10,
  quantity: 5,
  maxAmount: 30,
};

calculateTotalOfCart;
describe('util: price', () => {
  it('should calculate total of 1 item', () => {
    expect(calculateTotalOfCart([item1])).toEqual(100);
  });

  it('should calculate total of 2 items', () => {
    expect(calculateTotalOfCart([item1, item2])).toEqual(150);
  });
});
