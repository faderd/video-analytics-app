import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCurrentTimeSelector,
  getIsUpdatingTimeFromCodeSelector,
} from '../../store/video-slice/selectors';
import {
  storeCurrentTime,
  storeIsUpdatingTimeFromCode,
} from '../../store/video-slice/video-slice';
import CurrentEventsRender from '../current-events-render/current-events-render';

type VideoPlayerProps = {
  videoUrl: string;
};

function VideoPlayer({ videoUrl }: VideoPlayerProps): JSX.Element {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTime = useAppSelector(getCurrentTimeSelector);

  // флаг для определения, происходит ли обновление времени в результате изменения currentTime из кода или из события timeupdate
  const isUpdatingTimeFromCode = useAppSelector(
    getIsUpdatingTimeFromCodeSelector
  );

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    const storeTimeHandler = () => {
      dispatch(storeCurrentTime(videoElement.currentTime));
    };

    videoElement.addEventListener('timeupdate', storeTimeHandler);

    return () => {
      videoElement.removeEventListener('timeupdate', storeTimeHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (isUpdatingTimeFromCode) {
      videoElement.currentTime = currentTime;
      dispatch(storeIsUpdatingTimeFromCode(false));
    }
  }, [currentTime, dispatch, isUpdatingTimeFromCode]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0, width: '1280px'}}>
      <video
        ref={videoRef}
        controls
        controlsList="nofullscreen"
        width='1280'
        onClick={(evt) => {
          evt.preventDefault();
          videoRef.current?.paused
            ? videoRef.current?.play()
            : videoRef.current?.pause();
        }}
      >
        <source src={videoUrl} type='video/mp4' />
      </video>


      <CurrentEventsRender videoRef={videoRef} />
    </div>
  );
}

export default VideoPlayer;
