import React from 'react';
import { useDebouncedValue, useProductData } from '../../hooks';
import { Product } from '../../model';
import { useNotificationStore, useShoppingCartStore } from '../../store';
import { getCalculatedPrice } from '../../util/price';
import { ProductDropdown } from '../ProductDropdown';
import { ProductQuantityInput } from '../ProductQuantityInput';

export const AddProductForm = (): JSX.Element => {
  const { products } = useProductData();
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [quantity, setQuantity] = React.useState(0);
  const debouncedQuantity = useDebouncedValue(quantity.toString());
  const addProduct = useShoppingCartStore((state) => state.addProduct);
  const showNotification = useNotificationStore((state) => state.show);

  const getTotal = React.useCallback(() => {
    if (selectedProduct) {
      return getCalculatedPrice({
        price: selectedProduct.price,
        taxRateInPercent: selectedProduct.taxRate,
        quantity: Number(debouncedQuantity),
      });
    }
  }, [debouncedQuantity, selectedProduct]);

  const handleAddProduct = React.useCallback(async () => {
    if (selectedProduct) {
      try {
        await addProduct({ ...selectedProduct, quantity });
        setQuantity(1);
      } catch (error) {
        showNotification(error as string, 'error');
      }
    }
  }, [addProduct, quantity, selectedProduct, showNotification]);

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
      {selectedProduct && <div>{`Total: ${getTotal()}`}</div>}
      <button
        onClick={handleAddProduct}
        className="btn btn-primary w-60"
        disabled={!selectedProduct}
      >
        Add to cart
      </button>
    </div>
  );
};
