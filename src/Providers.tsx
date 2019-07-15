import React from 'react';
import { StoreProvider } from './smook';
import store from './store';

const Providers: React.FC = ({ children }) => {
  return (
    <StoreProvider store={store}>
      {children}
    </StoreProvider>
  );
}

export default Providers;
