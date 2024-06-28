package org.projekat.pibp.controller;

import org.projekat.pibp.model.Korisnik;
import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/korisnici")
public class KorisnikController {

    private final KorisnikService korisnikService;

    @Autowired
    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @GetMapping("/{korisnickoIme}")
    public ResponseEntity<Korisnik> getByKorisnickoIme(@PathVariable String korisnickoIme) {
        Korisnik korisnik = korisnikService.findByKorisnickoIme(korisnickoIme);
        if (korisnik != null) {
            return new ResponseEntity<>(korisnik, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/svi")
    public ResponseEntity<List<Korisnik>> dobaviSvePredavace(){
        List<Korisnik> lista = korisnikService.sviKorisnici();
        return new ResponseEntity<>(lista,HttpStatus.OK);
    }

    // Dodajte ostale metode po potrebi (dodavanje korisnika, brisanje, izmena, itd.)
}