import { createSlice } from '@reduxjs/toolkit';
import { PLANTS } from '../../assets/data/PLANTS';
import { selectSearchTerm } from './searchTermSlice';
import { selectSortTerms } from './sortsSlice';

export const plantsSlice = createSlice({
  name: 'plants',
  initialState: PLANTS,
  reducers: {
    setFavoritePlant: (state, action) => {
      const { id } = action.payload;
      const existingPlant = state.find(plant => plant.id === id);
      if (existingPlant) {
        existingPlant.featured = !existingPlant.featured;
      }
    },
    deleteFavoritePlant: (state, action) => {
      const { id } = action.payload;
      const existingPlant = state.find(plant => plant.id === id);
      if (existingPlant) {
        existingPlant.featured = false;
      }
    }
  }
});

export const selectAllPlants = state => state.plants;

export const selectFilteredPlant = state => {
  
  const allPlants = selectAllPlants(state);
  const searchTerm = selectSearchTerm(state);
  const sortTerm = selectSortTerms(state);
  console.log(sortTerm);
  const categorizedPlants = (sortTerm) 
  ? allPlants.filter(plant => plant.category.toLowerCase() === sortTerm.toLowerCase())
  : allPlants;
  return categorizedPlants.filter((plant) => 
  plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
}

export const { setFavoritePlant, deleteFavoritePlant } = plantsSlice.actions;

export default plantsSlice.reducer;