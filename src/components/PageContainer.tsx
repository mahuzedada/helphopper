import { ReactElement } from 'react';

type Props = {
  children: ReactElement | ReactElement[];
};
export default function PageContainer({ children }: Props) {
  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
      {children}
    </div>
  );
}
