import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { ShoppingCartProduct } from '../model';
import { useShoppingCartStore } from './ShoppingCart';

const mockProduct1: ShoppingCartProduct = {
  id: '1',
  productName: 'Some Product 1',
  price: 10,
  taxRate: 10,
  quantity: 10,
  maxAmount: 100,
};

const mockProduct2: ShoppingCartProduct = {
  id: '2',
  productName: 'Some Product 2',
  price: 10,
  taxRate: 10,
  quantity: 90,
  maxAmount: 100,
};

const mockProducts1to10: ShoppingCartProduct[] = Array.from(
  Array(10).keys(),
).map((item) => ({
  id: `mockid${item}`,
  productName: `Product ${item}`,
  price: 10,
  taxRate: 10,
  quantity: 1,
  maxAmount: 100,
}));

describe('ShoppingCart store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useShoppingCartStore());

    // reset state
    act(() => {
      result.current.products = [];
    });
  });

  it('should return empty list', () => {
    const { result } = renderHook(() =>
      useShoppingCartStore((state) => state.products),
    );
    expect(result.current).toBeDefined();
    expect(result.current).toHaveLength(0);
  });

  it('should add product to list', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct1);
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(1);
  });

  it('should combine same product in list', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct1);
      await result.current.addProduct(mockProduct1);
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].quantity).toEqual(20);
  });

  it('should reject when exceeding max amount', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct2);
    });
    await act(async () => {
      await expect(result.current.addProduct(mockProduct2)).rejects.toThrow();
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].quantity).toEqual(90);
  });

  it('should add two products to list', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct1);
      await result.current.addProduct(mockProduct2);
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(2);
  });

  it('should remove product from list', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct1);
      await result.current.addProduct(mockProduct2);
    });
    act(() => {
      result.current.removeProduct(mockProduct1.id);
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toEqual(mockProduct2.id);
  });

  it('should clear cart', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      await result.current.addProduct(mockProduct1);
      await result.current.addProduct(mockProduct2);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(0);
  });

  it('should return max product amount', () => {
    const { result } = renderHook(() => useShoppingCartStore());
    expect(result.current.maxProductsInCart).toBeDefined();
    expect(result.current.maxProductsInCart).toEqual(10);
  });

  it('should reject when exceeding max amount of products in cart', async () => {
    const { result } = renderHook(() => useShoppingCartStore());
    await act(async () => {
      const promises = mockProducts1to10.map((prod) =>
        result.current.addProduct(prod),
      );
      await Promise.all(promises);
    });
    await act(async () => {
      await expect(result.current.addProduct(mockProduct2)).rejects.toThrow();
    });
    expect(result.current.products).toBeDefined();
    expect(result.current.products).toHaveLength(10);
  });
});
