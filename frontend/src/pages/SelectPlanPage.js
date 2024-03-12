import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/SelectPlan.css';
import ArcadeLogo from '../assets/images/icon-arcade.svg';
import AdvancedLogo from '../assets/images/icon-advanced.svg';
import ProLogo from '../assets/images/icon-pro.svg';
import { useNavigate } from 'react-router-dom';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';

function SelectPlanPage() {
	const { stepNumber } = useParams();
	const [toggle, setToggle] = useState(false);
	const [yearlyPromotion, setYearlyPromotion] = useState('2 months free');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleSubmit() {
		console.log('submit');
		dispatch(setActiveStep(parseInt(stepNumber) + 1));
		navigate(`/add-ons/step/${parseInt(stepNumber) + 1}`);
	}

	function handleGoBack() {
		console.log('go back');
		//need to update the active stepper
		// navigate(-1);

		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/yourinfo/step/${parseInt(stepNumber) - 1}`);
	}

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Select your plan</h1>
				<p className="fz-14">
					You have the option of monthly or yearly billing.
				</p>
				<div className="select-plan-container">
					<div
						className={`${toggle ? 'plan-container expand' : 'plan-container'}`}
					>
						<img src={ArcadeLogo} alt="" />
						<div className="plan-details">
							<h3>Arcade</h3>
							<p>$9/mo</p>
							{toggle && <div>{yearlyPromotion}</div>}
						</div>
					</div>
					<div
						className={`${toggle ? 'plan-container expand' : 'plan-container'}`}
					>
						<img src={AdvancedLogo} alt="" />
						<div className="plan-details">
							<h3>Advanced</h3>
							<p>$12/mo</p>
							{toggle && <div>{yearlyPromotion}</div>}
						</div>
					</div>
					<div
						className={`${toggle ? 'plan-container expand' : 'plan-container'}`}
					>
						<img src={ProLogo} alt="" />
						<div className="plan-details">
							<h3>Pro</h3>
							<p>$15/mo</p>
							{toggle && <div>{yearlyPromotion}</div>}
						</div>
					</div>
				</div>
				<div
					className="plan-frequency-options"
					onClick={() => setToggle(!toggle)}
				>
					<div
						className={`${
							!toggle ? 'toggle-heading-active' : 'toggle-heading'
						}`}
					>
						Monthly
					</div>
					<div
						className={`plan-frequency-options-toggle ${
							toggle ? 'plan-frequency-options-toggle-active' : ''
						} `}
					>
						<div className={`toggle-circle-container`}></div>
					</div>
					<div
						className={`${toggle ? 'toggle-heading-active' : 'toggle-heading'}`}
					>
						Yearly
					</div>
				</div>
			</div>
			<div className="page-buttons">
				<button className="go-back-button" onClick={handleGoBack}>
					Go Back
				</button>
				<button type="submit" onClick={handleSubmit}>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default SelectPlanPage;
