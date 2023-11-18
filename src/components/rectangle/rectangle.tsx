import { AnalyticEventApp } from '../../types/analytic-event';
import styles from './rectangle.module.css';

type RectangleProps = {
  analyticEvent: AnalyticEventApp;
  videoWidth: number;
  videoHeight: number;
};

function Rectangle({
  analyticEvent,
  videoWidth,
  videoHeight,
}: RectangleProps): JSX.Element {
  const { left, top, width, height } = analyticEvent.zone;
  const position = {
    top: (top / videoHeight) * 100 + '%',
    left: (left / videoWidth) * 100 + '%',
    width: (width / videoWidth) * 100 + '%',
    height: (height / videoHeight) * 100 + '%',
  };

  return <div style={{ ...position }} className={styles.rectangle}></div>;
}

export default Rectangle;
