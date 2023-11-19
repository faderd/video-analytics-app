import { AnalyticEventState, NameSpace } from '../../const';
import { initializeAnalyticEventsApp } from '../../helpers/common';
import { getMockAnalyticEvents } from '../../helpers/mock-data';
import { AnalyticEventApp } from '../../types/analytic-event';
import { State } from '../../types/state';
import {
  getAnalyticEventsSelector,
  getCurrentAnalyticEventsSelector,
  getCurrentTimeSelector,
  getIsDataLoading,
  getIsUpdatingTimeFromCodeSelector,
} from './selectors';
import { getInitialStateVideoSlice } from './video-slice';

const getAllEventsAreCurrent = (events: AnalyticEventApp[]) =>
  events.map((event) => ({ ...event, state: AnalyticEventState.Current }));

describe('Video Slice Selectors', () => {
  const mockState: State = {
    [NameSpace.Data]: {
      ...getInitialStateVideoSlice(),
      analyticEvents: initializeAnalyticEventsApp(getMockAnalyticEvents()),
    },
  };

  it('should return currentTime from state', () => {
    const { currentTime } = mockState[NameSpace.Data];
    const result = getCurrentTimeSelector(mockState);
    expect(result).toEqual(currentTime);
  });

  it('should return analyticEvents from state', () => {
    const { analyticEvents } = mockState[NameSpace.Data];
    const result = getAnalyticEventsSelector(mockState);
    expect(result).toEqual(analyticEvents);
  });

  it('should return isUpdatingTimeFromCode from state', () => {
    const { isUpdatingTimeFromCode } = mockState[NameSpace.Data];
    const result = getIsUpdatingTimeFromCodeSelector(mockState);
    expect(result).toEqual(isUpdatingTimeFromCode);
  });

  it('should return empty [] current events from state with no current events', () => {
    const result = getCurrentAnalyticEventsSelector(mockState);
    expect(result).toEqual([]);
  });

  it('should return all events from state with all events are current', () => {
    const { analyticEvents } = mockState[NameSpace.Data];

    // Установим состояние всех событий в  AnalyticEventState.Current
    const allEventsCurrentState = getAllEventsAreCurrent(analyticEvents);

    const stateWithAnalyticEvents = {
      [NameSpace.Data]: { ...getInitialStateVideoSlice(), analyticEvents: allEventsCurrentState },
    };

    const result = getCurrentAnalyticEventsSelector(stateWithAnalyticEvents);

    expect(result).toEqual(allEventsCurrentState);
});
  it('should return isDataLoading from state', () => {
    const { isDataLoading } = mockState[NameSpace.Data];
    const result = getIsDataLoading(mockState);
    expect(result).toEqual(isDataLoading);
  });
});
