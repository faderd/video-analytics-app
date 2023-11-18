import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { storeAnalyticEvents } from './video-slice/video-slice';
import { AnalyticEvent } from '../types/analytic-event';
import { initializeAnalyticEventsApp } from '../helpers/common';

export const fetchAnalyticEvents = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('video-slice/fetchAnalyticEvents', async (_, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<AnalyticEvent[]>(
      'https://run.mocky.io/v3/085041d6-c0a5-4d4c-8ba9-829a0212d75b'
    );

    const initializedAnalyticEvents = initializeAnalyticEventsApp(data);

    dispatch(storeAnalyticEvents(initializedAnalyticEvents));
  } catch (err) {
    console.error('Error fetching analytic events:', err);
  }
});
