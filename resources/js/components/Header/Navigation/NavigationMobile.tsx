interface NavElements {
	button: HTMLButtonElement | null;
	navbar: HTMLElement | null;
}

export default function NavigationMobile() {

  window.addEventListener('DOMContentLoaded', (): void => {
	  const elements: NavElements = {
		  button: document.querySelector<HTMLButtonElement>('button'),
	  	navbar: document.querySelector<HTMLElement>('.navbar-collapse')
  	};

	  let collapsed: boolean = true;

	  if (elements.button && elements.navbar) {
	  	elements.button.addEventListener('click', (event: MouseEvent): void => {
  			event.preventDefault();
			  elements.navbar!.style.height = collapsed ? '238px' : '0px';
		  	collapsed = !collapsed;
	  	});
  	}
  });

  return (
    <button
	    type="button"
	    className="navbar-toggle collapsed widget"
	    data-toggle="collapse"
	    data-name="navButton"
	  >
	    <svg
		    version="1.1"
		    xmlns="http://www.w3.org/2000/svg"
		    xmlnsXlink="http://www.w3.org/1999/xlink"
		    x="0px"
		    y="0px"
		    width="40px"
		    height="30px"
		    viewBox="0 0 40 30"
		    overflow="visible"
		    xmlSpace="preserve"
	    >
		    <defs></defs>
		    <rect y="0" fill="#FFFFFF" width="40" height="3"></rect>
		    <rect y="7" fill="#FFFFFF" width="40" height="3"></rect>
		    <rect y="14" fill="#FFFFFF" width="40" height="3"></rect>
	    </svg>
	    <span className="sr-only">Toggle navigation</span>
    </button>
  )
}

