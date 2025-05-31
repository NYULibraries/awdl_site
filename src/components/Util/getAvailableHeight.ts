function calculateAvailableHeight(): number {
	const body: HTMLBodyElement | null = document.querySelector('body');
	if (!body) return 0;

	const children: Element[] = Array.from(body.children);
	const iframe: HTMLIFrameElement | null = document.querySelector('iframe');
	let height: number = document.documentElement.clientHeight;

	for (const child of children) {
		height -= (child as HTMLElement).offsetHeight;
		if (height <= 0) {
			break;
		}
	}

	if (iframe) {
		iframe.style.height = `${height}px`;
	}
	return height;
}

export default calculateAvailableHeight;
