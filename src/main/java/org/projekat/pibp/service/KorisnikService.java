package org.projekat.pibp.service;

import org.projekat.pibp.model.Korisnik;

import java.util.List;

public interface KorisnikService {
    Korisnik findByKorisnickoIme(String korisnickoIme);

    List<Korisnik> sviKorisnici();
}
