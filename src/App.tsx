import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EditorPage } from "./pages/EditorPage";
import { MockupStateProvider } from "./context/MockupStateContext";

function App() {
  return (
    <BrowserRouter>
      <MockupStateProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<EditorPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </MockupStateProvider>
    </BrowserRouter>
  );
}

export default App;
