import React from 'react';
import { Link } from "react-router-dom";
import NormAsig18 from '../components/NormAsig18';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const CajD18 = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Normalización C18</h1>
            <NormAsig18/>
            <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div >
                        <span>Regresar</span>
                    </div>
            </Link>
            <Fot></Fot>
        </div>
        </>
    );
}

export default CajD18;