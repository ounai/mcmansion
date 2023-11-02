import { Provider } from 'react-redux';

import { store } from '../state';

import { RuuviTagDataContextProvider } from '../ruuviTags';

import type { Children } from '../shared';

export const AppState = ({ children }: Children) => {
  return (
    <Provider store={store}>
      <RuuviTagDataContextProvider>
        {children}
      </RuuviTagDataContextProvider>
    </Provider>
  );
};
