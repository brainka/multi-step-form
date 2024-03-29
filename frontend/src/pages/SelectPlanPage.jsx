import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/SelectPlan.css';
import ArcadeLogo from '../assets/images/icon-arcade.svg';
import AdvancedLogo from '../assets/images/icon-advanced.svg';
import ProLogo from '../assets/images/icon-pro.svg';
import { useNavigate } from 'react-router-dom';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import {
	setSelectedPlan,
	setToggle,
	setSelectedPlanPrice,
} from '../redux/plan/planSlice';
import { useDispatch, useSelector } from 'react-redux';

function SelectPlanPage() {
	const { stepNumber } = useParams();
	// const [toggle, setToggle] = useState(false);
	const [yearlyPromotion, setYearlyPromotion] = useState('2 months free');
	//move to redux
	// const [selectedPlan, setSelectedPlan] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const selectedPlan = useSelector((state) => state.plan.selectedPlan);
	const selectedPlanPrice = useSelector(
		(state) => state.plan.selectedPlanPrice
	);
	const toggle = useSelector((state) => state.plan.toggle);
	const planLocalStorage = JSON.parse(localStorage.getItem('planData')) || {};
	// const [selectedPlanPrice, setSelectedPlanPrice] = useState(
	// 	planLocalStorage.selectedPlanPrice
	// );

	const planRef = useRef();

	const plans = [
		{
			id: 1,
			name: 'Arcade',
			monthlyPrice: 9,
			yearlyPrice: 90,
			logo: ArcadeLogo,
		},
		{
			id: 2,
			name: 'Advanced',
			monthlyPrice: 12,
			yearlyPrice: 120,
			logo: AdvancedLogo,
		},
		{
			id: 3,
			name: 'Pro',
			monthlyPrice: 15,
			yearlyPrice: 150,
			logo: ProLogo,
		},
	];

	console.log(selectedPlanPrice);

	useEffect(() => {
		console.log('TOGGLE HAS CHANGED');

		// localStorage.setItem('selectedPlan', selectedPlan);
		localStorage.setItem(
			'planData',
			JSON.stringify({ selectedPlan, toggle, selectedPlanPrice })
		);
	}, [selectedPlan, toggle, selectedPlanPrice]);

	function handleSubmit() {
		dispatch(setActiveStep(parseInt(stepNumber) + 1));
		navigate(`/add-ons/step/${parseInt(stepNumber) + 1}`);
	}

	function handleGoBack() {
		//need to update the active stepper
		// navigate(-1);

		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/yourinfo/step/${parseInt(stepNumber) - 1}`);
	}

	function handlePlanSelect(plan, monthlyPrice, yearlyPrice) {
		if (!toggle) {
			dispatch(setSelectedPlanPrice(monthlyPrice));
		} else {
			dispatch(setSelectedPlanPrice(yearlyPrice));
		}
		dispatch(setSelectedPlan(plan));
	}

	function handleToggle() {
		// dispatch(setSelectedPlan(''));
		dispatch(setToggle(!toggle));

		console.log('toggle function has been selected');

		const currentPlan = plans.find((plan) => plan.name === selectedPlan);
		//this is working the opposite because we are updating dispatch to the opposite before using the new price, probably to do with react and batching of updates
		const newPrice = toggle
			? currentPlan.monthlyPrice
			: currentPlan.yearlyPrice;

		localStorage.setItem('planData', JSON.stringify({ newPrice }));

		dispatch(setSelectedPlanPrice(newPrice));
	}

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Select your plan</h1>
				<p className="fz-14">
					You have the option of monthly or yearly billing.
				</p>
				<div className="select-plan-container">
					{plans.map((plan) => {
						const { id, name, monthlyPrice, yearlyPrice, logo } = plan;
						return (
							<div
								ref={planRef}
								key={id}
								value={name}
								className={`${name === selectedPlan ? 'active-plan' : ''} ${
									toggle ? 'plan-container expand' : 'plan-container'
								}`}
								onClick={() =>
									handlePlanSelect(name, monthlyPrice, yearlyPrice)
								}
							>
								<img src={logo} alt="" />
								<div className="plan-details">
									<h3>{name}</h3>
									<p>${!toggle ? `${monthlyPrice}/mo` : `${yearlyPrice}/yr`}</p>
									{toggle && <div>{yearlyPromotion}</div>}
								</div>
							</div>
						);
					})}
				</div>
				<div className="plan-frequency-options" onClick={handleToggle}>
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
			<div className="page-buttons button-mobile-background jb">
				<button
					className="go-back-button button-mobile-size"
					onClick={handleGoBack}
				>
					Go Back
				</button>
				<button
					type="submit"
					onClick={handleSubmit}
					className="button-mobile-size"
				>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default SelectPlanPage;
