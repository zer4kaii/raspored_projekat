package org.projekat.pibp.controller;

import org.projekat.pibp.dto.LoginDto;
import org.projekat.pibp.model.Korisnik;
import org.projekat.pibp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/svi")
    public ResponseEntity<List<Korisnik>> dobaviSvePredavace(){
        List<Korisnik> lista = korisnikService.sviKorisnici();
        return new ResponseEntity<>(lista,HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<Korisnik> register(@RequestBody Korisnik korisnik) {
        Korisnik noviKorisnik = korisnikService.registerKorisnik(korisnik);
        return new ResponseEntity<>(noviKorisnik, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Korisnik> login(@RequestBody LoginDto loginDto) {
        Korisnik korisnik = korisnikService.login(loginDto.getKorisnickoIme(), loginDto.getSifra());
        System.out.println(loginDto.getKorisnickoIme());
        if (korisnik != null) {
            return new ResponseEntity<>(korisnik, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Dodajte ostale metode po potrebi (dodavanje korisnika, brisanje, izmena, itd.)
}