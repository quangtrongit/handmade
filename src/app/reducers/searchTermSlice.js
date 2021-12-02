import { createSlice } from '@reduxjs/toolkit';

export const searchTermSlice = createSlice({
  name: 'searchTerms',
  initialState: '',
  reducers: {
    setSearchTerm: (state, action) => {
      return action.payload
    }
  }
});
export const selectSearchTerm = state => state.searchTerms;

export const { setSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;