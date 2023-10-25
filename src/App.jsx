import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import StartPage from "./pages/StartPage";
import QuestionPage from "./pages/QuestionPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<QuestionPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
