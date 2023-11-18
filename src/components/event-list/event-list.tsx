import { useAppSelector } from '../../hooks';
import { getAnalyticEventsSelector } from '../../store/video-slice/selectors';
import EventItem from '../event-item/event-item';
import styles from './event-list.module.css';

function EventList(): JSX.Element {
  const analyticEvents = useAppSelector(getAnalyticEventsSelector);

  return (
    <ul className={styles['event-list']}>
      {analyticEvents.map((event) => (
        <EventItem key={event.timestamp} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
