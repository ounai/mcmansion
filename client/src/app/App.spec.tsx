import { render, within, type RenderResult } from '@testing-library/react';

import { App } from './App';

import type { Children } from '../shared';

jest.mock('./AppState', () => ({
  AppState: ({ children }: Children) => <div data-testid="AppState">{children}</div>
}));

jest.mock('../ruuviTags', () => ({
  RuuviTags: () => <div data-testid="RuuviTags" />
}));

jest.mock('../transit', () => ({
  Transit: () => <div data-testid="Transit" />
}));

jest.mock('../electricityPrices', () => ({
  ElectricityPrices: () => <div data-testid="ElectricityPrices" />
}));

jest.mock('./AppButtons', () => ({
  AppButtons: () => <div data-testid="AppButtons" />
}));

jest.mock('../clock', () => ({
  Clock: () => <div data-testid="Clock" />
}));

describe('App', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<App />);
  });

  it('should render AppState', () => {
    expect(component.getByTestId('AppState')).toBeTruthy();
  });

  it('should render Transit inside AppState', () => {
    const appState = component.getByTestId('AppState');

    expect(within(appState).getByTestId('Transit')).toBeTruthy();
  });

  it('should render RuuviTags inside AppState', () => {
    const appState = component.getByTestId('AppState');

    expect(within(appState).getByTestId('RuuviTags')).toBeTruthy();
  });

  it('should render ElectricityPrices inside AppState', () => {
    const appState = component.getByTestId('AppState');

    expect(within(appState).getByTestId('ElectricityPrices')).toBeTruthy();
  });

  it('should render AppButtons inside AppState', () => {
    const appState = component.getByTestId('AppState');

    expect(within(appState).getByTestId('AppButtons')).toBeTruthy();
  });

  it('should render Clock inside AppState', () => {
    const appState = component.getByTestId('AppState');

    expect(within(appState).getByTestId('Clock')).toBeTruthy();
  });
});
