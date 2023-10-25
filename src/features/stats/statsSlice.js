import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    correctAnswers: 0,
    wrongAnswers: 0,
    notAnswered: 0,
    totalTime: 0,
  },
  reducers: {
    incrementCorrect: (state) => {
      state.correctAnswers += 1;
    },
    incrementWrong: (state) => {
      state.wrongAnswers += 1;
    },
    incrementNotAnswered: (state) => {
      state.notAnswered += 1;
    },
    addTime: (state, action) => {
      state.totalTime += action.payload;
    },
    resetStats: (state) => {
      state.correctAnswers = 0;
      state.wrongAnswers = 0;
      state.notAnswered = 0;
      state.totalTime = 0;
    },
    setNotAnswered: (state, action) => {
      state.notAnswered = action.payload;
    },
  },
});

export const {
  incrementCorrect,
  incrementWrong,
  incrementNotAnswered,
  addTime,
  resetStats,
  setNotAnswered,
} = statsSlice.actions;

export default statsSlice.reducer;
