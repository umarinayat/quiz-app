import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const StatsPage = () => {
  const { correctAnswers, wrongAnswers, notAnswered, totalTime } = useSelector(
    (state) => state.stats
  );
  const totalAnswered = correctAnswers + wrongAnswers;
  const averageTime =
    totalAnswered > 0
      ? (totalTime / totalAnswered).toFixed(2)
      : "No questions answered";

  const navigate = useNavigate();

  const handleShare = useCallback(() => {
    html2canvas(document.body, { logging: false }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "quiz-stats.png");
      });
    });
  }, []);

  const handlePlayAgain = () => {
    handleShare();
    navigate("/");
  };

  return (
    <Container className="d-flex flex-column justify-content-center vh-100">
      <Row>
        <Col className="text-center">
          <h2 className="stats-header">Quiz Statistics</h2>
          <div className="stats-group">
            <p>
              Number of Correct Answers:{" "}
              <span className="stats-value">{correctAnswers}</span>
            </p>
            <p>
              Number of Wrong Answers:{" "}
              <span className="stats-value">{wrongAnswers}</span>
            </p>
            <p>
              Number of Not Answered Questions:{" "}
              <span className="stats-value">{notAnswered}</span>
            </p>
            <p>
              Total Time Taken:{" "}
              <span className="stats-value">{totalTime} seconds</span>
            </p>
            <p>
              Average Time Per Answer:{" "}
              <span className="stats-value">{averageTime}</span>{" "}
              {totalAnswered > 0 ? "seconds" : ""}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3 gap-3">
        <Col xs="auto">Share on:</Col>
        <Col xs="auto" className="text-center">
          <FacebookShareButton
            url={window.location.href}
            quote="Check out my quiz stats!"
            className="social-button mx-4"
            onClick={handleShare}
          >
            <FontAwesomeIcon icon={faFacebookF} size="2x" color="#3b5998" />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title="Check out my quiz stats!"
            className="social-button"
            onClick={handleShare}
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" color="#00acee" />
          </TwitterShareButton>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handlePlayAgain}>
            Play Again
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StatsPage;
