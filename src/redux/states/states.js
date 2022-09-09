import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY, API_URL } from '../../api/APIConfig';

const GET_STATES = 'pollutionApp/GET_STATES';

const statesReducer = (state = [], action) => {
  switch (action.type) {
    case `${GET_STATES}/fulfilled`:
      return action.payload;
    default:
      return state;
  }
};

const transformData = (data) => data.map((obj) => obj.state);

export const getStates = createAsyncThunk(GET_STATES, async () => {
  const response = await fetch(`${API_URL}states?country=USA&${API_KEY}`);
  const data = await response.json();
  const transformed = transformData(data.data);

  return transformed;
});

export default statesReducer;
