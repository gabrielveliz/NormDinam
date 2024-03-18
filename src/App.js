import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SantCons from "./views/SantCons"
import CajD18 from "./views/CajD18"
import C18Asig from "./views/C18Asig"
import C18Baja from "./views/C18Baja"
import C18Mas from "./views/C18Mas"
import Cardif from "./views/Cardif"
import ResultSC from "./views/ResultSC"
import C18Resul from "./views/C18Resul"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SanCon" element={<SantCons />} />
      <Route path="/cardif" element={<Cardif />} />
      <Route path="/ResulanteSC" element={<ResultSC />} />
      <Route path="/C18" element={<CajD18 />} />
      <Route path="/C18asig" element={<C18Asig />} />
      <Route path="/C18mas" element={<C18Mas />} />
      <Route path="/C18Baja" element={<C18Baja />} />
      <Route path="/C18comp" element={<C18Resul />} />
      <Route render={() => <h1>Not found!</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
