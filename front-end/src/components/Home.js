import { useNavigate, Link } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import './Home.css';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            <div className="background-container">
                <div className="picture1">
                    <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo"/>
                </div>
                <div className="text-overlay">
                    <img src={process.env.PUBLIC_URL + "/img/fax.jpg"} alt="fax"/>
                    <h1></h1>
                </div>
            </div>
            <div className="homemenu">
                <Link to="/admin">Idite na admin stranicu</Link>
                <Link to="/linkpage">Idite na stranicu sa linkovima</Link>
                <Link to="/sve-ucionice">Sve ucionice</Link>
                <Link to="/trazenje-po-terminu">Trazenje po terminu</Link>
                <Link to="/trazenje-po-ucionici">Trazenje po ucionici</Link>
                <Link to="/moje-aktivnosti">Moje aktivnosti</Link>
                <div className="flexGrow">
                    <h2 onClick={logout}>Sign Out</h2>
                </div>
            </div>
        </section>
    )
}

export default Home
