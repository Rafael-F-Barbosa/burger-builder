import React from 'react';
import classes from './NavigationItems.module.css';
import NavigatiomItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigatiomItem link="/" exact>
			Burger Builder
		</NavigatiomItem>
		{props.isAuth ? <NavigatiomItem link="/orders">Orders</NavigatiomItem>:null}
		{!props.isAuth 
			? <NavigatiomItem link="/auth">Authenticate</NavigatiomItem>
			: <NavigatiomItem link="/logout">Logout</NavigatiomItem>}
	</ul>
);

export default navigationItems;
