import { AnalyticEventState, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentTimeSelector = (state: State) =>
  state[NameSpace.Data].currentTime;
export const getAnalyticEventsSelector = (state: State) =>
  state[NameSpace.Data].analyticEvents;
export const getIsUpdatingTimeFromCodeSelector = (state: State) =>
  state[NameSpace.Data].isUpdatingTimeFromCode;

export const getCurrentAnalyticEventsSelector = (state: State) =>
  // reselect в данной конфигурации стора пока не используем
  state[NameSpace.Data].analyticEvents.filter(
    (event) => event.state === AnalyticEventState.Current
  );

export const getIsDataLoading = (state: State) =>
  state[NameSpace.Data].isDataLoading;
