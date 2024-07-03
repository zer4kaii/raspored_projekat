import React, { useEffect, useState } from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const MojeAktivnosti = () => {

    const [mojeAktivnosti, setMojeAktivnosti] = useState();
    const aktivnostiData = usePrivateGet('/aktivnosti/sve');
    const {auth} = useAuth();

    useEffect(()=>{
        //auth.korisnicko_ime
        const filter = aktivnostiData?.filter(aktivnost => aktivnost.predavac.korisnickoIme === auth.korisnicko_ime)
        setMojeAktivnosti(filter);
    },[aktivnostiData])

  return (
    <>
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
                        {aktivnost.redovna?"Da":"Ne"}
                    </td>
                </tr>
            })}
        </tbody>
    </table>
    <br></br>
    <Link to='/kreiranje-aktivnosti'>Kreiraj novu aktivnost</Link>
    </>
  )
}

export default MojeAktivnosti