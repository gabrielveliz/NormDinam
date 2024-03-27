import React from 'react';
import { Link } from "react-router-dom";
import InfCard05 from '../components/InfCard05';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const CardifInforVent = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Informe Ventas 05</h1>
            <InfCard05/>
            <Link to="/cardif" style={{ textDecoration: 'none' }}>
                    <div className="options" >
                        <span>Regresar</span>
                    </div>
            </Link>
            <Fot></Fot>
        </div>
        </>
    );
}

export default CardifInforVent;