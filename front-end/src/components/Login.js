import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

import axios from '../api/axios';
const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [korisnicko_ime, setUser] = useState('');
    const [sifra, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [korisnicko_ime, sifra])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ korisnicko_ime, sifra }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.authorities;
            console.log(accessToken);
            console.log(roles);
            setAuth({ korisnicko_ime, sifra, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <div className="wholepage">
                <div className="loginforma">
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo"/>
                    </div>
                    <h1>Sign In</h1>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forma1">
                            <h3><label htmlFor="username">Username:</label></h3>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={korisnicko_ime}
                                required
                            />
                        </div>

                        <div className="forma2">
                            <h3><label htmlFor="password">Password: </label></h3>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={sifra}
                                required
                            />
                        </div>
                        <div className="signindugme">
                            <button>Sign In</button>
                        </div>
                    </form>
                    <br/>
                    <p>
                        Need an Account?
                    </p>
                    <div className="logindugme">
                        <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login
