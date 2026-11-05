import SearchForm from '../../Search/Tools/SearchForm';
import NavigationMobile from './NavigationMobile';
import { Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

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
    route: 'serials',
    class: 'serials',
    label: 'Serials',
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
  },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  return (
    <nav className="navbar navbar-default" role="navigation">
	    <div className="container-fluid">
		    <div className="navbar-header">
			    <NavigationMobile open={open} onToggle={() => setOpen(!open)} />
		    </div>
		    <div
			    id="main-nav"
			    ref={menu}
			    className="navbar-collapse"
			    style={{ height: open ? menu.current?.scrollHeight : 0 }}
		    >
			    <ul className="nav navbar-nav">
				    {
					    NavigationItems.map((item: NavigationItem, index: number) => {
						    return (
							    <li key={index}>
								    <Link href={route(item.route)} className={item.class}>
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
