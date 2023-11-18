import { store } from '../store';
import { AnalyticEventApp } from './analytic-event';

export type VideoSlice = {
  isDataLoading: boolean;
  currentTime: number;

  // флаг для определения, происходит ли обновление времени в результате изменения currentTime из кода или из события timeupdate
  isUpdatingTimeFromCode: boolean;

  analyticEvents: AnalyticEventApp[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
