package org.projekat.pibp.service;

import org.projekat.pibp.model.Korisnik;
import org.projekat.pibp.repository.KorisnikRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;

    public KorisnikService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
    }

    public Korisnik findByKorisnickoIme(String korisnickoIme) {
        return korisnikRepository.findByKorisnickoIme(korisnickoIme);
    }
    public List<Korisnik> sviKorisnici(){
        return  korisnikRepository.findAll();
    }
    public Korisnik registerKorisnik(Korisnik korisnik) {
        // Implementacija logike za registraciju korisnika (validacija, čuvanje u bazu, itd.)
        return korisnikRepository.save(korisnik);
    }

    public Korisnik login(String korisnickoIme, String sifra) {
        // Implementacija logike za login korisnika (provera u bazi ili drugom mehanizmu)
        return korisnikRepository.findByKorisnickoImeAndSifra(korisnickoIme, sifra);
    }
}