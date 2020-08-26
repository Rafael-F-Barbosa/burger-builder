import React from 'react';
import classes from './NavigationItems.module.css';

import NavigatiomItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigatiomItem link="/" exact>
			Burger Builder
		</NavigatiomItem>
		<NavigatiomItem link="/orders">Orders</NavigatiomItem>
	</ul>
);

export default navigationItems;
