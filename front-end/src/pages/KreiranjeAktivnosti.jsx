import React, { useContext, useEffect, useState } from "react";
import usePrivateGet from "../hooks/usePrivateGet";
import useAuth from "../hooks/useAuth";
import "./styles/KreiranjeAktivnosti.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import usePrivatePost from "../hooks/usePrivatePost";

const KreiranjeAktivnosti = () => {
  const [predavac, setPredavac] = useState();
  const { auth } = useAuth();
  const predavacData = usePrivateGet(`/predavaci/${auth.korisnicko_ime}`);
  const [predmeti, setPredmeti] = useState([]);
  const predmetiData = usePrivateGet("/predmeti/svi");
  const { postData, data, error, loading } = usePrivatePost();

  const [novaAktivnost, setNovaAktivnost] = useState({
    predavac_id: "",
    predmet_id: "",
    tip_aktivnosti: "",
    broj_studenata: "",
    naziv: "",
    redovna: false,
    trajanje: "",
  });

  useEffect(() => {
    setPredavac(predavacData);
    setNovaAktivnost((prevState) => ({
      ...prevState,
      predavac_id: predavacData?.id,
    }));
    // console.log(predavacData.id);
  }, [predavacData]);

  useEffect(() => {
    setPredmeti(predmetiData);
    // console.log(predmetiData);
  }, [predmetiData]);

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/linkpage");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaAktivnost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("/aktivnosti/dodaj", novaAktivnost);
    console.log(novaAktivnost);
  };

  const isFormValid = () => {
    return Object.values(novaAktivnost).every((value) => value !== "");
  };
  if (data) {
    return (
      <div>
        <p>Uspešno kreirana aktivnost!</p>
        <Link to="/moje-aktivnosti">Pogledaj moje aktivnosti</Link>
      </div>
    );
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
              <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo" />
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
          <div className="kreiranjeaktivnosti1">
            <h1>Kreiranje aktivnosti</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label>
                    Predavac aktivnosti: {predavac?.ime} {predavac?.prezime}
                  </label>
                </li>

                <li>
                  <label htmlFor="naziv">Naziv aktivnosti:</label>
                  <input
                    type="text"
                    id="naziv"
                    name="naziv"
                    value={novaAktivnost.naziv}
                    onChange={handleChange}
                  />
                </li>

                <li>
                  <label htmlFor="predmet_id" className="form-label">
                    Predmet:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    list="datalistOptions"
                    id="predmet_id"
                    name="predmet_id"
                    value={novaAktivnost.predmet_id}
                    onChange={handleChange}
                    placeholder="Type to search..."
                  />
                  <datalist id="datalistOptions">
                    {predmeti?.map((predmet) => (
                      <option
                        key={predmet.idPredmeta}
                        value={predmet.idPredmeta}
                      >
                        {predmet.nazivPredmeta}
                      </option>
                    ))}
                  </datalist>
                </li>

                <li>
                  <label htmlFor="tip_aktivnosti" className="form-label">
                    Tip aktivnosti:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    list="datalistOptions2"
                    id="tip_aktivnosti"
                    name="tip_aktivnosti"
                    value={novaAktivnost.tip_aktivnosti}
                    onChange={handleChange}
                    placeholder="Type to search..."
                  />
                  <datalist id="datalistOptions2">
                    <option value="Konsultacije" />
                    <option value="Nadoknada" />
                  </datalist>
                </li>

                <li>
                  <label htmlFor="broj_studenata">Broj studenata:</label>
                  <input
                    type="text"
                    id="broj_studenata"
                    name="broj_studenata"
                    value={novaAktivnost.broj_studenata}
                    onChange={handleChange}
                  />
                </li>

                <li>
                  <label htmlFor="trajanje">Trajanje:</label>
                  <input
                    type="text"
                    id="trajanje"
                    name="trajanje"
                    value={novaAktivnost.trajanje}
                    onChange={handleChange}
                  />
                </li>
              </ul>
              {loading && <p>Slanje zahteva...</p>}
              {error && (
                <p>Greška prilikom kreiranja aktivnosti: {error.message}</p>
              )}
              <button type="submit" disabled={!isFormValid()}>
                Kreiraj Aktivnost
              </button>
              <h4>
                Napomena: Predavac moze da kreira samo neredovnu aktivnost.
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default KreiranjeAktivnosti;
