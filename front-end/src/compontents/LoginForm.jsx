import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [sifra, setSifra] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/korisnici/login', {
                korisnickoIme,
                sifra
            });
            console.log('Prijavljen korisnik:', response.data);
            // Dodajte redirekciju ili drugu logiku nakon uspešnog logina
        } catch (error) {
            console.error('Greška pri logovanju:', error);
        }
    };

    return (
        <div>
            <h2>Login forma</h2>
            <input type="text" placeholder="Korisničko ime" value={korisnickoIme} onChange={(e) => setKorisnickoIme(e.target.value)} />
            <input type="password" placeholder="Šifra" value={sifra} onChange={(e) => setSifra(e.target.value)} />
            <button onClick={handleLogin}>Prijavi se</button>
        </div>
    );
};

export default LoginForm;
