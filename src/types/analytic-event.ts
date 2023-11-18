import { AnalyticEventState } from '../const';

export type AnalyticEvent = {
  timestamp: number;
  duration: number;
  zone: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

export type AnalyticEventApp = AnalyticEvent & {
  state: AnalyticEventState;
};
