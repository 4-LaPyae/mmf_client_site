import { createSlice } from '@reduxjs/toolkit';

const responsiveSlice = createSlice({
	name: 'breakpoint',
	initialState: false,
	reducers: {
		toggleBreakpoint: (state) => {
			return false;
		},
	},
});

export const { toggleBreakpoint } = responsiveSlice.actions

export default responsiveSlice.reducer
