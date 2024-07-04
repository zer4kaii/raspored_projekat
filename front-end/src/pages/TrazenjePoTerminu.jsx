import React, {useContext, useEffect, useState} from "react";
import usePrivateGet from "../hooks/usePrivateGet";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "./styles/TrazenjePoTerminu.css"

const TrazenjePoTerminu = () => {
  const [zauzetosti, setZauzetosti] = useState([]);

  // Vraca nam format
  // data.id.brUc
  // data.id.datum[GODINA,MESEC,DAN] u brojevima
  // data.id.vremeOd
  // data.vremeDo
  const zauzetostiData = usePrivateGet("/zauzetosti/sve");
  const [ucionice, setUcionice] = useState([]);
  const ucioniceData = usePrivateGet("/ucionice/sve");
  const [zauzeteUcionice, setZauzeteUcionice] = useState();
  const [vremeOd, setVremeOd] = useState();
  const [trajanje, setTrajanje] = useState();
  const [vremeDo, setVremeDo] = useState();
  const [datum, setDatum] = useState();

  const onVremeOdChange = (event) => {
    if (event.target.value > 24 || event.target.value < 0) setVremeOd(24);
    else {
      setVremeOd(event.target.value);
    }
  };

  const onTrajanjeChange = (event) => {
    if (event.target.value > 4 || event.target.value < 0) {
      setTrajanje(4);
      setVremeDo(vremeOd + 4);
    } else {
      setTrajanje(event.target.value);
      setVremeDo(parseInt(vremeOd) + parseInt(event.target.value));
    }
  };
  useEffect(() => {
    setZauzetosti(zauzetostiData);
    setUcionice(ucioniceData);
  }, [zauzetostiData, ucioniceData]);

  const onDatumChange = (event) => {
    const todays_date = new Date();
    todays_date.setHours(0, 0, 0, 0);
    const target_date = new Date(event.target.value);
    if (target_date < todays_date) {
      console.log("error");
      setDatum(event.target.value);
    }
    setDatum(event.target.value);
  };

  useEffect(() => {
    console.log('Izabrani '+ datum );
    setZauzeteUcionice([]);
    console.log(zauzetosti);
    const filter = zauzetosti.filter((data) => {
      const dataDatum =
        data.id.datum[0] +
        "-" +
        (data.id.datum[1] < 10 ? "0" + data.id.datum[1] : data.id.datum[1]) +
        "-" +
        data.id.datum[2];
      console.log('datum aktivnosti' + dataDatum);
      if (
        ((data.id.vremeOd <= vremeOd && data.vremeDo > vremeOd) ||
        (data.id.vremeOd < vremeDo &&
          data.vremeDo > vremeDo )) &&
          dataDatum === datum
      ) {
        setZauzeteUcionice((prev) => {
          return [...prev, data.id.brUc];
        });
      }
    });
  }, [vremeOd, vremeDo, datum]);

  const { setAuth,auth } = useContext(AuthContext);
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
          <div className="termintabela">
            <h1>Unesite termin</h1>
            <h2>Filtriranje</h2>
            <ul>
              <li><label>U koliko sati počinje?</label>
                <input
                    type="text"
                    onChange={onVremeOdChange}
                    value={vremeOd}
                    placeholder="napisite samo broj 0-23"
                ></input>
              </li>

              <li>
                <label>Koliko casova traje?</label>
                <input
                    type="text"
                    onChange={onTrajanjeChange}
                    value={trajanje}
                    placeholder="Broj casova"
                ></input>
              </li>

              <li>
                <label>Datum termina</label>
                <input
                    type="date"
                    onChange={onDatumChange}
                    value={datum}
                    placeholder="datum"
                ></input>
              </li>
            </ul>

            <h2 className="naslovtermin1">Slobodne ucionice u datom terminu</h2>
            <table className="ucioniceTabela">
              <thead>
              <tr>
                <th>Broj</th>

                <th>Tip</th>

                <th>Kapacitet za kolokvijum</th>

                <th>Kapacitet za predavanje</th>
              </tr>
              </thead>
              <tbody>
              {ucionice
                  ?.filter((ucionica) => !zauzeteUcionice.includes(ucionica.broj))
                  .map((ucionica) => {
                    return (
                        <tr key={ucionica.broj}>
                          <td>{ucionica.broj}</td>
                          <td>{ucionica.naziv}</td>
                          <td>{ucionica.kapK}</td>
                          <td>{ucionica.kapS}</td>
                        </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="controlpanel">
              <Link to='/'>Nazad na kontrolnu tablu</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrazenjePoTerminu;
