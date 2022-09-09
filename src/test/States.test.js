import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import statesReducer from '../redux/states/states';
import citiesReducer from '../redux/cities/cities';
import metricsReducer from '../redux/metrics/metrics';
import States from '../pages/States';

const initialState = {
  states: ['California', 'Arkansas'],
  cities: [],
  metrics: {},
};

const rootReducer = combineReducers({
  states: statesReducer,
  cities: citiesReducer,
  metrics: metricsReducer,
});

const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

describe('States Page', () => {
  it('renders State with name California', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <States />
        </BrowserRouter>
      </Provider>,
    );

    const nameElement = screen.getByText('California');
    expect(nameElement).toBeInTheDocument();
  });
});
