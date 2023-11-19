import { AnalyticEventState } from '../../const';
import { initializeAnalyticEventsApp } from '../../helpers/common';
import { getMockAnalyticEvents } from '../../helpers/mock-data';
import { VideoSlice } from '../../types/state';
import { fetchAnalyticEvents } from '../api-actions';
import {
  getInitialStateVideoSlice,
  storeAnalyticEvents,
  storeCurrentTime,
  storeIsUpdatingTimeFromCode,
  videoSlice,
} from './video-slice';

describe('Video Slice', async () => {
  let initialState: VideoSlice;

  beforeEach(() => {
    initialState = getInitialStateVideoSlice();
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = videoSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = videoSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  // reducers===================================================================
  it('should update state.currentTime and state.analyticEvents.state by storeCurrentTime', () => {
    const result = videoSlice.reducer(
      {
        ...initialState,
        analyticEvents: initializeAnalyticEventsApp(getMockAnalyticEvents(1)),
      },
      storeCurrentTime(100)
    );
    const expectedState = {
      ...initialState,
      currentTime: 100,
      analyticEvents: [
        {
          ...initializeAnalyticEventsApp(getMockAnalyticEvents(1))[0],
          state: AnalyticEventState.Did,
        },
      ],
    };

    expect(result).toEqual(expectedState);
  });

  it('should update state.isUpdatingTimeFromCode by storeIsUpdatingTimeFromCodestoreIsUpdatingTimeFromCode', () => {
    const result = videoSlice.reducer(
      initialState,
      storeIsUpdatingTimeFromCode(true)
    );

    expect(result).toEqual({ ...initialState, isUpdatingTimeFromCode: true });
  });

  it('should update state.analyticEvents by storeAnalyticEvents', () => {
    const result = videoSlice.reducer(
      initialState,
      storeAnalyticEvents(initializeAnalyticEventsApp(getMockAnalyticEvents()))
    );
    const expectedState = {
      ...initialState,
      analyticEvents: initializeAnalyticEventsApp(getMockAnalyticEvents()),
    };

    expect(result).toEqual(expectedState);
  });

  // extra reducers=============================================================
  it('should set "isDataLoading" to "true" with "fetchAnalyticEvents.pending"', () => {
    const expectedState = { ...initialState, isDataLoading: true };
    const result = videoSlice.reducer(undefined, fetchAnalyticEvents.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isDataLoading" to "false" with "fetchAnalyticEvents.fulfilled"', () => {
    const expectedState = { ...initialState, isDataLoading: false };
    const result = videoSlice.reducer(undefined, fetchAnalyticEvents.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "isDataLoading" to "false" with "fetchAnalyticEvents.rejected"', () => {
    const expectedState = { ...initialState, isDataLoading: false };
    const result = videoSlice.reducer(undefined, fetchAnalyticEvents.rejected);

    expect(result).toEqual(expectedState);
  });
});
