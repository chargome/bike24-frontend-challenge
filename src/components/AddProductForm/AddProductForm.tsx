import React from 'react';
import { useProductData } from '../../hooks';
import { Product } from '../../model';
import { ProductDropdown } from '../ProductDropdown';
import { ProductQuantityInput } from '../ProductQuantityInput';

export const AddProductForm = (): JSX.Element => {
  const { products } = useProductData();
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [quantity, setQuantity] = React.useState(0);

  // resets quantity to 1 whenever a new product is selected
  React.useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <ProductDropdown
          data={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
        <ProductQuantityInput
          value={quantity}
          setValue={setQuantity}
          maxAmount={selectedProduct?.maxAmount || 1}
          disabled={!selectedProduct}
        />
      </div>
      <button className="btn btn-primary w-60">Add to cart</button>
    </div>
  );
};
