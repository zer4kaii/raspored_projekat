import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [sifra, setSifra] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/korisnici/register', {
                korisnickoIme,
                sifra,
                ime,
                prezime,
                email
            });
            console.log('Registracija uspešna!', response.data);
            // Dodajte redirekciju ili drugu logiku nakon uspešne registracije
        } catch (error) {
            console.error('Greška pri registraciji:', error);
        }
    };

    return (
        <div>
            <h2>Registracija korisnika</h2>
            <input type="text" placeholder="Korisničko ime" value={korisnickoIme} onChange={(e) => setKorisnickoIme(e.target.value)} />
            <input type="password" placeholder="Šifra" value={sifra} onChange={(e) => setSifra(e.target.value)} />
            <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} />
            <input type="text" placeholder="Prezime" value={prezime} onChange={(e) => setPrezime(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleRegister}>Registruj se</button>
        </div>
    );
};

export default RegisterForm;
