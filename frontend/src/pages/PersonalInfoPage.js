import React, { useState } from 'react';
import '../pages/PersonalInfo.css';
import { useParams } from 'react-router-dom';

const PersonalInfoPage = () => {
	function handleSubmit(e) {
		e.preventDefault();
		console.log('see what happens');
	}
	const [name, setName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const { stepNumber } = useParams();
	console.log(stepNumber);

	return (
		<div className="personal-info">
			<div className="personal-info-container">
				<h1 className="text-denim">Personal info</h1>
				<p>Please provide your name, email address, and phone number.</p>

				<form action="" onSubmit={handleSubmit}>
					<label className="text-denim">
						Name
						<input
							type="text"
							placeholder="e.g. Stephen King"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>

					<label>
						Email Address
						<input
							type="text"
							placeholder="e.g. stephenking@lorem.com"
							value={emailAddress}
							onChange={(e) => setEmailAddress(e.target.value)}
						/>
					</label>

					<label>
						Phone Number
						<input
							type="text"
							placeholder="e.g. +1 234 567 890"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</label>
				</form>
			</div>
			<button type="submit">Next Step</button>
		</div>
	);
};

export default PersonalInfoPage;
