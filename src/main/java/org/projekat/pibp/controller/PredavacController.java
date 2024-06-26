package org.projekat.pibp.controller;

import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.service.PredavacService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predavaci")
public class PredavacController {

    private final PredavacService predavacService;
    public PredavacController(PredavacService predavacService)
    {
        this.predavacService = predavacService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Predavac> dodajPredavaca(@RequestBody Predavac predavac){
        Predavac noviPredavac = predavacService.dodajPredavaca(predavac);
        return new ResponseEntity<>(noviPredavac, HttpStatus.OK);
    }

    @GetMapping("/svi")
    public ResponseEntity<List<Predavac>> dobaviSvePredavace(){
        List<Predavac> lista = predavacService.dobaviSvePredavace();
        return new ResponseEntity<>(lista,HttpStatus.OK);
    }

}
