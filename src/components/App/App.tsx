import { AddProductForm } from '../AddProductForm';
import { AppSection } from '../AppSection';
import { CartActionArea } from '../CartActionArea';
import { CartProductTable } from '../CartProductTable';
import { Notification } from '../Notification';

export const App = (): JSX.Element => {
  return (
    <>
      <div className="m-6 flex flex-col gap-3 md:mx-10 lg:mx-20">
        <AppSection>
          <AddProductForm />
        </AppSection>
        <AppSection>
          <CartProductTable />
        </AppSection>
        <CartActionArea />
      </div>
      <Notification />
    </>
  );
};
