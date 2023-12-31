import React from 'react';
import { Link } from "react-router-dom";
import ExcelHandler from '../components/cargaDinamica';
import Excelorzada from '../components/cargaForzada';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

function SantCons() {
    return (
    <div className="App">
        <div className='logo'><img src={logo} alt="logo" /></div>
        <h1>Normalización S.C.</h1>
        <ExcelHandler />
        <Excelorzada/>
        <Link to="/home" style={{ textDecoration: 'none' }}>
                <div >
                    <span>Regresar</span>
                </div>
            </Link>
        <Fot></Fot>
    </div>
    );
}

export default SantCons;
