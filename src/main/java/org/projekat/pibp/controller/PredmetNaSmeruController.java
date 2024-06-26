package org.projekat.pibp.controller;

import org.projekat.pibp.model.PredmetNaSmeru;
import org.projekat.pibp.model.id.PredmetNaSmeruId;
import org.projekat.pibp.service.PredmetNaSmeruService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predmeti_na_smeru")
public class PredmetNaSmeruController {

    @Autowired
    private PredmetNaSmeruService predmetNaSmeruService;

    @PostMapping("/dodaj")
    public ResponseEntity<PredmetNaSmeru> dodajPredmetNaSmeru(@RequestBody PredmetNaSmeru predmetiNaSmeru) {
        PredmetNaSmeru noviPredmetiNaSmeru = predmetNaSmeruService.dodajPredmetNaSmeru(predmetiNaSmeru);
        return new ResponseEntity<>(noviPredmetiNaSmeru, HttpStatus.CREATED);
    }

    @GetMapping("/svi")
    public ResponseEntity<List<PredmetNaSmeru>> dobaviSvePredmeteNaSmeru() {
        List<PredmetNaSmeru> predmetiNaSmeru = predmetNaSmeruService.dobaviSvePredmeteNaSmeru();
        return new ResponseEntity<>(predmetiNaSmeru, HttpStatus.OK);
    }

    @GetMapping("/{idS}/{idP}")
    public ResponseEntity<PredmetNaSmeru> dobaviPredmetNaSmeruPoId(@PathVariable Long idS, @PathVariable Long idP) {
        PredmetNaSmeruId id = new PredmetNaSmeruId(idS, idP);
        PredmetNaSmeru predmetNaSmeru = predmetNaSmeruService.dobaviPredmetNaSmeruPoId(id);
        if (predmetNaSmeru != null) {
            return new ResponseEntity<>(predmetNaSmeru, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Ostali endpointi po potrebi
}