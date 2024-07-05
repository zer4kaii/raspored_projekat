import React, { useContext, useEffect, useState } from "react";
import usePrivateGet from "../hooks/usePrivateGet";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "./styles/TrazenjePoTerminu.css";
import usePrivatePost from "../hooks/usePrivatePost";
import useAuth from "../hooks/useAuth";

const TrazenjePoTerminu = () => {
  const [zauzetosti, setZauzetosti] = useState([]);
  const [novaAktivnostId, setNovaAktivnostId] = useState("");
  // Vraca nam format
  // data.id.brUc
  // data.id.datum[GODINA,MESEC,DAN] u brojevima
  // data.id.vremeOd
  // data.vremeDo
  const zauzetostiData = usePrivateGet("/zauzetosti/sve");
  const [ucionice, setUcionice] = useState([]);
  const ucioniceData = usePrivateGet("/ucionice/sve");
  const [zauzeteUcionice, setZauzeteUcionice] = useState();
  const [vremeOd, setVremeOd] = useState("");
  const [trajanje, setTrajanje] = useState("");
  const [vremeDo, setVremeDo] = useState();
  const [datum, setDatum] = useState("");
  const [mojeAktivnosti, setMojeAktivnosti] = useState();
  const aktivnostiData = usePrivateGet("/aktivnosti/sve");

  useEffect(() => {
    //auth.korisnicko_ime
    const filter = aktivnostiData?.filter(
      (aktivnost) => aktivnost.predavac.korisnickoIme === auth.korisnicko_ime
    );
    setMojeAktivnosti(filter);
  }, [aktivnostiData]);

  const { postData, data, error, loading } = usePrivatePost();

  const onVremeOdChange = (event) => {
    if (event.target.value > 24 || event.target.value < 0) setVremeOd(24);
    else {
      setVremeOd(event.target.value);
    }
  };

  const onAktivnostChange = (event) => {
    setNovaAktivnostId(event.target.value);
  }
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
    console.log("Izabrani " + datum);
    setZauzeteUcionice([]);
    console.log(zauzetosti);
    const filter = zauzetosti.filter((data) => {
      const dataDatum =
        data.id.datum[0] +
        "-" +
        (data.id.datum[1] < 10 ? "0" + data.id.datum[1] : data.id.datum[1]) +
        "-" +
        data.id.datum[2];
      console.log("datum aktivnosti" + dataDatum);
      if (
        ((data.id.vremeOd <= vremeOd && data.vremeDo > vremeOd) ||
          (data.id.vremeOd < vremeDo && data.vremeDo > vremeDo)) &&
        dataDatum === datum
      ) {
        setZauzeteUcionice((prev) => {
          return [...prev, data.id.brUc];
        });
      }
    });
  }, [vremeOd, vremeDo, datum]);

  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  const terminCheck = () => {
    if (trajanje === "" || vremeOd === "" || datum === "" || novaAktivnostId === "") return false;
    return true;
  };

  const handleZauzimanje = (ucBr) => {
    let odvojenDatum = datum.split("-");
    console.log("AAAAAAA" + odvojenDatum);
    let body = {
      id: {
        datum: [
          parseInt(odvojenDatum[0]),
          parseInt(odvojenDatum[1]),
          parseInt(odvojenDatum[2]),
        ],
        vremeOd: vremeOd,
        brUc: ucBr,
      },
      vreme_do: vremeDo,
      aktivnost_id: novaAktivnostId,
    };
    console.log(body);
    postData("/zauzetosti/dodaj", body);
    console.log(ucBr);
  };
  if (data) {
    return (
        <>
          <div className="uspesnotermin">
            <div className="termin1">
              <h2>Uspesno zakazan termin za vasu aktivnost!</h2>
              <Link to="/moji-termini">Pogledaj moje termine</Link>
            </div>
        </div>
        </>
    )
  }
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
            <div className="termintabela">
              <h1>Unesite termin</h1>
              <h2>Filtriranje</h2>
              <ul>
                <li>
                  <label>U koliko sati počinje?</label>
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
              <h2>Izaberite jednu od vasih aktivnosti:</h2>
              <input
                    className="form-control"
                    type="text"
                    list="datalistaAktivnosti"
                    id="predmet_id"
                    name="predmet_id"
                    value={novaAktivnostId}
                    onChange={onAktivnostChange}
                    placeholder="Type to search..."
                  />
              <datalist id="datalistaAktivnosti">
                    {mojeAktivnosti?.map((aktivnost) => (
                      <option
                        key={aktivnost.idAktivnosti}
                        value={aktivnost.idAktivnosti}
                      >
                        {aktivnost.naziv}
                      </option>
                    ))}
                  </datalist>
              <h2 className="naslovtermin1">
                Slobodne ucionice u datom terminu
              </h2>
              <table className="ucioniceTabela">
                <thead>
                  <tr>
                    <th>Broj</th>

                    <th>Tip</th>

                    <th>Kapacitet za kolokvijum</th>

                    <th>Kapacitet za predavanje</th>
                    <th>Zauzmi ucionicu za termin</th>
                  </tr>
                </thead>
                <tbody>
                  {ucionice
                    ?.filter(
                      (ucionica) => !zauzeteUcionice.includes(ucionica.broj)
                    )
                    .map((ucionica) => {
                      return (
                        <tr key={ucionica?.broj}>
                          <td>{ucionica?.broj}</td>
                          <td>{ucionica?.naziv}</td>
                          <td>{ucionica?.kapK}</td>
                          <td>{ucionica?.kapS}</td>
                          <td>
                            <button
                              disabled={!terminCheck()}
                              onClick={() => handleZauzimanje(ucionica?.broj)}
                            >
                              Zauzmi
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="controlpanel">
                <Link to="/moji-termini">Pregledaj zakazane aktivnosti</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default TrazenjePoTerminu;
