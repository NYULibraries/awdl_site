import { useState, useEffect, useRef } from 'react';
import BookviewerPlaceholder from './BookViewerPlaceholder';
import calculateAvailableHeight from './Util/getAvailableHeight';

interface BookProps {
	pid: string;
	title?: string;
	viewer: string;
}

const Book: React.FC<BookProps> = (props) => {
	const { title, viewer, pid } = props;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [iFrameHeight, setIFrameHeight] = useState<number>(calculateAvailableHeight());
	const iFrameRef = useRef<HTMLIFrameElement>(null);

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
			{!isLoaded && <BookviewerPlaceholder height={iFrameHeight} />}
			<iframe
				role="main"
				onError={(e) => {
					return console.error('iframe failed to load:', e);
				}}
				style={{
					height: iFrameHeight,
					width: '100%'
				}}
				title={title}
				id="mainContent"
				className={!isLoaded ? 'widget book' : 'widget book viewerLoaded'}
				name="book"
				allowFullScreen={true}
				src={`${viewer}/books/${pid}`}
				ref={iFrameRef}
			/>
		</>
	);
};

export default Book;
