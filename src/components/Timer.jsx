import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

import {
  decrementTime,
  resetTimer,
  endQuiz,
  updateTimeUsed,
} from "../features/timer/timerSlice";
import { addTime, setNotAnswered } from "../features/stats/statsSlice";

const Timer = ({ onTimeout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuestions = useSelector(
    (state) => state.numQuestions.questions.length
  );
  const correctAnswers = useSelector((state) => state.stats.correctAnswers);
  const wrongAnswers = useSelector((state) => state.stats.wrongAnswers);
  const timeRemaining = useSelector((state) => state.timer.timeRemaining);
  const totalTime = useSelector((state) => state.timer.totalTime);

  const getColor = (percentage) => {
    let r,
      g,
      b = 0;
    if (percentage > 50) {
      // Green to Yellow
      r = Math.floor(255 - (percentage - 50) * 5.1);
      g = 255;
    } else {
      // Yellow to Red
      r = 255;
      g = Math.floor(percentage * 5.1);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeout();
      const unanswered = totalQuestions - (correctAnswers + wrongAnswers);
      dispatch(setNotAnswered(unanswered));
      const timeUsed = totalTime - timeRemaining;
      dispatch(updateTimeUsed(timeUsed));
      dispatch(addTime(timeUsed));
      dispatch(resetTimer());
      dispatch(endQuiz());
      navigate("/stats");
      return;
    }

    const timerId = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timerId);
  }, [
    timeRemaining,
    onTimeout,
    dispatch,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
  ]);

  const percentage = (timeRemaining / totalTime) * 100;

  return (
    <div className="timer pt-4">
      <CircularProgressbar
        value={percentage}
        text={`${timeRemaining}s`}
        strokeWidth={8}
        styles={buildStyles({
          textSize: "20px",
          pathColor: getColor(percentage),
          textColor: "#3e98c7",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default Timer;
