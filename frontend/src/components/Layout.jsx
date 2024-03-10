import React from 'react';
import Stepper from '../components/Stepper';
import '../components/Layout.css';

function Layout({ children }) {
	return (
		<div className="layout-container">
			<Stepper className='layout-left'/>
			<div className='layout-right'>{children}</div>
		</div>
	);
}
export default Layout;
