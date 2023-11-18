import './global.css';
import styles from './app.module.css';
import EventList from './components/event-list/event-list';
import VideoPlayer from './components/video-player/video-player';
import { useAppDispatch } from './hooks';
import { fetchAnalyticEvents } from './store/api-actions';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnalyticEvents());
  }, [dispatch]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles['main__event-list']}>
          <EventList />
        </div>
        <VideoPlayer
          videoUrl={
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        />
      </div>
    </>
  );
}

export default App;
