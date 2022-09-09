import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './cities/cities';
import metricsReducer from './metrics/metrics';
import statesReducer from './states/states';

const store = configureStore({
  reducer: {
    states: statesReducer,
    cities: citiesReducer,
    metrics: metricsReducer,
  },
});

export default store;
