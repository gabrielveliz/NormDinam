import { Link } from "react-router-dom";
import Fot from '../components/Fot';
import logo from '../assets/img/logo.PNG'
import "../App.css";

const Home = () =>{
    return( 
        <>
        <div className="App">
            <div className='logo'><img src={logo} alt="logo" /></div>
            <h1>Welcome to BI Console</h1>
            <Link to="/SanCon" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>S.C.</span>
                </div>
            </Link>
            <Link to="/C18" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>C18</span>
                </div>
            </Link>
            <Fot></Fot>
        </div>
        </>)
}

export default Home;