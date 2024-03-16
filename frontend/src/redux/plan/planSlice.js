import { createSlice } from '@reduxjs/toolkit';
const planData = JSON.parse(localStorage.getItem('planData')) || '';
const { selectedPlan = 'Arcade', toggle, selectedPlanPrice = 9 } = planData;


const initialState = {
	// selectedPlan: localStorage.getItem('selectedPlan') || '0',
	selectedPlan: selectedPlan,
	// toggle: false,
	toggle: toggle,
	selectedPlanPrice: selectedPlanPrice,
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
		setSelectedPlanPrice: (state, action) => {
			state.selectedPlanPrice = action.payload;
		},
	},
});

export const { setSelectedPlan, setToggle, setSelectedPlanPrice } =
	planSlice.actions;
export default planSlice.reducer;
