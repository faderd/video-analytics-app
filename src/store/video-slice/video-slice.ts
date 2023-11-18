import { NameSpace } from '../../const';
import { AnalyticEventApp } from '../../types/analytic-event';
import { VideoSlice } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAnalyticEvents } from '../api-actions';
import { setEventStateByCurrentTime } from '../../helpers/common';

export const getInitialStateVideoSlice = (): VideoSlice => ({
  isDataLoading: false,
  currentTime: 0,
  isUpdatingTimeFromCode: false,
  analyticEvents: [],
});

export const videoSlice = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateVideoSlice(),
  reducers: {
    storeCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;

      state.analyticEvents = setEventStateByCurrentTime(
        action.payload,
        state.analyticEvents
      );
    },
    storeIsUpdatingTimeFromCode: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingTimeFromCode = action.payload;
    },
    storeAnalyticEvents: (state, action: PayloadAction<AnalyticEventApp[]>) => {
      state.analyticEvents = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAnalyticEvents.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchAnalyticEvents.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchAnalyticEvents.rejected, (state) => {
        state.isDataLoading = false;
      });
  },
});

export const {
  storeCurrentTime,
  storeAnalyticEvents,
  storeIsUpdatingTimeFromCode,
} = videoSlice.actions;
