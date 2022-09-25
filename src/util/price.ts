import { ShoppingCartProduct } from '../model';

interface GetCalculatedPriceArgs {
  price: number;
  taxRateInPercent: number;
  quantity?: number;
}

export const roundPrice = (total: number) => Math.round(total * 100) / 100;

export const getCalculatedPrice = ({
  price,
  quantity = 1,
}: GetCalculatedPriceArgs) => {
  return roundPrice(price * quantity); // todo: clarify
};

export const calculateTotalOfCart = (products: ShoppingCartProduct[]) => {
  const total = 0;
  return roundPrice(
    products.reduce(
      (prev, current) =>
        prev +
        getCalculatedPrice({
          price: current.price,
          taxRateInPercent: current.taxRate,
          quantity: current.quantity,
        }),
      total,
    ),
  );
};
