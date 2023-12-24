import React from 'react';
import ExcelHandler from './components/cargaDinamica';
import Fot from './components/Fot';
import logo from './assets/img/logo.PNG'
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className='logo'><img src={logo} alt="logo" /></div>
      <h1>Normalización</h1>
      <ExcelHandler />
      <Fot></Fot>
    </div>
  );
}

export default App;