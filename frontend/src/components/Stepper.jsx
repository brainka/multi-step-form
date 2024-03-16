import React, { useState, useContext, useEffect } from 'react';
import '../components/Stepper.css';
// import { StepperContext } from '../Context/StepperContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveStep } from '../redux/stepper/stepperSlice';

function Stepper() {
	const stepperInfo = ['Your Info', 'Select Plan', 'Add-ons', 'Summary'];
	// const [activeStep, setActiveStep] = useState(1);
	// const { activeStep, setActiveStep } = useContext(StepperContext);
	const navigate = useNavigate();

	const activeStep = useSelector((state) => state.stepper.activeStep);
	const dispatch = useDispatch();

	console.log(`redux active step ${activeStep}`);

	useEffect(() => {
		localStorage.setItem('activeStep', activeStep);
	}, [activeStep]);

	//add a stepper number to the url
	//do simple logic to get url and place active based on that

	console.log(stepperInfo[0].toLocaleLowerCase().replace(' ', ''));

	function handleStepperSelect(selectedNumber) {
		dispatch(setActiveStep(selectedNumber));
		navigate(
			`/${stepperInfo[selectedNumber - 1]
				.replace(' ', '')
				.toLowerCase()}/step/${selectedNumber}`
		);
	}

	return (
		<div className="stepper-container">
			{stepperInfo.map((step, index) => {
				const number = index + 1;
				console.log(number);
				return (
					<div className="stepper">
						<div
							className={`stepper-number white bold ${
								number === parseInt(activeStep) ? 'active' : 'stepper-disabled'
							}`}
							onClick={() => handleStepperSelect(number)}
						>
							{number}
						</div>
						<div className="stepper-right steps-hidden">
							<div className="fz-12 light-blue">{`STEP ${number}`}</div>
							<div className="fz-14 white bold stepper-mobile">{step.toLocaleUpperCase()}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Stepper;
