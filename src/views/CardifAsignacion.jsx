import React from 'react';
import { Link } from "react-router-dom";
import AsigCardif from '../components/AsigCardif';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const CardifAsignacion = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Asignacion</h1>
            <AsigCardif/>
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

export default CardifAsignacion;