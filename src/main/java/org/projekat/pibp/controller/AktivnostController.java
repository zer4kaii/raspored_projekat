package org.projekat.pibp.controller;

import org.projekat.pibp.dto.AktivnostDTO;
import org.projekat.pibp.model.Aktivnost;
import org.projekat.pibp.service.AktivnostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aktivnosti")
public class AktivnostController {

    private final AktivnostService aktivnostService;

    public AktivnostController(AktivnostService aktivnostService) {
        this.aktivnostService = aktivnostService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Aktivnost> dodajAktivnost(@RequestBody AktivnostDTO aktivnostData) {
        Aktivnost novaAktivnost = aktivnostService.dodajAktivnost(aktivnostData);
        return new ResponseEntity<>(novaAktivnost, HttpStatus.CREATED);
    }

    @GetMapping("/sve")
    public ResponseEntity<List<Aktivnost>> prikaziSveAktivnosti() {
        List<Aktivnost> aktivnosti = aktivnostService.prikaziSveAktivnosti();
        return new ResponseEntity<>(aktivnosti, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aktivnost> dobaviAktivnostPoId(@PathVariable Long id) {
        Aktivnost aktivnost = aktivnostService.dobaviAktivnostPoId(id);
        if (aktivnost != null) {
            return new ResponseEntity<>(aktivnost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
