package org.projekat.pibp.controller;

import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.model.Smer;
import org.projekat.pibp.service.PredavacService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/predavaci")
public class PredavacController {

    private final PredavacService predavacService;

    public PredavacController(PredavacService predavacService){
        this.predavacService = predavacService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Predavac> dodajPredavac(@RequestBody Predavac predavac){
        Predavac noviPredavac = predavacService.dodajPredavac(predavac);
        return new ResponseEntity<>(noviPredavac, HttpStatus.CREATED);
    }

    @GetMapping("/svi")
    public ResponseEntity<List<Predavac>> dobaviSvePredavace() {
        List<Predavac> predavaci = predavacService.dobaviSvePredavace();
        return new ResponseEntity<>(predavaci, HttpStatus.OK);
    }
    @GetMapping("/{username}")
    public ResponseEntity<Optional<Predavac>> dobaviPredavacaPoUsername(@PathVariable String username) {
        Optional<Predavac> predavac = predavacService.dobaviPredavacaPoUsername(username);
        if (predavac.isPresent()) {
            return new ResponseEntity<>(predavac, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
