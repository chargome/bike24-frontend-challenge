import { useShoppingCartStore } from '../../store';

export const CartActionArea = (): JSX.Element => {
  const [productLenght, clearCart] = useShoppingCartStore((state) => [
    state.products.length,
    state.clearCart,
  ]);

  return (
    <div className="flex justify-end gap-3">
      <button disabled={productLenght < 1} className="btn btn-primary w-40">
        Buy
      </button>
      <button
        disabled={productLenght < 1}
        className="btn btn-outline btn-error"
        onClick={clearCart}
      >
        Clear entire cart
      </button>
    </div>
  );
};
