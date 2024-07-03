import React, {useContext, useEffect, useState} from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import {Link, useNavigate} from 'react-router-dom';
import './styles/SveUcionice.css';
import AuthContext from "../context/AuthProvider";
//import './img/logo.png';

const SveUcionice = () => {

    const [ucionice, setUcionice] = useState([]);
    const ucioniceData = usePrivateGet('/ucionice/sve');

    useEffect(()=>{
        setUcionice(ucioniceData);
    },[ucioniceData])

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
          <div className="fullnavbar">
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
                          <Link to="/trazenje-po-terminu">Zakazivanje termina</Link>
                          <Link to="/trazenje-po-ucionici">Pretraga po ucionicama</Link>

                      </nav>
                  </nav>
              </section>

              <div className="logo">
                  <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo"/>
              </div>

              <div className="username123">
                  <h2>Dobrodosli, {auth.korisnicko_ime} </h2>
              </div>

              <div className="logo">
                  <img src="NEMOZEJEBENODARADI" alt="random ass slika"/>
              </div>

              <div className="logoutbutton1">
                  <button onClick={logout}>Sign Out</button>
              </div>

          </div>
          <br/>
          <div className="tabela1">
              <h2>Spisak svih ucionica</h2>
              <table className='ucioniceTabela'>
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
          <div className="controlpanel">
            <Link to='/'>Nazad na kontrolnu tablu</Link>
          </div>
      </>

  )
}

export default SveUcionice