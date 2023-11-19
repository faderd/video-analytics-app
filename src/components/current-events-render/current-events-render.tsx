import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getCurrentAnalyticEventsSelector } from '../../store/video-slice/selectors';
import Rectangle from '../rectangle/rectangle';

type CurrentEventsRenderProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const CurrentEventsRender = memo(function CurrentEventsRender({
  videoRef,
}: CurrentEventsRenderProps): JSX.Element {
  const currentAnalyticEvents = useAppSelector(
    getCurrentAnalyticEventsSelector
  );

  const videoWidth = videoRef.current?.videoWidth || 0;
  const videoHeight = videoRef.current?.videoHeight || 0;

  return (
    <>
      {currentAnalyticEvents.map((event) => (
        <Rectangle
          key={event.timestamp}
          analyticEvent={event}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
        />
      ))}
    </>
  );
});

export default CurrentEventsRender;
