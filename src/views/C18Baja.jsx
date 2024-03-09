import React from 'react';
import { Link } from "react-router-dom";
import BajaRec from '../components/BajaRec';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const C18Baja = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Bloqueo Recupero diario</h1>
            <BajaRec/>
            <Link to="/C18" style={{ textDecoration: 'none' }}>
                    <div className="options" >
                        <span>Regresar</span>
                    </div>
            </Link>
            <Fot></Fot>
        </div>
        </>
    );
}

export default C18Baja;