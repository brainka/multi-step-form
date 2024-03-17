import React from 'react';
import '../pages/ThankYou.css';
import ThankYouLogo from '../assets/images/thankyou.svg';

function ThankYouPage() {
	return (
		<div className="page-layout">
			<div className="info-container thank-you">
				<img src={ThankYouLogo} alt="" />
				<h1>Thank you!</h1>
				<p>
					Thanks for confirming your subscription! We hope you have fun using
					our platform. If you ever need support, please feel free to email us
					at support@loremgaming.com.
				</p>
			</div>
		</div>
	);
}

export default ThankYouPage;
