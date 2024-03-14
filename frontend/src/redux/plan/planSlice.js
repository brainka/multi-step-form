import { createSlice } from '@reduxjs/toolkit';
const planData = JSON.parse(localStorage.getItem('planData')) || '';
const { selectedPlan = '0', toggle = false } = planData;
console.log(toggle);

const initialState = {
	// selectedPlan: localStorage.getItem('selectedPlan') || '0',
	selectedPlan: selectedPlan,
	// toggle: false,
	toggle: toggle,
};

export const planSlice = createSlice({
	name: 'plan',
	initialState,
	reducers: {
		setSelectedPlan: (state, action) => {
			state.selectedPlan = action.payload;
		},
		setToggle: (state, action) => {
			state.toggle = action.payload;
		},
	},
});

export const { setSelectedPlan, setToggle } = planSlice.actions;
export default planSlice.reducer;
