import React, { useEffect, useState } from 'react'
import usePrivateGet from '../hooks/usePrivateGet';
import { Link } from 'react-router-dom';

const SveUcionice = () => {

    const [ucionice, setUcionice] = useState([]);
    const ucioniceData = usePrivateGet('/ucionice/sve');

    useEffect(()=>{
        setUcionice(ucioniceData);
    },[ucioniceData])

  return (
    <>
    <Link to='/'>Nazad na kontrolnu tablu</Link>
    <br/>
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
            {ucionice?.map(ucionica=>{
                return <tr key = {ucionica.broj}>
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
    </>
    
  )
}

export default SveUcionice