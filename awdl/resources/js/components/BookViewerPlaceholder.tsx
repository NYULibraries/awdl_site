import { ConfigProvider, Spin, type ThemeConfig } from 'antd';

interface BookviewerPlaceholderProps {
	height: number;
}

const BookviewerPlaceholder = ({ height }: BookviewerPlaceholderProps) => {
	const theme: ThemeConfig = {
		components: {
			Spin: {
				colorPrimary: '#8A0707',
				motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
				motionDurationSlow: '.1s'
			}
		}
	};
	return (
		<ConfigProvider theme={theme}>
			<div
				className="bookViewerPlaceholder"
				style={{
					height: `${height}px`
				}}
			>
				<Spin
					size="large"
					style={{
						position: 'relative',
						marginTop: '0%',
						marginLeft: '0%'
					}}
				/>
			</div>
		</ConfigProvider>
	);
};

export default BookviewerPlaceholder;
