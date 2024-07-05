import React, { useEffect, useState } from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom';
import "./styles/MojeAktivnosti.css";

const MojeAktivnosti = () => {

    const [mojeAktivnosti, setMojeAktivnosti] = useState();
    const aktivnostiData = usePrivateGet('/aktivnosti/sve');
    const {auth} = useAuth();

    useEffect(()=>{
        //auth.korisnicko_ime
        const filter = aktivnostiData?.filter(aktivnost => aktivnost.predavac.korisnickoIme === auth.korisnicko_ime)
        setMojeAktivnosti(filter);
    },[aktivnostiData])

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        navigate("/linkpage");
    };

  return (
    <>
        <div className="aktivnostidiv">
            <section className="p-menu1">
                <nav id="navbar" className="navigation" role="navigation">
                    <input id="toggle1" type="checkbox" />
                    <label className="hamburger1" htmlFor="toggle1">
                        <div className="top"></div>
                        <div className="meat"></div>
                        <div className="bottom"></div>
                    </label>

                    <nav className="menu1">
                        <Link to="/">Pocetna</Link>
                        <Link to="/admin">Admin stranica</Link>
                        <Link to="/linkpage">Stranica sa linkovima</Link>
                        <Link to="/sve-ucionice">Sve ucionice</Link>
                        <Link to="/trazenje-po-terminu">Trazenje po terminu</Link>
                        <Link to="/moje-aktivnosti">Moje aktivnosti</Link>
                        <Link to="/moji-termini">Moji termini</Link>
                    </nav>
                </nav>
            </section>
            <div className="podelaekrana">
                <div className="fullnavbar">
                    <div className="logo">
                        <img
                            src={process.env.PUBLIC_URL + "/img/logo.png"}
                            alt="Logo"
                        />
                    </div>

                    <div className="username123">
                        <h2>Dobrodosli, {auth.korisnicko_ime}! </h2>
                    </div>

                    <div className="logoff">
                        <h2>Izlogujte se ovde =&gt; </h2>
                    </div>

                    <div className="logoutbutton1">
                        <h2 onClick={logout}>Sign Out</h2>
                    </div>
                </div>
                <div className="akt123">
                    <h2>MojeAktivnosti</h2>
                    <br>
                    </br>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Naziv aktivnosti
                            </th>
                            <th>
                                Naziv predmeta
                            </th>
                            <th>
                                Tip aktivnosti
                            </th>
                            <th>
                                Broj studenata
                            </th>
                            <th>
                                Redovna
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {mojeAktivnosti?.map(aktivnost => {
                            return <tr key={aktivnost.idAktivnosti}>
                                <td>
                                    {aktivnost.naziv}
                                </td>
                                <td>
                                    {aktivnost.predmet.nazivPredmeta}
                                </td>
                                <td>
                                    {aktivnost.tipAktivnosti}
                                </td>
                                <td>
                                    {aktivnost.broj_studenata}
                                </td>
                                <td>
                                    {aktivnost.redovna ? "Da" : "Ne"}
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    <div className="kreirajaktivnost">
                        <Link to='/kreiranje-aktivnosti'>Kreiraj novu aktivnost</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MojeAktivnosti