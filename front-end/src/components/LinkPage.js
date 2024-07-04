import { Link } from "react-router-dom"
import './LinkPage.css';
import React from "react";

const LinkPage = () => {
    return (
        <section className="linksekcija">
            <div className="linkstrana">
                <h1>Links</h1>
                <Link to="/admin">Idite na admin stranicu</Link>
                <Link to="/linkpage">Idite na stranicu sa linkovima</Link>
                <Link to="/sve-ucionice">Sve ucionice</Link>
                <Link to="/trazenje-po-terminu">Trazenje po terminu</Link>
                <Link to="/trazenje-po-ucionici">Trazenje po ucionici</Link>
                <Link to="/moje-aktivnosti">Moje aktivnosti</Link>
                <h2>Public</h2>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <h2>Private</h2>
                <Link to="/">Home</Link>
                <Link to="/admin">Admin Page</Link>
            </div>
        </section>
    )
}

export default LinkPage
