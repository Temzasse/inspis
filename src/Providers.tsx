import React from 'react';
import { StoreProvider } from './smook';
import store from './store';
import { BottomSheetProvider } from './components/common/BottomSheet';

const Providers: React.FC = ({ children }) => {
  return (
    <BottomSheetProvider blurTarget="root">
      <StoreProvider store={store}>{children}</StoreProvider>
    </BottomSheetProvider>
  );
};

export default Providers;
