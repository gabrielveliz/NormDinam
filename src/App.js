import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SantCons from "./views/SantCons"
import CajD18 from "./views/CajD18"
import ResultSC from "./views/ResultSC"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SanCon" element={<SantCons />} />
      <Route path="/ResulanteSC" element={<ResultSC />} />
      <Route path="/C18" element={<CajD18 />} />
      <Route render={() => <h1>Not found!</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
