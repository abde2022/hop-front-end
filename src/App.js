// @css-file
import "App.css";
// @react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @components
import Error from "components/error";
import { theme } from "components/theme";
import { ThemeProvider } from "@mui/material/styles";
// @layouts
import ListingContactOrganisation from "layouts/contact-organisation/listing-contact-organisation";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ListingContactOrganisation />
                </>
              }
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
