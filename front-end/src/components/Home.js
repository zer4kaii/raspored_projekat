import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

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
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/admin">Idite na admin stranicu</Link>
            <br />
            <Link to="/linkpage">Idite na stranicu sa linkovima</Link>
            <br />
            <Link to="/sve-ucionice">Sve ucionice</Link>
            <br />
            <Link to="/trazenje-po-terminu">Trazenje po terminu</Link>
            <br />
            <Link to="/trazenje-po-ucionici">Trazenje po ucionici</Link>
            <br />
            <Link to="/moje-aktivnosti">Moje aktivnosti</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
