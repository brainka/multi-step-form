import React, { useEffect, useState } from 'react';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../pages/Summary.css';

function SummaryPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { stepNumber } = useParams();
	const selectedPlan = useSelector((state) => state.plan.selectedPlan);
	const location = useLocation();
	const [planDataStorage, setPlanDataStorage] = useState(
		JSON.parse(localStorage.getItem('planData')) || {}
	);
	const [addonsStorage, setAddonsStorage] = useState(
		JSON.parse(localStorage.getItem('addons')) || []
	);

	const { selectedPlanPrice, toggle } = planDataStorage;

	const [total, setTotal] = useState(0);

	console.log(location);

	useEffect(() => {
		setTotal(
			//TO DO if object is empty
			addonsStorage.reduce((accumulator, item) => {
				return (accumulator += !toggle
					? parseInt(item.monthlyPrice)
					: parseInt(item.yearlyPrice));
			}, selectedPlanPrice)
		);
	}, [addonsStorage, planDataStorage, toggle, selectedPlanPrice]);

	// console.log(test);
	console.log(`total ${total}`);
	function handleConfirm() {
		dispatch(setActiveStep(4));

		['yourInfo', 'planData', 'addons']?.forEach((key) =>
			localStorage.removeItem(key)
		);
		navigate(`/thankyou`);
	}

	function handleGoBack() {
		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/add-ons/step/${parseInt(stepNumber) - 1}`);
	}

	function handleChangeLink() {
		dispatch(setActiveStep(2));
		navigate(`/selectplan/step/2`);
	}

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Finishing up</h1>
				<p className="fz-14">
					Double-check everything looks OK before confirming.
				</p>

				<div
					className={`summary-container ${
						addonsStorage.length === 0
							? 'none'
							: addonsStorage.length === 1
							? 'small'
							: addonsStorage.length === 3
							? 'large'
							: 'summary-container'
					}`}
				>
					<div className="summary-top">
						<div className="summary-plan">
							<div className="summary-plan-name bold fz-16">
								{`${selectedPlan} ${
									!planDataStorage.toggle ? '(monthly)' : '(yearly)'
								}`}
							</div>
							<div className="summary-change fz-14" onClick={handleChangeLink}>
								Change
							</div>
						</div>
						<div className="bold fz-16">
							{`$${planDataStorage.selectedPlanPrice}${
								!toggle ? '/mo' : '/yr'
							}`}
						</div>
					</div>
					<div className="line"></div>
					<div className="summary-bottom">
						{/* //map here */}

						{addonsStorage.map((item) => {
							return (
								<div className="summary-addons">
									<div className="summary-addons-name fz-14">{item.name}</div>
									<div className="summary-addons-price fz-14">
										{toggle
											? `+${item.yearlyPrice}/yr`
											: `+${item.monthlyPrice}/mo`}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="summary-total-container">
					<div className="summary-total fz-14">{`Total ${
						!planDataStorage.toggle ? `(per month)` : `(per year)`
					}`}</div>
					<div className="summary-figure fz-20 bold">
						{`${!toggle ? `+${total}/mo` : `$${total}/yr`}`}
					</div>
				</div>
			</div>
			<div className="page-buttons button-mobile-background ">
				<button
					className="go-back-button button-mobile-size"
					onClick={handleGoBack}
				>
					Go Back
				</button>
				<button
					className="summary-button button-mobile-size"
					type="submit"
					onClick={handleConfirm}
				>
					Confirm
				</button>
			</div>
		</div>
	);
}

export default SummaryPage;
