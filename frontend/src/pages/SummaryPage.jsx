import React from 'react';
import { setActiveStep } from '../redux/stepper/stepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../pages/Summary.css';

function SummaryPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { stepNumber } = useParams();

	function handleConfirm() {
		dispatch(setActiveStep(parseInt(stepNumber) + 1));
		navigate(`/summary/step/${parseInt(stepNumber) + 1}`);
	}

	function handleGoBack() {
		dispatch(setActiveStep(parseInt(stepNumber) - 1));
		navigate(`/add-ons/step/${parseInt(stepNumber) - 1}`);
	}

	return (
		<div className="page-layout">
			<div className="info-container">
				<h1 className="text-denim">Finishing up</h1>
				<p className="fz-14">
					Double-check everything looks OK before confirming.
				</p>

				<div className="summary-container">
					<div className="summary-top">
						<div className="summary-plan">
							<div className="summary-plan-name bold fz-16">
								Arcade (monthly)
							</div>
							<div className="summary-change fz-14">Change</div>
						</div>
						<div className="bold fz-16">$9/mo</div>
					</div>
					<div className="line"></div>
					<div className="summary-bottom">
						<div className="summary-addons">
							<div className="summary-addons-name fz-14">Online service</div>
							<div className="summary-addons-price fz-14">+$1/mo</div>
						</div>
						<div className="summary-addons">
							<div className="summary-addons-name fz-14">Larger storage</div>
							<div className="summary-addons-price fz-14">+$2/mo</div>
						</div>
					</div>
				</div>
				<div className="summary-total-container">
					<div className="summary-total fz-14">Total (per month)</div>
					<div className="summary-figure fz-20 bold">+$12/mo</div>
				</div>
			</div>
			<div className="page-buttons">
				<button className="go-back-button" onClick={handleGoBack}>
					Go Back
				</button>
				<button
					className="summary-button"
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
