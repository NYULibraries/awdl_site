import BookLayout from '@/layouts/BookLayout';
import Meta from '@/components/Header/Meta';
import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import calculateAvailableHeight from '@/components/Util/getAvailableHeight';
import BookviewerPlaceholder from '@/components/BookViewerPlaceholder';

const EmbededViewer = (props: { title: string; url: string }) => {
  const { title, url } = props;

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
    // Listen for events from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Verify origin of messages
      if (event.origin !== 'https://sites.dlib.nyu.edu') {
        // get from share object
        return;
      }
      if (!JSON.parse(event.data)) {
        return;
      }
      const parsedEvent = JSON.parse(event.data);
      switch (parsedEvent.fire) {
        case 'viewer:init':
          break;
        case 'viewer:loaded':
          break;
        case 'viewer:contentready':
          setIsLoaded(true);
          break;
        // page changes
        case 'viewer:sequence:change':
          window.history.pushState({}, '', `${parsedEvent.message.sequence}`);
          break;
        // multivolume change
        case 'change:option:multivolume':
          // Check if message contains a bookid and not default message:"/1?lang=en"
          if (parsedEvent.message.length > 10) {
            const newPid = parsedEvent.message.slice(14, -10);
            window.location.href = `${window.location.origin}/books/${newPid}/1`;
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      {!isLoaded && iFrameHeight > 0 && <BookviewerPlaceholder height={iFrameHeight} />}

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
        src={`${url}?embed=true`}
        ref={iFrameRef}
      />
    </>
  );
};

export default function Book() {
  const { title, url } = usePage().props as unknown as { title: string; url: string };

  return (
    <BookLayout>
      <Meta title={title as string} />
      <EmbededViewer title={title} url={url} />
    </BookLayout>
  );
}
