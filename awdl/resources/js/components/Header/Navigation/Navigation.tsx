// import SearchForm from '../../Search/Tools/SearchForm';
import NavigationMobile from './NavigationMobile';
import { Link } from '@inertiajs/react';

function SearchForm() {
  return (<></>);
}

const NavigationItems = [
	{
		route: 'home',
		class: 'home',
		label: 'Home',
	},
	{
		route: 'collectionsoverview',
		class: 'collectionsoverview',
		label: 'Collections Overview',
	},
	{
		route: 'series',
		class: 'series',
		label: 'Series',
	},
	{
		route: 'about',
		class: 'about',
		label: 'About',
	},
	{
		route: 'partners',
		class: 'partners',
		label: 'Partners',
	},
	{
		route: 'browse',
		class: 'browse',
		label: 'Browse',
	}
];

export default function Navigation() {
  return (
    <nav className="navbar navbar-default" role="navigation">
	    <div className="container-fluid">
		    <div className="navbar-header">
			    <NavigationMobile />
		    </div>
		    <div className="navbar-collapse">
			    <ul className="nav navbar-nav">
				    {
					    NavigationItems.map((item) => {
						    return (
							    <li>
								    <Link prefetch href={route(item.route)} className={item.class}>
									    {item.label}
								    </Link>
							    </li>
						    );
					    })
				    }
			    </ul>
			    <div className="search_holder widget navbar-form navbar-right">
				    <SearchForm />
			    </div>
		    </div>
	    </div>
    </nav>
  );
}
