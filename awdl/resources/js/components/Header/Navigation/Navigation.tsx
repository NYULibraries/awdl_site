import React from 'react';
import SearchForm from '../../Search/Tools/SearchForm';
import NavigationMobile from './NavigationMobile.tsx';

const baseURL: string = '';
const NavigationItems = [
	{
		href: `${baseURL}/`,
		class: 'home',
		label: 'Home',
	},
	{
		href: `${baseURL}/collectionsoverview`,
		class: 'collectionsoverview',
		label: 'Collections Overview',
	},
	{
		href: `${baseURL}/series`,
		class: 'series',
		label: 'Series',
	},
	{
		href: `${baseURL}/about`,
		class: 'about',
		label: 'About',
	},
	{
		href: `${baseURL}/partners`,
		class: 'partners',
		label: 'Partners',
	},
	{
		href: `${baseURL}/browse`,
		class: 'browse',
		label: 'Browse',
	},
];

function Navigation() {
	return (
		<nav className="navbar navbar-default" role="navigation">
			<div className="container-fluid">
				<div className="navbar-header">
					<NavigationMobile />
				</div>

				<div className="navbar-collapse">
					<ul className="nav navbar-nav">
						{NavigationItems.map((item, index) => {
							return (
								<li key={index}>
									<a href={item.href} className={item.class}>
										{item.label}
									</a>
								</li>
							);
						})}
					</ul>
					<div className="search_holder widget navbar-form navbar-right">
						<SearchForm />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
