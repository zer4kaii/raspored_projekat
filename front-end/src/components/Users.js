import {useEffect, useState} from 'react'
import axiosPrivate from '../api/axios';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import usePrivateGet from '../hooks/usePrivateGet';

const Users = () => {
    const [users,setUsers] = useState();
    const userData = usePrivateGet("/predavaci/svi")
    useEffect(()=>{
        setUsers(userData)
    },[userData])
  return (
    <article>
        <h2>Users list</h2>
        {users?.length
            ? (
                <ul>
                    {users.map((user, i)=> <li key={i}>
                            {user?.korisnickoIme}
                        </li>)}
                </ul>
            ) : <p>Nisu pronadjeni predavaci.</p>
        }
        
        <br/>
    </article>
  )
}

export default Users