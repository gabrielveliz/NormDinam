import React  from 'react';
import { Link } from "react-router-dom";
import ResulCompc18 from '../components/ResulCompc18';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const C18Resul= () =>{


    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Resultantes C18</h1>
            <ResulCompc18 />
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

export default C18Resul;