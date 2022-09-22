import { HasChildren } from '../../model';

export const AppSection = ({ children }: HasChildren): JSX.Element => {
  return <div className="rounded-sm border-2 p-3">{children}</div>;
};
