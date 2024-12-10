'use client';

import { Provider as ReduxProvider } from 'react-redux';
import ClientOnly from '../ClientOnly/ClientOnly';
import { store } from '@/app/redux/store';
import { buildProvidersTree } from '@/lib/providerComposition';

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  const ProvidersTree = buildProvidersTree([
    [ClientOnly, {}],
    [ReduxProvider, { store }],
    // [UserDataProvider, {}],
  ]);
  return (
    <ProvidersTree>
      <div>{children}</div>
    </ProvidersTree>
  );
};

export default Container;
