function calculateAvailableHeight(): number {
  const iframeParent: HTMLDivElement | null = document.querySelector('div#book');
  if (!iframeParent) return 0;

  const children: Element[] = Array.from(iframeParent.children);
  const iframe: HTMLIFrameElement | null = document.querySelector('iframe');
  let height: number = document.documentElement.clientHeight;

  for (const child of children) {
    if (iframe && child.contains(iframe)) {
      continue;
    }
    if (height <= 0) {
      break;
    }
    height -= (child as HTMLElement).offsetHeight;
  }

  if (iframe) {
    iframe.style.height = `${height}px`;
  }
  return height;
}

export default calculateAvailableHeight;
