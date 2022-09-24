import { ShoppingCartProduct } from '../model';
import create from 'zustand';

interface ShoppingCartStore {
  products: ShoppingCartProduct[];
  addProduct: (product: ShoppingCartProduct) => Promise<void>;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

const getStoredProductIndex = (
  products: ShoppingCartProduct[],
  newProduct: ShoppingCartProduct,
) => {
  return products.findIndex((p) => p.id === newProduct.id);
};

const canAddProduct = (
  storedProduct: ShoppingCartProduct,
  newProduct: ShoppingCartProduct,
) => {
  if (storedProduct.maxAmount < storedProduct.quantity + newProduct.quantity) {
    return false;
  }
  return true;
};

export const useShoppingCartStore = create<ShoppingCartStore>((set, get) => ({
  products: [],
  addProduct: async (product: ShoppingCartProduct) => {
    const products = get().products;
    const storedProductIndex = getStoredProductIndex(products, product);
    return new Promise((res, rej) => {
      if (storedProductIndex === -1) {
        set({ products: [...products, product] });
        res();
      }

      if (canAddProduct(products[storedProductIndex], product)) {
        const newProducts = [...products];
        newProducts[storedProductIndex].quantity += product.quantity;
        set({ products: newProducts });
        res();
      }

      rej('max quantity reached');
    });
  },
  removeProduct: (productId: string) =>
    set({
      products: get().products.filter((product) => product.id !== productId),
    }),
  clearCart: () => set({ products: [] }),
}));
