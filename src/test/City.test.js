import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import statesReducer from '../redux/states/states';
import citiesReducer from '../redux/cities/cities';
import metricsReducer from '../redux/metrics/metrics';
import City from '../pages/City';

const initialState = {
  states: [],
  cities: [],
  metrics: {
    city: 'Albany',
    state: 'California',
    country: 'USA',
    current: {
      weather: {
        tp: 15,
        hu: 56,
        pr: 760,
        ws: 3.2,
      },
      pollution: { aqius: 46, mainus: 'p2' },
    },
  },
};

const rootReducer = combineReducers({
  states: statesReducer,
  cities: citiesReducer,
  metrics: metricsReducer,
});

const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

describe('City Page', () => {
  it('renders temperature in celsius', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <City />
        </BrowserRouter>
      </Provider>,
    );

    const nameElement = screen.getByText('56%');
    expect(nameElement).toBeInTheDocument();
  });

  it('renders humidity in percents', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <City />
        </BrowserRouter>
      </Provider>,
    );

    const nameElement = screen.getByText('15°C');
    expect(nameElement).toBeInTheDocument();
  });

  it('renders wind speed in km/h', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <City />
        </BrowserRouter>
      </Provider>,
    );

    const nameElement = screen.getByText('3.2km/h');
    expect(nameElement).toBeInTheDocument();
  });
});
