package org.projekat.pibp.controller;

import org.projekat.pibp.model.Ucionica;
import org.projekat.pibp.service.UcionicaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ucionice")
public class UcionicaController {

    private final UcionicaService ucionicaService;

    public UcionicaController(UcionicaService ucionicaService) {
        this.ucionicaService = ucionicaService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Ucionica> dodajUcionicu(@RequestBody Ucionica ucionica) {
        Ucionica novaUcionica = ucionicaService.dodajUcionicu(ucionica);
        return new ResponseEntity<>(novaUcionica, HttpStatus.CREATED);
    }

    @GetMapping("/sve")
    public ResponseEntity<List<Ucionica>> prikaziSveUcionice() {
        List<Ucionica> ucionice = ucionicaService.prikaziSveUcionice();
        return new ResponseEntity<>(ucionice, HttpStatus.OK);
    }

    @GetMapping("/{broj}")
    public ResponseEntity<Ucionica> dobaviUcionicuPoBroju(@PathVariable Integer broj) {
        Ucionica ucionica = ucionicaService.dobaviUcionicuPoBroju(broj);
        if (ucionica != null) {
            return new ResponseEntity<>(ucionica, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
