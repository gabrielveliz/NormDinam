import React from 'react';
import { Link } from "react-router-dom";

import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const CajD18 = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Menu C18 Cobranza</h1>
            <Link to="/C18asig" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Asignacion</span>
                </div>
            </Link>
            <Link to="/C18mas" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Masividad Correos</span>
                </div>
            </Link>
            <Link to="/c18baja" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Baja Recuperos</span>
                </div>
            </Link>
            <Link to="/C18comp" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Resultantes</span>
                </div>
            </Link>
            <br />
            <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div className="options" >
                        <span>Regresar</span>
                    </div>
            </Link>
            
            <Fot/>
        </div>
        </>
    );
}

export default CajD18;