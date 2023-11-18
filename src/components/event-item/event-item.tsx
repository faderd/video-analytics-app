import classNames from 'classnames';
import { timeHumanize } from '../../helpers/common';
import { useAppDispatch } from '../../hooks';
import {
  storeCurrentTime,
  storeIsUpdatingTimeFromCode,
} from '../../store/video-slice/video-slice';
import { AnalyticEventApp } from '../../types/analytic-event';
import styles from './event-item.module.css';
import { AnalyticEventState } from '../../const';

type EventItemProps = {
  event: AnalyticEventApp;
};

function EventItem({ event }: EventItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const getClassName = () =>
    classNames(styles.item, {
      [styles['item--did']]: event.state === AnalyticEventState.Did,
      [styles['item--current']]: event.state === AnalyticEventState.Current,
    });

  const clickHandler = () => {
    dispatch(storeIsUpdatingTimeFromCode(true));
    dispatch(storeCurrentTime(event.timestamp));
  };

  return (
    <li className={getClassName()} onClick={clickHandler}>
      {timeHumanize(event.timestamp)}
    </li>
  );
}

export default EventItem;
