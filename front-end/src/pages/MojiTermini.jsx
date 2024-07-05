import React, {useContext, useEffect, useState} from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import "./styles/MojiTermini.css";

const MojiTermini = () => {
    const [mojeZauzetosti, setMojeZauzetosti] = useState();
    const zauzetostiData = usePrivateGet('/zauzetosti/sve');
    const {auth} = useAuth();

    useEffect(()=>{
        //auth.korisnicko_ime
        const filter = zauzetostiData?.filter(zauzetost => zauzetost.aktivnost.predavac.korisnickoIme === auth.korisnicko_ime)
        setMojeZauzetosti(filter);
    },[zauzetostiData])

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate("/linkpage");
    };

  return (
    <>
        <div className="ucionicapage">
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
                        <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo"/>
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
                <div className="mojitermini">
                    <h2>Moji termini</h2>
                    <br>
                    </br>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Naziv aktivnosti:
                            </th>
                            <th>
                                Naziv predmeta:
                            </th>
                            <th>
                                Tip aktivnosti:
                            </th>
                            <th>
                                Datum:
                            </th>
                            <th>
                                Vreme od:
                            </th>
                            <th>
                                Vreme do:
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {mojeZauzetosti?.map(zauzetost => {
                            return <tr key={zauzetost.idZauzetosti}>
                                <td>
                                    {zauzetost.aktivnost.naziv}
                                </td>
                                <td>
                                    {zauzetost.aktivnost.predmet.nazivPredmeta}
                                </td>
                                <td>
                                    {zauzetost.aktivnost.tipAktivnosti}
                                </td>
                                <td>
                                    {zauzetost.id.datum[0]}/{zauzetost.id.datum[1]}/{zauzetost.id.datum[2]}
                                </td>
                                <td>
                                    {zauzetost.id.vremeOd}
                                </td>
                                <td>
                                    {zauzetost.vremeDo}
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    <div className="trazter">
                        <Link to='/trazenje-po-terminu'>Zauzmi termin</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MojiTermini