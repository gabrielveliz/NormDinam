import React , { useState } from 'react';
import { Link } from "react-router-dom";
import MasCorrC18 from '../components/MasCorrC18';
import MasReproC18 from '../components/MasReproC18';
import MasCosto0C18 from '../components/MasCosto0C18';
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";
import Form from 'react-bootstrap/Form';


const CajD18 = () =>{
    const [fecha, setFecha] = useState(''); // fecha de oferta para masividades

    return(
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Masividad Correo C18</h1>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Fecha de Oferta</Form.Label>
            <Form.Control type="date" name="fecha"  
          onChange={(e) => setFecha(e.target.value)} />
            </Form.Group>
            <MasCorrC18 fecha={fecha}/>
            <br />
            <MasReproC18 fecha={fecha}/>
            <br />           
            <MasCosto0C18 fecha={fecha}/>
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