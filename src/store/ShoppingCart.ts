import { ShoppingCartProduct } from '../model';
import create from 'zustand';

const MAX_PRODUCTS_IN_CART = 10;

interface ShoppingCartStore {
  products: ShoppingCartProduct[];
  maxProductsInCart: number;
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
  maxProductsInCart: MAX_PRODUCTS_IN_CART,
  addProduct: async (product: ShoppingCartProduct) => {
    const products = get().products;
    const maxAmount = get().maxProductsInCart;
    const storedProductIndex = getStoredProductIndex(products, product);
    return new Promise((res, rej) => {
      // new product
      if (storedProductIndex === -1) {
        if (products.length < maxAmount) {
          set({ products: [...products, product] });
          res();
        }
        rej('max product amount reached');
      }

      // existing product
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
