import { render, type RenderResult } from '@testing-library/react';

import { AppState } from './AppState';

import type { Children } from '../shared';

jest.mock('react-redux', () => ({
  Provider: ({ children }: Children) => <div data-testid="react-redux-provider">{children}</div>
}));

jest.mock('../ruuviTags/RuuviTagDataContext', () => ({
  RuuviTagDataContextProvider: ({ children }: Children) => <div data-testid="ruuvi-tag-data-context-provider">{children}</div>
}));

describe('AppState', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<AppState><div data-testid="children" /></AppState>);
  });

  it('should render react-redux provider', () => {
    expect(component.getByTestId('react-redux-provider')).toBeTruthy();
  });

  it('should render RuuviTag data context provider', () => {
    expect(component.getByTestId('ruuvi-tag-data-context-provider')).toBeTruthy();
  });

  it('should render inner content', () => {
    expect(component.getByTestId('children')).toBeTruthy();
  });
});
