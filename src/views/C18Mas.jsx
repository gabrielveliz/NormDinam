import React from 'react';
import { Link } from "react-router-dom";
import MasCorrC18 from '../components/MasCorrC18';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const CajD18 = () =>{
    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Masividad Correo C18</h1>
            <MasCorrC18/>
            <br />
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

export default CajD18;