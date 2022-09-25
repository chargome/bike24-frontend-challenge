import React from 'react';
import { Product } from '../../model';
import { getCalculatedPrice } from '../../util/price';

interface Props {
  data: Product[];
  selectedProduct?: Product;
  setSelectedProduct: (product: Product) => void;
}

export const ProductDropdown = ({
  data,
  selectedProduct,
  setSelectedProduct,
}: Props): JSX.Element => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = data.find(
        (product) => product.id === event.target.value,
      );
      if (selected) {
        setSelectedProduct(selected);
      }
    },
    [data, setSelectedProduct],
  );

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Product:</span>
      </label>
      <select
        className="select select-primary select-bordered"
        onChange={handleChange}
        value={selectedProduct?.id}
      >
        <option disabled selected>
          Select a product
        </option>
        {data
          .sort((a, b) => a.productName.localeCompare(b.productName))
          .map((product) => (
            <option key={product.id} value={product.id}>
              {`${product.productName} (€${getCalculatedPrice({
                price: product.price,
                taxRateInPercent: product.taxRate,
              })})`}
            </option>
          ))}
      </select>
    </div>
  );
};
