import { createContext, useState, useEffect } from 'react';

export const StepperContext = createContext();

const StepperProvider = ({ children }) => {
	const defaultStep = localStorage.getItem('activeStep') || '1';
	const [activeStep, setActiveStep] = useState(defaultStep);

	useEffect(() => {
		localStorage.setItem('activeStep', activeStep);
	}, [activeStep]);

	return (
		<StepperContext.Provider value={{ activeStep, setActiveStep }}>
			{children}
		</StepperContext.Provider>
	);
};

export default StepperProvider;
