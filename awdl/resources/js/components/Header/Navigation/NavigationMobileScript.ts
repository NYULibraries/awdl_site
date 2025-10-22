interface NavElements {
  button: HTMLButtonElement | null;
  navbar: HTMLElement | null;
}

window.addEventListener('DOMContentLoaded', (): void => {
  const elements: NavElements = {
    button: document.querySelector<HTMLButtonElement>('button'),
    navbar: document.querySelector<HTMLElement>('.navbar-collapse'),
  };

  let collapsed = true;

  if (elements.button && elements.navbar) {
    elements.button.addEventListener('click', (event: MouseEvent): void => {
      event.preventDefault();
      elements.navbar!.style.height = collapsed ? '238px' : '0px';
      collapsed = !collapsed;
    });
  }
});
