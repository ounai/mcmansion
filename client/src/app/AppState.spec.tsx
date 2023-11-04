import { render, type RenderResult } from '@testing-library/react';

import { AppState } from './AppState';

import type { Children } from '../shared';

jest.mock('react-redux', () => ({
  Provider: ({ children }: Children) => <div data-testid="Provider">{children}</div>
}));

jest.mock('../ruuviTags', () => ({
  RuuviTagDataContextProvider: ({ children }: Children) => <div data-testid="RuuviTagDataContextProvider">{children}</div>
}));

describe('AppState', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<AppState><div data-testid="children" /></AppState>);
  });

  it('should render react-redux provider', () => {
    expect(component.getByTestId('Provider')).toBeTruthy();
  });

  it('should render RuuviTag data context provider', () => {
    expect(component.getByTestId('RuuviTagDataContextProvider')).toBeTruthy();
  });

  it('should render inner content', () => {
    expect(component.getByTestId('children')).toBeTruthy();
  });
});
