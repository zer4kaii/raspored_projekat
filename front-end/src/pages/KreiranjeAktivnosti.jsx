import React, {useContext, useEffect, useState} from "react";
import usePrivateGet from "../hooks/usePrivateGet";
import useAuth from "../hooks/useAuth";
import './styles/KreiranjeAktivnosti.css';
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const KreiranjeAktivnosti = () => {
  const [predavac, setPredavac] = useState();
  const { auth } = useAuth();
  const predavacData = usePrivateGet(`/predavaci/${auth.korisnicko_ime}`);
  const [predmeti, setPredmeti] = useState();
  const predmetiData = usePrivateGet("/predmeti/svi");

  useEffect(() => {
    setPredavac(predavacData);
    console.log(predavacData);
  }, [predavacData]);

  useEffect(() => {
    setPredmeti(predmetiData);
    console.log(predmetiData);
  }, [predmetiData]);

    const { setAuth,authy } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        navigate('/linkpage');
    }

  return (
    <>
        <div className="ucionicapage">
            <section className="p-menu1">
                <nav id="navbar" className="navigation" role="navigation">
                    <input id="toggle1" type="checkbox"/>
                    <label className="hamburger1" htmlFor="toggle1">
                        <div className="top"></div>
                        <div className="meat"></div>
                        <div className="bottom"></div>
                    </label>

                    <nav className="menu1">
                        <Link to="/">Pocetna</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/sve-ucionice">Ucionice</Link>
                        <Link to="/moje-aktivnosti">Moje aktivnosti</Link>
                        <Link to="/trazenje-po-terminu">Pretraga po terminima</Link>
                        <Link to="/trazenje-po-ucionici">Pretraga po ucionicama</Link>

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
                        <h2>Izlogujte se ovde => </h2>
                    </div>

                    <div className="logoutbutton1">
                        <h2 onClick={logout}>Sign Out</h2>
                    </div>
                </div>
                <div className="kreiranjeaktivnosti1">
                    <h1>Kreiranje aktivnosti</h1>
                    <ul>
                        <li>
                            <label>
                                Predavac aktivnosti: {predavac?.ime} {predavac?.prezime}
                            </label>
                        </li>

                        <li>
                            <label htmlFor='nazivAktivnostiInput'>
                                Naziv aktivnosti:
                            </label>
                            <input type='text' id='nazivAktivnostiInput'>
                            </input>
                        </li>

                        <li>
                            <label htmlFor="exampleDataList" className="form-label">
                                Predmet:
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                list="datalistOptions"
                                id="exampleDataList"
                                placeholder="Type to search..."
                            />
                        </li>

                        <li>
                            <datalist id="datalistOptions">
                                {predmeti?.map((predmet) => {
                                    return (
                                        <option key={predmeti.idPredmeta} value={predmet.nazivPredmeta}/>
                                    );
                                })}
                            </datalist>
                            <label htmlFor="exampleDataList" className="form-label">
                                Tip aktivnosti:
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                list="datalistOptions2"
                                id="exampleDataList"
                                placeholder="Type to search..."
                            />
                            <datalist id="datalistOptions2">
                                <option value='Konsultacije'/>
                                <option value='Nadoknada'/>
                            </datalist>
                        </li>

                        <li>
                            <label htmlFor='brojStudenataInput'>
                                Broj studenata:
                            </label>
                            <input type='text' id='brojStudenataInput'>
                            </input>
                        </li>

                        <li>
                            <label htmlFor='trajanjeInput'>
                                Trajanje:
                            </label>
                            <input type='text' id='trajanjeInput'>
                            </input>
                        </li>
                    </ul>
                    <h4>
                        Napomena: Predavac moze da kreira samo neredovnu aktivnost.
                    </h4>
                </div>
            </div>
        </div>

    </>
  );
};

export default KreiranjeAktivnosti;
