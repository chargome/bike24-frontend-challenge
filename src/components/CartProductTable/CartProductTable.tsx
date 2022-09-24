import { useShoppingCartStore } from '../../store';

export const CartProductTable = (): JSX.Element => {
  const products = useShoppingCartStore((state) => state.products);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
