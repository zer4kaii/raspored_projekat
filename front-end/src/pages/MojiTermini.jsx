import React, { useEffect, useState } from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const MojiTermini = () => {
    const [mojeZauzetosti, setMojeZauzetosti] = useState();
    const zauzetostiData = usePrivateGet('/zauzetosti/sve');
    const {auth} = useAuth();

    useEffect(()=>{
        //auth.korisnicko_ime
        const filter = zauzetostiData?.filter(zauzetost => zauzetost.aktivnost.predavac.korisnickoIme === auth.korisnicko_ime)
        setMojeZauzetosti(filter);
    },[zauzetostiData])

  return (
    <>
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
    <br></br>
    <Link to='/trazenje-po-terminu'>Zauzmi termin</Link>
    </>
  )
}

export default MojiTermini