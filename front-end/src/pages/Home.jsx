import styles from './Home.module.scss';
import useHttpGet from "../Hooks/useHttpGet";
import {useEffect} from "react";
import LoginForm from "../compontents/LoginForm";




const Home = () => {
    const korisnici = useHttpGet('/korisnici/svi')
    useEffect(() => {
        console.log(korisnici)
    }, [korisnici]);
    return (
      <>
        <LoginForm/>
      </>
    );
  }

export default Home;
