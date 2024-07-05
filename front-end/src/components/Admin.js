import React, {useContext, useEffect, useState} from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import {Link, useNavigate} from 'react-router-dom';
import './Admin.css';
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const Admin = () => {

    const [ucionice, setUcionice] = useState([]);
    const ucioniceData = usePrivateGet('/ucionice/sve');

    const [predmeti, setPredmeti] = useState([]);
    const predmetiData = usePrivateGet('/predmeti/svi');

    const [smerovi, setSmerovi] = useState([]);
    const smeroviData = usePrivateGet('/smerovi/svi');

    const [predmetiNaSmeru, setpredmetiNaSmeru] = useState([]);
    const predmetiNaSmeruData = usePrivateGet('/predmeti_na_smeru/svi');

    const [predavaci, setPredavaci] = useState([]);
    const predavaciData = usePrivateGet('/predavaci/svi');

    const [aktivnosti, setAktivnosti] = useState([]);
    const aktivnostiData = usePrivateGet('/aktivnosti/sve');

    useEffect(()=>{
        setUcionice(ucioniceData);
    },[ucioniceData])

    useEffect(()=>{
        setPredmeti(predmetiData);
    },[predmetiData])

    useEffect(()=>{
        setSmerovi(smeroviData);
    },[smeroviData])

    useEffect(()=>{
        setpredmetiNaSmeru(predmetiNaSmeruData);
    },[predmetiNaSmeruData])

    useEffect(()=>{
        setPredavaci(predavaciData);
    },[predavaciData])

    useEffect(()=>{
        setAktivnosti(aktivnostiData);
    },[aktivnostiData])

    useEffect(() => {
        console.log('predmetiNaSmeruData:', predmetiNaSmeruData);
        if (predmetiNaSmeruData) {
            setpredmetiNaSmeru(predmetiNaSmeruData);
        }
    }, [predmetiNaSmeruData]);

    const { setAuth,auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        navigate('/linkpage');
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS', options);
    };

    return (
        <>
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>

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
                            <h2>Izlogujte se ovde => </h2>
                        </div>

                        <div className="logoutbutton1">
                            <h2 onClick={logout}>Sign Out</h2>
                        </div>

                    </div>
                    <br/>
                    <div className="skuptabela">
                        <div className="tabela1">
                            <h2>Spisak svih smerova</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        Id smera:
                                    </th>
                                    <th>
                                        Naziv smera:
                                    </th>
                                    <th>
                                        Broj studenata:
                                    </th>
                                    <th>
                                        Datum akreditacije:
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {smerovi?.map(smer => {
                                    return <tr key={smer.idSmera}>
                                        <td>
                                            {smer.idSmera}
                                        </td>
                                        <td>
                                            {smer.nazivSmera}
                                        </td>
                                        <td>
                                            {smer.brojStudenata}
                                        </td>
                                        <td>
                                            {formatDate(smer.datumAkreditacije)}
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>

                            <h2>Spisak svih predmeta</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        Id predmeta:
                                    </th>
                                    <th>
                                        Naziv predmeta:
                                    </th>
                                    <th>
                                        Broj studenata:
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {predmeti?.map(predmet => {
                                    return <tr key={predmet.idPredmeta}>
                                        <td>
                                            {predmet.idPredmeta}
                                        </td>
                                        <td>
                                            {predmet.nazivPredmeta}
                                        </td>
                                        <td>
                                            {predmet.brojStudenata}
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>

                            <h2>Spisak svih predmeta sa odgovarajucim smerovima</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        Id smera:
                                    </th>
                                    <th>
                                        Id predmeta:
                                    </th>
                                    <th>
                                        Izborni/Obavezan:
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {predmetiNaSmeru?.map(pns => {
                                    return (
                                        <tr key={pns.id.idS}>
                                            <td>
                                                {pns.idS}
                                            </td>
                                            <td>
                                                {pns.idP}
                                            </td>
                                            <td>
                                                {pns.tip}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            <h2>Spisak svih predavaca</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        Id predavaca:
                                    </th>
                                    <th>
                                        Ime:
                                    </th>
                                    <th>
                                        Prezime:
                                    </th>
                                    <th>
                                        Titula:
                                    </th>
                                    <th>
                                        Korisnicko ime:
                                    </th>
                                    <th>
                                        Lozinka:
                                    </th>
                                    <th>
                                        E-mail:
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {predavaci?.map(predavac => {
                                    return (
                                        <tr key={predavac.id}>
                                            <td>
                                                {predavac.id}
                                            </td>
                                            <td>
                                                {predavac.ime}
                                            </td>
                                            <td>
                                                {predavac.prezime}
                                            </td>
                                            <td>
                                                {predavac.titula}
                                            </td>
                                            <td>
                                                {predavac.korisnickoIme}
                                            </td>
                                            <td>
                                                {predavac.sifra}
                                            </td>
                                            <td>
                                                {predavac.email}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            

                            <h2>Spisak svih ucionica</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        Broj
                                    </th>

                                    <th>
                                        Tip
                                    </th>

                                    <th>
                                        Kapacitet za kolokvijum
                                    </th>

                                    <th>
                                        Kapacitet za predavanje
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {ucionice?.map(ucionica => {
                                    return <tr key={ucionica.broj}>
                                        <td>
                                            {ucionica.broj}
                                        </td>
                                        <td>
                                            {ucionica.naziv}
                                        </td>
                                        <td>
                                            {ucionica.kapK}
                                        </td>
                                        <td>
                                            {ucionica.kapS}
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
