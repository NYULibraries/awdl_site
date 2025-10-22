import React from 'react';

export default function Footer() {
	return (
    <div className="footer-wrapper">
	    <div className="navf" role="navigation">
		    <a rel="noopener" href="https://www.nyu.edu/footer/accessibility.html" target="_blank">Accessibility</a>
	    </div>
	    <footer className="footer-main container-fluid" role="contentinfo">
		    <div className="partner-wrapper">
			    <div className="partner-partners-awdl">
				    <a href="http://isaw.nyu.edu/">INSTITUTE FOR THE STUDY OF THE ANCIENT WORLD</a>
			    </div>
			    <div className="partner-partners-dlts">
				    <a href="http://dlib.nyu.edu/">NYU DIGITAL LIBRARY TECHNOLOGY SERVICES</a>
			    </div>
		    </div>
	    </footer>
    </div>
	);
}
