import { useShoppingCartStore } from '../../store';
import { calculateTotalOfCart } from '../../util/price';
import { ProductAmountProgress } from '../ProductAmountProgress';

export const CartActionArea = (): JSX.Element => {
  const [products, maxProductsInCart, clearCart] = useShoppingCartStore(
    (state) => [state.products, state.maxProductsInCart, state.clearCart],
  );

  if (products.length < 1) {
    return (
      <div className="text-primary my-5 text-center">
        Add some products to your cart!
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title">Products in Cart</div>
          <ProductAmountProgress
            current={products.length}
            max={maxProductsInCart}
          />
        </div>
        <div className="stat">
          <div className="stat-title">Total cart value</div>
          <div className="stat-value">{calculateTotalOfCart(products)}</div>
          <div className="stat-actions">
            <button
              disabled={products.length < 1}
              className="btn btn-success mr-3 w-40"
            >
              Buy
            </button>
            <button
              disabled={products.length < 1}
              className="btn btn-outline btn-error"
              onClick={clearCart}
            >
              Clear entire cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
