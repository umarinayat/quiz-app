import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setNumQuestions,
  setCategory,
  fetchQuestions,
  fetchCategories,
} from "../features/questions/numQuestionsSlice";
import { setDifficulty, setTotalTime } from "../features/timer/timerSlice";

const StartPage = () => {
  const navigate = useNavigate();
  const category = useSelector((state) => state.numQuestions.category);
  const categories = useSelector((state) => state.numQuestions.categories);
  const totalTime = useSelector((state) => state.timer.totalTime);
  const difficulty = useSelector((state) => state.timer.difficulty);

  const dispatch = useDispatch();
  const numQuestions = useSelector((state) => state.numQuestions.value);

  const handleNumQuestionsChange = (event) => {
    dispatch(setNumQuestions(Number(event.target.value)));
  };

  const handleStartGame = (difficulty) => {
    const timePerQuestion =
      difficulty === "easy" ? 30 : difficulty === "medium" ? 20 : 10;
    const totalTime = numQuestions * timePerQuestion;

    dispatch(setDifficulty(difficulty));
    dispatch(setTotalTime(totalTime));
    dispatch(fetchQuestions({ numQuestions, category })).then((result) => {
      if (fetchQuestions.fulfilled.match(result)) {
        console.log("Fetched questions:", result.payload);
        navigate("/game");
      } else {
        console.error("Failed to fetch questions:", result.error);
      }
    });
  };

  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  useEffect(() => {
    console.log("Total Time:", totalTime);
    console.log("Difficulty:", difficulty);
  }, [totalTime, difficulty]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container
      fluid
      style={{ backgroundColor: "#0d1117" }}
      className="text-center vh-100 justify-content-center align-items-center d-flex flex-col"
    >
      <Row>
        <Col>
          <h1 className="text-white">Ready to test your knowledge?</h1>
          <Form className="d-flex flex-row justify-content-center">
            <Form.Select
              aria-label="Select number of questions"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className="w-50"
            >
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
                <option key={num} value={num}>
                  {num} questions
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Select category"
              value={category}
              onChange={handleCategoryChange}
              className="w-50 ms-2"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form>
          <button
            onClick={() => handleStartGame("easy")}
            className="btn btn-primary mt-3"
          >
            Easy
          </button>
          <button
            onClick={() => handleStartGame("medium")}
            className="btn btn-secondary mt-3 ms-2"
          >
            Medium
          </button>
          <button
            onClick={() => handleStartGame("hard")}
            className="btn btn-danger mt-3 ms-2"
          >
            Hard
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default StartPage;
