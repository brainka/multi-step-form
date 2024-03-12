import React, { useState, useContext, useEffect } from 'react';
import '../pages/PersonalInfo.css';
import { useParams, useNavigate } from 'react-router-dom';
// import { StepperContext } from '../Context/StepperContext';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import { useSelector, useDispatch } from 'react-redux';

const PersonalInfoPage = () => {
	const [name, setName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const { stepNumber } = useParams();

	const [emptyFieldMsg, setEmptyFieldMsg] = useState('This field is required');

	const [isNameError, setIsNameError] = useState(false);
	const [isEmailError, setIsEmailError] = useState(false);
	const [isPhoneError, setIsPhoneError] = useState(false);
	const navigate = useNavigate();
	// const { setActiveStep } = useContext(StepperContext);
	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();

		if (name.trim() && emailAddress.trim() && phoneNumber.trim()) {
			console.log('all fields are filled');
			// setEmptyFieldError(false);
			setIsNameError(false);
			setIsEmailError(false);
			setIsPhoneError(false);
			dispatch(setActiveStep(parseInt(stepNumber) + 1));
			navigate(`/selectplan/step/${parseInt(stepNumber) + 1}`);
		} else if (!name.trim() && !emailAddress.trim() && !phoneNumber.trim()) {
			setIsNameError(true);
			setIsEmailError(true);
			setIsPhoneError(true);
		} else if (name.trim() && !emailAddress.trim() && !phoneNumber.trim()) {
			console.log('empty fields');
			// setEmptyFieldError(true);
			setIsNameError(false);
			setIsEmailError(true);
			setIsPhoneError(true);
		} else if (!name.trim() && emailAddress.trim() && !phoneNumber.trim()) {
			setIsNameError(true);
			setIsEmailError(false);
			setIsPhoneError(true);
		} else if (!name.trim() && !emailAddress.trim() && phoneNumber.trim()) {
			setIsNameError(true);
			setIsEmailError(true);
			setIsPhoneError(false);
		}
	}

	function handleNameChange(e) {
		console.log(e.target.value);
		setName(e.target.value);

		if (e.target.value.length > 0) {
			setIsNameError(false);
		} else {
			setIsNameError(true);
		}
	}

	function handleEmailChange(e) {
		console.log(e.target.value);
		setEmailAddress(e.target.value);

		if (e.target.value.length > 0) {
			setIsEmailError(false);
		} else {
			setIsEmailError(true);
		}
	}

	function handleNumberChange(e) {
		console.log(e.target.value);
		setPhoneNumber(e.target.value);

		if (e.target.value.length > 0) {
			setIsPhoneError(false);
		} else {
			setIsPhoneError(true);
		}
	}

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Personal info</h1>
				<p className="fz-14">
					Please provide your name, email address, and phone number.
				</p>

				<form action="">
					<label className="text-denim fz-14">
						<div className="df jb">
							<div>Name</div>
							{isNameError && <div className="form-error">{emptyFieldMsg}</div>}
						</div>

						<input
							type="text"
							placeholder="e.g. Stephen King"
							value={name}
							onChange={handleNameChange}
							className={isNameError ? 'form-border-error' : ''}
						/>
					</label>

					<label>
						<div className="df jb fz-14">
							{' '}
							<div>Email Address</div>
							<div className="form-error">
								{isEmailError && (
									<div className="form-error">{emptyFieldMsg}</div>
								)}
							</div>
						</div>
						<input
							type="text"
							placeholder="e.g. stephenking@lorem.com"
							value={emailAddress}
							// onChange={(e) => setEmailAddress(e.target.value)}
							onChange={handleEmailChange}
							className={isEmailError ? 'form-border-error' : ''}
						/>
					</label>

					<label>
						<div className="df jb fz-14">
							<div>Phone Number</div>
							{isPhoneError && (
								<div className="form-error">{emptyFieldMsg}</div>
							)}
						</div>
						<input
							type="text"
							placeholder="e.g. +1 234 567 890"
							value={phoneNumber}
							// onChange={(e) => setPhoneNumber(e.target.value)}
							onChange={handleNumberChange}
							className={isPhoneError ? 'form-border-error' : ''}
						/>
					</label>
				</form>
			</div>
			<button type="submit" onClick={handleSubmit}>
				Next Step
			</button>
		</div>
	);
};

export default PersonalInfoPage;
