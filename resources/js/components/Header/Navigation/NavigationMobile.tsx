interface NavigationMobileProps {
  open: boolean;
  onToggle: () => void;
}

export default function NavigationMobile({ open, onToggle }: NavigationMobileProps) {
  return (
    <button
	    type="button"
	    className={`navbar-toggle widget${open ? '' : ' collapsed'}`}
	    aria-expanded={open}
	    aria-controls="main-nav"
	    onClick={onToggle}
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
		    aria-hidden="true"
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
