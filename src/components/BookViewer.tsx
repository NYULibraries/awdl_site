import { useState, useEffect } from 'react';
import BookviewerPlaceholder from './BookViewerPlaceholder'
import calculateAvailableHeight from './Util/getAvailableHeight';

interface BookProps {
  pid: string;
  title?: string;
  viewer: string;
}

const Book: React.FC<BookProps> = (props) => {
  const { title, viewer, pid } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [iFrameHeight, setIFrameHeight] = useState(calculateAvailableHeight());

  useEffect(() => {
    const handleResize = () => {
      setIFrameHeight(calculateAvailableHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const viewerLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    console.log('Current iframe height:', iFrameHeight);
    console.log('Loading URL:', `${viewer}/books/${pid}`);
  }, [iFrameHeight, pid]);

  return (
    <>
      {!isLoaded && (
        <BookviewerPlaceholder height={iFrameHeight}/>
      )}
        <iframe
          role="main"
          onLoad={viewerLoad}
          onError={(e) => console.error('iframe failed to load:', e)}
          style={{
            height: iFrameHeight,
            width: '100%',
          }}
          title={title}
          id="mainContent"
          className={!isLoaded ? 'widget book' : 'widget book viewerLoaded'}
          name="book"
          allowFullScreen={true}
          src={`${viewer}/books/${pid}`}
        />
    </>
  );
};

export default Book;
