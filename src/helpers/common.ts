import { AnalyticEventState } from '../const';
import { AnalyticEvent, AnalyticEventApp } from '../types/analytic-event';

/**
 * Принимает число, возвращает строку
 * в формате MM:SS:sss (минуты:секунды:миллисекунды).
 * Пример: 00:03:012, 01:05:123, 03:26:100.
 */
export const timeHumanize = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const milliseconds = Math.round(
    (remainingSeconds - Math.floor(remainingSeconds)) * 1000
  );

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0');
  const paddedMilliseconds = String(milliseconds).padStart(3, '0');

  return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
};

/**
 * Инициализирует полученные с сервера события аналитики:
 * добавит поле state, и отсортирует по времени наступления события.
 */
export const initializeAnalyticEventsApp = (
  events: AnalyticEvent[]
): AnalyticEventApp[] => {
  return events
    .map((event) => ({
      ...event,
      state: AnalyticEventState.Default,
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Устанавливает состояние события в зависимости от текущего времени видео.
 */
export const setEventStateByCurrentTime = (
  currentTime: number,
  analyticEvents: AnalyticEventApp[]
): AnalyticEventApp[] => {
  return analyticEvents.map((event) => {
    if (
      event.timestamp <= currentTime &&
      event.timestamp + event.duration >= currentTime
    ) {
      event.state = AnalyticEventState.Current;
    } else if (event.timestamp < currentTime) {
      event.state = AnalyticEventState.Did;
    } else {
      event.state = AnalyticEventState.Default;
    }

    return event;
  });
};
