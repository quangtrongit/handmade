import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { USERS } from '../../assets/data/USERS';

export const usersSlice = createSlice({
  name: 'users',
  initialState: USERS,
  reducers: {}
})

export default usersSlice.reducer;