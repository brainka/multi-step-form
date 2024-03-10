import { createContext, useState, useContext } from 'react';

export const StepperContext = createContext();

const StepperProvider = ({ children }) => {
	const [activeStep, setActiveStep] = useState(1);

	return (
		<StepperContext.Provider value={{ activeStep, setActiveStep }}>
			{children}
		</StepperContext.Provider>
	);
};

export default StepperProvider;
