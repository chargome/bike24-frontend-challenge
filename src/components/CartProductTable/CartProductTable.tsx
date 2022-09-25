import React from 'react';
import { DeleteIcon } from '../../icons';
import { useShoppingCartStore } from '../../store';
import { calculateTotalOfCart, getCalculatedPrice } from '../../util/price';

export const CartProductTable = (): JSX.Element => {
  const [products, removeProduct] = useShoppingCartStore((state) => [
    state.products,
    state.removeProduct,
  ]);

  const getTotal = React.useCallback(
    () => calculateTotalOfCart(products),
    [products],
  );

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th className="text-end">Price per unit</th>
            <th className="text-end">Quantity</th>
            <th className="text-end">Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <td>{product.productName}</td>
              <td className="text-end">{product.price}</td>
              <td className="text-end">{product.quantity}</td>
              <td className="text-end">
                {getCalculatedPrice({
                  price: product.price,
                  taxRateInPercent: product.taxRate,
                  quantity: product.quantity,
                })}
              </td>
              <td>
                <button
                  className="btn btn-error btn-outline btn-circle"
                  onClick={() => removeProduct(product.id)}
                  data-testid={`delete-icon-${product.id}`}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
          <tr className="text-primary text-end font-bold">
            <td colSpan={4}>Total</td>
            <td>{getTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
