import { configureStore } from '@reduxjs/toolkit';
import stepperReducer from './stepper/stepperSlice';

export const store = configureStore({
	reducer: {
		//the name matters when you are accessing the state value using useSelector in a component
		stepper: stepperReducer,
	},
});

export default store;
