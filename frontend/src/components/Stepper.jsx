import React, { useState, useContext } from 'react';
import '../components/Stepper.css';
import { StepperContext } from '../Context/StepperContext';
import { useNavigate } from 'react-router-dom';

function Stepper() {
	const stepperInfo = ['Your Info', 'Select Plan', 'Add-ons', 'Summary'];
	// const [activeStep, setActiveStep] = useState(1);
	const { activeStep, setActiveStep } = useContext(StepperContext);
	const navigate = useNavigate();

	//add a stepper number to the url
	//do simple logic to get url and place active based on that

	console.log(stepperInfo[0].toLocaleLowerCase().replace(' ', ''));

	function handleStepperSelect(selectedNumber) {
		setActiveStep(selectedNumber);
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
								number === activeStep ? 'active' : ''
							}`}
							onClick={() => handleStepperSelect(number)}
						>
							{number}
						</div>
						<div className="stepper-right">
							<div className="fz-12 light-blue">{`STEP ${number}`}</div>
							<div className="fz-14 white bold">{step.toLocaleUpperCase()}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Stepper;
