import React from 'react';
import { Link } from "react-router-dom";
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const Cardif = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Cardif</h1>
            <Link to="/Cardifasign" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Asignacion</span>
                </div>
            </Link>
            <Link to="/CardifInforVent" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Inf Ventas 05</span>
                </div>
            </Link>
            <br />
            <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div className="options" >
                        <span>Regresar</span>
                    </div>
            </Link>
            <Fot></Fot>
        </div>
        </>
    );
}

export default Cardif;