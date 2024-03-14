import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	activeStep: localStorage.getItem('activeStep') || '1',
	// TO DO
	// have noticed that when local storage is gone, and page is refreshed, it remains on the page it was last selected on...not sure if this is really an issue but its been noted
};

export const stepperSlice = createSlice({
	name: 'stepper',
	initialState,
	reducers: {
		setActiveStep: (state, action) => {
			state.activeStep = action.payload;
		},
	},
});

export const { setActiveStep } = stepperSlice.actions;
export default stepperSlice.reducer;
