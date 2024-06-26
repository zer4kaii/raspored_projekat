package org.projekat.pibp.controller;

import org.projekat.pibp.model.Predmet;
import org.projekat.pibp.service.PredmetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predmeti")
public class PredmetController {

    private final PredmetService predmetService;

    public PredmetController(PredmetService predmetService){
        this.predmetService = predmetService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Predmet> dodajPredmet(@RequestBody Predmet predmet){
        Predmet noviPredmet = predmetService.dodajPredmet(predmet);
        return new ResponseEntity<>(noviPredmet, HttpStatus.CREATED);
    }

    @GetMapping("/svi")
    public ResponseEntity<List<Predmet>> dobaviSvePredmete() {
        List<Predmet> predmeti = predmetService.dobaviSvePredmete();
        return new ResponseEntity<>(predmeti, HttpStatus.OK);
    }

}
