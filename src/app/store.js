import { configureStore } from "@reduxjs/toolkit";
import numQuestionsReducer from "../features/questions/numQuestionsSlice";
import timerReducer from "../features/timer/timerSlice";
import statsReducer from "../features/stats/statsSlice";

const store = configureStore({
  reducer: {
    numQuestions: numQuestionsReducer,
    timer: timerReducer,
    stats: statsReducer,
  },
});

export default store;
