import React from 'react';
import { useProductData } from '../../hooks/useProductData';
import { Product } from '../../model';
import { AppSection } from '../AppSection';
import { ProductDropdown } from '../ProductDropdown';

export const App = (): JSX.Element => {
  const { products } = useProductData();
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();

  return (
    <div className="m-6 flex flex-col gap-3 md:mx-10 lg:mx-20">
      <AppSection>
        <ProductDropdown
          data={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </AppSection>
    </div>
  );
};
