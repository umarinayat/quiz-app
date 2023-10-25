import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    difficulty: "easy",
    totalTime: 150,
    timeRemaining: 150,
    isPaused: false,
    startTime: null,
    endTime: null,
    timeUsed: 0,
  },
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
      const timePerQuestion =
        action.payload === "easy" ? 30 : action.payload === "medium" ? 20 : 10;
      state.totalTime = timePerQuestion * 5;
      state.timeRemaining = state.totalTime;
    },
    setTotalTime: (state, action) => {
      state.totalTime = action.payload;
      state.timeRemaining = action.payload;
    },
    decrementTime: (state) => {
      console.log("Decrementing time:", state.isPaused);
      if (!state.isPaused) {
        state.timeRemaining = Math.max(state.timeRemaining - 1, 0);
      }
    },
    updateTimeUsed: (state, action) => {
      state.timeUsed = action.payload;
    },
    resetTimer: (state) => {
      state.timeRemaining = state.totalTime;
    },
    pauseTimer: (state) => {
      state.isPaused = true;
    },
    resumeTimer: (state) => {
      state.isPaused = false;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
      console.log("Toggling pause:", state.isPaused); // Log pause state
    },
    startQuiz: (state) => {
      state.startTime = new Date().getTime();
    },
    endQuiz: (state) => {
      state.endTime = new Date().getTime();
    },
  },
});

export const {
  setDifficulty,
  setTotalTime,
  decrementTime,
  resetTimer,
  updateTimeUsed,
  togglePause,
  startQuiz,
  endQuiz,
  pauseTimer,
  resumeTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
