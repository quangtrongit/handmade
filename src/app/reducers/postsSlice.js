import { createSlice } from '@reduxjs/toolkit';
import { POSTS } from '../../assets/data/POSTS';

const postsSlice = createSlice({
  name:'posts',
  initialState: POSTS,
  reducers: {
    reactionAdded(state, action) {
      const { postId } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reaction++;
      }
    }
  }
})
export const selectAllPosts = state => state.posts;
export const selectPlantCarePosts = state => {
  return state.posts.filter((post) => post.label === 'Plant Care')
}
export const selectLivingWithPlantsPosts = state => {
  return state.posts.filter((post) => post.label === 'Living With Plants')
}
export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;