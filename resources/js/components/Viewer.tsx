import { useState, useEffect, useRef } from 'react';
import ItemViewerPlaceholder from './ItemViewerPlaceholder';
import calculateAvailableHeight from './Util/getAvailableHeight';

// Handlers keyed by the viewer's postMessage `fire` name, e.g. 'viewer:sequence:change'
export type ViewerEvents = Partial<Record<string, (message: unknown) => void>>;

interface ViewerProps {
  title: string;
  url: string;
  events?: ViewerEvents;
}

const Viewer = ({ title, url, events = {} }: ViewerProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [iFrameHeight, setIFrameHeight] = useState<number>(0);

  const iFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIFrameHeight(calculateAvailableHeight());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIFrameHeight(calculateAvailableHeight());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const viewerOrigin = new URL(url).origin;

    // Listen for events from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== viewerOrigin) {
        return;
      }
      if (!JSON.parse(event.data)) {
        return;
      }
      const parsedEvent = JSON.parse(event.data);
      if (parsedEvent.fire === 'viewer:contentready') {
        setIsLoaded(true);
      }
      events[parsedEvent.fire]?.(parsedEvent.message);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [url, events]);

  return (
    <>
      {!isLoaded && iFrameHeight > 0 && <ItemViewerPlaceholder height={iFrameHeight} />}

      <iframe
        role='main'
        onError={(e) => {
          return console.error('iframe failed to load:', e);
        }}
        style={{
          height: iFrameHeight,
          width: '100%',
        }}
        title={title}
        id='mainContent'
        className={!isLoaded ? 'widget book' : 'widget book viewerLoaded'}
        name='book'
        allowFullScreen={true}
        // TODO: temporary, Mirador 4 embed does not send viewer:contentready
        onLoad={() => setIsLoaded(true)}
        src={`${url}?embed=true`}
        ref={iFrameRef}
      />
    </>
  );
};

export default Viewer;
