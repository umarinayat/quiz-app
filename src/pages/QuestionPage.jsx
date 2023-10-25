import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import {
  incrementCorrect,
  incrementWrong,
  incrementNotAnswered,
  addTime,
} from "../features/stats/statsSlice"; // Import the actions
import { togglePause, startQuiz, endQuiz } from "../features/timer/timerSlice";

const QuestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const questions = useSelector((state) => state.numQuestions.questions);
  const totalTime = useSelector((state) => state.timer.totalTime);
  const timeRemaining = useSelector((state) => state.timer.timeRemaining);

  const handleAnswerSelect = (event) => {
    setShowAnswer(true);
    setSelectedAnswer(event.target.value);
    if (
      event.target.value === questions[currentQuestionIndex]?.correct_answer
    ) {
      dispatch(incrementCorrect());
    } else {
      dispatch(incrementWrong());
    }
  };

  const handleNextQuestion = () => {
    setIsLoading(true);

    if (!showAnswer) {
      dispatch(incrementNotAnswered());
    }

    if (currentQuestionIndex === questions.length - 1) {
      dispatch(endQuiz());
      const timeUsed = totalTime - timeRemaining;
      dispatch(addTime(timeUsed));
      navigate("/stats");
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 3000);
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(togglePause());
    } else {
      dispatch(togglePause());
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    dispatch(startQuiz());
    return () => {
      dispatch(endQuiz());
    };
  }, [dispatch]);

  return (
    <Container>
      <Timer
        onTimeout={() => {
          setShowAnswer(true);
          if (!selectedAnswer) {
            dispatch(incrementNotAnswered());
          }
        }}
      />
      <Row>
        {isLoading ? (
          <div className="loader-container">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Col>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{questions[currentQuestionIndex]?.question}</p>
            {questions[currentQuestionIndex]?.type === "multiple" ? (
              <Form>
                {questions[currentQuestionIndex]?.incorrect_answers
                  .concat(questions[currentQuestionIndex]?.correct_answer)
                  .map((answer, index) => (
                    <Form.Group
                      className={`answers ${
                        selectedAnswer
                          ? answer ===
                            questions[currentQuestionIndex]?.correct_answer
                            ? "correct-answer"
                            : selectedAnswer === answer
                            ? "incorrect-answer"
                            : ""
                          : ""
                      }`}
                      key={index}
                    >
                      <Form.Check
                        type="radio"
                        id={`radio-${index}`}
                        value={answer}
                        name="answerOptions"
                        onChange={handleAnswerSelect}
                        checked={selectedAnswer === answer}
                        hidden
                      />
                      <Form.Label
                        htmlFor={`radio-${index}`}
                        className="w-100 d-block"
                        style={{ cursor: "pointer" }}
                      >
                        {answer}
                      </Form.Label>
                    </Form.Group>
                  ))}
              </Form>
            ) : questions[currentQuestionIndex]?.type === "boolean" ? (
              <Form>
                {["True", "False"].map((value, index) => (
                  <Form.Group
                    className={`answers ${
                      selectedAnswer
                        ? value ===
                          questions[currentQuestionIndex]?.correct_answer
                          ? "correct-answer"
                          : selectedAnswer === value
                          ? "incorrect-answer"
                          : ""
                        : ""
                    }`}
                    key={index}
                  >
                    <Form.Check
                      type="radio"
                      id={`radio-${value}`}
                      value={value}
                      name="answerOptions"
                      onChange={handleAnswerSelect}
                      checked={selectedAnswer === value}
                      hidden
                    />
                    <Form.Label
                      htmlFor={`radio-${value}`}
                      className="w-100 d-block"
                      style={{ cursor: "pointer" }}
                    >
                      {value}
                    </Form.Label>
                  </Form.Group>
                ))}
              </Form>
            ) : null}

            {showAnswer && (
              <div className="answer-section">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Correct Answer:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      plaintext
                      readOnly
                      className="text-success"
                      value={questions[currentQuestionIndex]?.correct_answer}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Your Answer:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      plaintext
                      readOnly
                      value={selectedAnswer}
                      className={
                        selectedAnswer ===
                        questions[currentQuestionIndex]?.correct_answer
                          ? "text-success"
                          : "text-danger"
                      }
                    />
                  </Col>
                </Form.Group>
                <Alert
                  variant={
                    selectedAnswer ===
                    questions[currentQuestionIndex]?.correct_answer
                      ? "success"
                      : "danger"
                  }
                >
                  {selectedAnswer ===
                  questions[currentQuestionIndex]?.correct_answer
                    ? "Correct!"
                    : "Incorrect!"}
                </Alert>
              </div>
            )}
            <div className="d-flex flex-row justify-content-end">
              <Button onClick={handleNextQuestion} className="mt-3">
                Next Question
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default QuestionPage;
