import SearchForm from '../../Search/Tools/SearchForm';
import NavigationMobile from './NavigationMobile';

interface NavigationItem {
	route: string;
	class: string;
	label: string;
}

const NavigationItems: NavigationItem[] = [
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
					    NavigationItems.map((item: NavigationItem, index: number) => {
						    return (
							    <li key={index}>
								    <a href={route(item.route)} className={item.class}>
									    {item.label}
								    </a>
							    </li>
						    );
					    })
				    }
			    </ul>
			    <div className="search_holder widget navbar-form navbar-right">
				    <SearchForm queryText={'*:*' as unknown as string} />
			    </div>
		    </div>
	    </div>
    </nav>
  );
}
