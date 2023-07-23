// @css-file
import "App.css";
// @react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @components
import Error from "components/error";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>welcome Page !</h1>
              </>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
