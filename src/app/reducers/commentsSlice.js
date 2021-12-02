import { createSlice } from "@reduxjs/toolkit";
import { COMMENTS } from "../../assets/data/COMMENTS";



export const commentsSlice = createSlice({
  name: 'comments',
  initialState: COMMENTS,
  reducers: {
    commentAdded: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const selectAllComments = state => state.comments;

export const { commentAdded } = commentsSlice.actions;

export default commentsSlice.reducer;