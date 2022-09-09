import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import statesReducer from '../redux/states/states';
import citiesReducer from '../redux/cities/cities';
import metricsReducer from '../redux/metrics/metrics';
import Cities from '../pages/Cities';

const initialState = {
  states: [],
  cities: ['Albany'],
  metrics: {},
};

const rootReducer = combineReducers({
  states: statesReducer,
  cities: citiesReducer,
  metrics: metricsReducer,
});

const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

describe('Cities Page', () => {
  it('renders City with name Albany', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cities />
        </BrowserRouter>
      </Provider>,
    );

    const nameElement = screen.getByText('Albany');
    expect(nameElement).toBeInTheDocument();
  });
});
